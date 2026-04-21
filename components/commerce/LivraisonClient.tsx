"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ShoppingBag, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useCartStore, computeCartSubtotal } from "@/lib/cart/store";
import { checkDeliveryEligibility, getDeliveryFee, getMinOrder } from "@/lib/delivery";
import { formatPrice } from "@/lib/pricing";

interface AddressSuggestion {
  properties: {
    label: string;
    postcode: string;
    city: string;
    housenumber?: string;
    street?: string;
  };
  geometry: { coordinates: [number, number] };
}

export function LivraisonClient() {
  const router = useRouter();
  const { items } = useCartStore();
  const subtotal = computeCartSubtotal(items);

  const [channel, setChannel] = useState<"pickup" | "delivery">("pickup");
  const [addressInput, setAddressInput] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressSuggestion | null>(null);
  const [eligibility, setEligibility] = useState<{
    eligible: boolean;
    message: string;
    fee: number;
    minOrder: number;
  } | null>(null);
  const [créneau, setCréneau] = useState("asap");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [interphone, setInterphone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function fetchAddressSuggestions(query: string) {
    if (query.length < 3) { setSuggestions([]); return; }
    try {
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5&type=housenumber`
      );
      const data = await res.json() as { features: AddressSuggestion[] };
      setSuggestions(data.features ?? []);
    } catch {
      setSuggestions([]);
    }
  }

  function selectAddress(addr: AddressSuggestion) {
    setAddressInput(addr.properties.label);
    setSuggestions([]);
    setSelectedAddress(addr);

    const cp = addr.properties.postcode;
    const result = checkDeliveryEligibility(cp);
    const fee = getDeliveryFee(cp);
    const min = getMinOrder(cp);
    setEligibility({ eligible: result.eligible, message: result.message, fee, minOrder: min });
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!nom.trim()) errs["nom"] = "Le nom est requis.";
    if (!telephone.trim() || !/^(\+33|0)[0-9]{9}$/.test(telephone.replace(/\s/g, "")))
      errs["telephone"] = "Numéro de téléphone français invalide.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs["email"] = "Adresse email invalide.";
    if (channel === "delivery" && !selectedAddress)
      errs["address"] = "Veuillez sélectionner une adresse de livraison.";
    if (channel === "delivery" && eligibility && !eligibility.eligible)
      errs["address"] = eligibility.message;
    if (channel === "delivery" && eligibility && subtotal < eligibility.minOrder)
      errs["address"] = `Commande minimum : ${formatPrice(eligibility.minOrder)} pour cette zone.`;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleContinue() {
    if (!validate()) return;

    const deliveryData = {
      channel,
      address: selectedAddress?.properties,
      créneau,
      scheduledFor: créneau === "scheduled" ? `${scheduledDate}T${scheduledTime}` : null,
      nom,
      telephone,
      email,
      interphone,
      deliveryFee: channel === "delivery" ? (eligibility?.fee ?? 0) : 0,
    };

    sessionStorage.setItem("kebabdor-delivery", JSON.stringify(deliveryData));
    router.push("/commander/paiement");
  }

  if (items.length === 0) {
    router.replace("/commander/panier");
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-8">
        Livraison &amp; Coordonnées
      </h1>

      <div className="space-y-6">
        {/* Channel selection */}
        <fieldset>
          <legend className="text-sm font-bold text-[var(--color-ink)] mb-3">
            Mode de retrait <span aria-label="obligatoire" className="text-[var(--color-primary)]">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "pickup", label: "Click & Collect", sub: "Retrait au restaurant — 15 min", icon: <ShoppingBag className="h-5 w-5" /> },
              { value: "delivery", label: "Livraison", sub: "À domicile — 30 min", icon: <MapPin className="h-5 w-5" /> },
            ].map((opt) => (
              <label
                key={opt.value}
                className={`flex flex-col gap-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  channel === opt.value
                    ? "border-[var(--color-primary)] bg-red-50"
                    : "border-[var(--color-border)] hover:border-[var(--color-primary)]/50"
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  value={opt.value}
                  checked={channel === opt.value}
                  onChange={() => setChannel(opt.value as "pickup" | "delivery")}
                  className="sr-only"
                />
                <span className="flex items-center gap-2 font-semibold text-[var(--color-ink)]">
                  {opt.icon}
                  {opt.label}
                </span>
                <span className="text-xs text-[var(--color-ink-muted)]">{opt.sub}</span>
                {channel === opt.value && (
                  <CheckCircle className="h-4 w-4 text-[var(--color-primary)] self-end" aria-hidden="true" />
                )}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Address (delivery only) */}
        {channel === "delivery" && (
          <div>
            <label htmlFor="address" className="block text-sm font-bold text-[var(--color-ink)] mb-1">
              Adresse de livraison <span aria-label="obligatoire" className="text-[var(--color-primary)]">*</span>
            </label>
            <div className="relative">
              <input
                id="address"
                type="text"
                value={addressInput}
                onChange={(e) => {
                  setAddressInput(e.target.value);
                  setSelectedAddress(null);
                  setEligibility(null);
                  fetchAddressSuggestions(e.target.value);
                }}
                placeholder="Entrez votre adresse à Lyon..."
                autoComplete="off"
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 min-h-[44px]"
                aria-autocomplete="list"
                aria-controls="address-suggestions"
                aria-expanded={suggestions.length > 0}
              />
              {suggestions.length > 0 && (
                <ul
                  id="address-suggestions"
                  role="listbox"
                  aria-label="Suggestions d'adresses"
                  className="absolute z-10 w-full mt-1 bg-white border border-[var(--color-border)] rounded-lg shadow-lg overflow-hidden"
                >
                  {suggestions.map((s, i) => (
                    <li key={i} role="option" aria-selected={false}>
                      <button
                        type="button"
                        onClick={() => selectAddress(s)}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-[var(--color-bg)] transition-colors flex items-center gap-2"
                      >
                        <MapPin className="h-3 w-3 text-[var(--color-ink-subtle)] shrink-0" aria-hidden="true" />
                        {s.properties.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {eligibility && (
              <div
                className={`mt-2 flex items-start gap-2 rounded-lg p-3 text-sm ${
                  eligibility.eligible
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
                role="status"
                aria-live="polite"
              >
                {eligibility.eligible ? (
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <span>
                  {eligibility.message}
                  {eligibility.eligible && (
                    <strong className="ml-1">
                      Frais : {formatPrice(eligibility.fee)}
                    </strong>
                  )}
                </span>
              </div>
            )}
            {errors["address"] && (
              <p className="text-xs text-red-600 mt-1" role="alert">{errors["address"]}</p>
            )}

            <div className="mt-3">
              <label htmlFor="interphone" className="block text-xs font-medium text-[var(--color-ink-muted)] mb-1">
                Interphone / Étage / Bâtiment (optionnel)
              </label>
              <input
                id="interphone"
                type="text"
                value={interphone}
                onChange={(e) => setInterphone(e.target.value)}
                placeholder="ex: Bât A, 3e étage, code 1234"
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 min-h-[44px]"
              />
            </div>
          </div>
        )}

        {/* Créneau */}
        <fieldset>
          <legend className="text-sm font-bold text-[var(--color-ink)] mb-3">
            Créneau
          </legend>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${créneau === "asap" ? "border-[var(--color-primary)] bg-red-50" : "border-[var(--color-border)]"}`}>
              <input type="radio" name="creneau" value="asap" checked={créneau === "asap"} onChange={() => setCréneau("asap")} className="text-[var(--color-primary)]" />
              <span className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Dès que possible (~{channel === "pickup" ? "15" : "30"} min)
              </span>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${créneau === "scheduled" ? "border-[var(--color-primary)] bg-red-50" : "border-[var(--color-border)]"}`}>
              <input type="radio" name="creneau" value="scheduled" checked={créneau === "scheduled"} onChange={() => setCréneau("scheduled")} className="text-[var(--color-primary)]" />
              <span className="text-sm">Choisir un créneau</span>
            </label>
            {créneau === "scheduled" && (
              <div className="ml-6 flex gap-3">
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  aria-label="Date souhaitée"
                  min={new Date().toISOString().split("T")[0]}
                  className="flex-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none min-h-[44px]"
                />
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  aria-label="Heure souhaitée"
                  min="11:00"
                  max="23:00"
                  className="flex-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none min-h-[44px]"
                />
              </div>
            )}
          </div>
        </fieldset>

        {/* Coordonnées */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[var(--color-ink)]">Vos coordonnées</h2>

          {[
            { id: "nom", label: "Nom complet", type: "text", value: nom, setter: setNom, autoComplete: "name", placeholder: "Votre nom" },
            { id: "telephone", label: "Téléphone", type: "tel", value: telephone, setter: setTelephone, autoComplete: "tel", placeholder: "06 XX XX XX XX" },
            { id: "email", label: "Email", type: "email", value: email, setter: setEmail, autoComplete: "email", placeholder: "votre@email.fr" },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-[var(--color-ink)] mb-1">
                {field.label} <span aria-label="obligatoire" className="text-[var(--color-primary)]">*</span>
              </label>
              <input
                id={field.id}
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                aria-invalid={!!errors[field.id]}
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 min-h-[44px] transition-colors ${
                  errors[field.id]
                    ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                    : "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20"
                }`}
              />
              {errors[field.id] && (
                <p id={`${field.id}-error`} className="text-xs text-red-600 mt-1" role="alert">
                  {errors[field.id]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
          <dl className="text-sm space-y-2">
            <div className="flex justify-between">
              <dt className="text-[var(--color-ink-muted)]">Sous-total</dt>
              <dd className="font-medium">{formatPrice(subtotal)}</dd>
            </div>
            {channel === "delivery" && eligibility?.eligible && (
              <div className="flex justify-between">
                <dt className="text-[var(--color-ink-muted)]">Frais de livraison</dt>
                <dd className="font-medium">{formatPrice(eligibility.fee)}</dd>
              </div>
            )}
            <div className="flex justify-between font-bold border-t border-[var(--color-border)] pt-2">
              <dt>Total</dt>
              <dd className="text-[var(--color-primary)]">
                {formatPrice(subtotal + (channel === "delivery" && eligibility?.eligible ? eligibility.fee : 0))}
              </dd>
            </div>
          </dl>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-4 text-base font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[52px]"
        >
          Continuer vers le paiement
        </button>

        <p className="text-xs text-center text-[var(--color-ink-subtle)]">
          Vos données sont protégées conformément au RGPD.{" "}
          <a href="/confidentialite" className="underline hover:no-underline">
            Politique de confidentialité
          </a>
        </p>
      </div>
    </div>
  );
}
