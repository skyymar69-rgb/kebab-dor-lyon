"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, ShoppingBag, Lock, AlertCircle } from "lucide-react";
import { useCartStore, computeCartSubtotal } from "@/lib/cart/store";
import { formatPrice, computeVat, computeTotal } from "@/lib/pricing";
import Link from "next/link";

export function PaiementClient() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "on_site">("stripe");
  const [cgvAccepted, setCgvAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = computeCartSubtotal(items);
  const deliveryData = typeof window !== "undefined"
    ? (() => {
        try {
          const d = sessionStorage.getItem("kebabdor-delivery");
          return d ? JSON.parse(d) as { deliveryFee: number; nom: string; email: string; telephone: string; channel: string; address?: Record<string, string>; scheduledFor?: string; interphone?: string } : null;
        } catch { return null; }
      })()
    : null;

  const deliveryFee = deliveryData?.deliveryFee ?? 0;
  const total = computeTotal(subtotal, deliveryFee);
  const vat = computeVat(subtotal + deliveryFee);

  async function handleConfirm() {
    if (!cgvAccepted) {
      setError("Vous devez accepter les conditions générales de vente pour continuer.");
      return;
    }
    if (!deliveryData) {
      router.push("/commander/livraison");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        items,
        subtotal,
        deliveryFee,
        total,
        paymentMethod,
        customerName: deliveryData.nom,
        customerEmail: deliveryData.email,
        customerPhone: deliveryData.telephone,
        channel: deliveryData.channel,
        deliveryAddress: deliveryData.address ? {
          ...deliveryData.address,
          interphone: deliveryData.interphone,
        } : null,
        scheduledFor: deliveryData.scheduledFor ?? null,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error ?? "Erreur serveur");
      }

      const data = await res.json() as { orderId: string; clientSecret?: string; shortCode: string };

      if (paymentMethod === "stripe" && data.clientSecret) {
        // Redirect to Stripe checkout (simplified — full impl uses Stripe Elements)
        sessionStorage.setItem("kebabdor-pending-order", JSON.stringify(data));
        router.push(`/commander/confirmation/${data.orderId}`);
      } else {
        clearCart();
        sessionStorage.removeItem("kebabdor-delivery");
        router.push(`/commander/confirmation/${data.orderId}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p>Votre panier est vide.</p>
        <Link href="/commander" className="text-[var(--color-primary)] underline mt-2 inline-block">
          Retour au menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-8">
        Paiement
      </h1>

      <div className="space-y-6">
        {/* Récap commande */}
        <section className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
          <h2 className="font-semibold text-[var(--color-ink)] mb-3 text-sm">Récapitulatif</h2>
          <ul className="space-y-2 mb-4">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-[var(--color-ink-muted)]">
                  {item.quantity}× {item.name}
                </span>
                <span className="font-medium">
                  {formatPrice((item.basePrice + item.supplementsTotal) * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="space-y-1 text-sm border-t border-[var(--color-border)] pt-3">
            <div className="flex justify-between">
              <dt className="text-[var(--color-ink-muted)]">Sous-total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <dt className="text-[var(--color-ink-muted)]">Livraison</dt>
                <dd>{formatPrice(deliveryFee)}</dd>
              </div>
            )}
            <div className="flex justify-between text-xs text-[var(--color-ink-subtle)]">
              <dt>TVA 10 % (incluse)</dt>
              <dd>{formatPrice(vat)}</dd>
            </div>
            <div className="flex justify-between font-bold text-base border-t border-[var(--color-border)] pt-2 mt-1">
              <dt>Total TTC</dt>
              <dd className="text-[var(--color-primary)]">{formatPrice(total)}</dd>
            </div>
          </dl>
        </section>

        {/* Mode paiement */}
        <fieldset>
          <legend className="text-sm font-bold text-[var(--color-ink)] mb-3">
            Mode de paiement <span aria-label="obligatoire" className="text-[var(--color-primary)]">*</span>
          </legend>
          <div className="space-y-3">
            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "stripe" ? "border-[var(--color-primary)] bg-red-50" : "border-[var(--color-border)]"}`}>
              <input
                type="radio"
                name="payment"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
                className="mt-0.5 text-[var(--color-primary)]"
              />
              <div>
                <span className="flex items-center gap-2 font-semibold text-[var(--color-ink)]">
                  <CreditCard className="h-4 w-4" aria-hidden="true" />
                  Carte bancaire en ligne
                </span>
                <span className="text-xs text-[var(--color-ink-muted)] mt-0.5 flex items-center gap-1">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  Paiement sécurisé par Stripe — Visa, Mastercard, CB
                </span>
              </div>
            </label>

            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "on_site" ? "border-[var(--color-primary)] bg-red-50" : "border-[var(--color-border)]"}`}>
              <input
                type="radio"
                name="payment"
                value="on_site"
                checked={paymentMethod === "on_site"}
                onChange={() => setPaymentMethod("on_site")}
                className="mt-0.5 text-[var(--color-primary)]"
              />
              <div>
                <span className="flex items-center gap-2 font-semibold text-[var(--color-ink)]">
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  Paiement sur place / à la livraison
                </span>
                <span className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                  Espèces ou carte bancaire au retrait
                </span>
              </div>
            </label>
          </div>
        </fieldset>

        {/* CGV */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="cgv"
            checked={cgvAccepted}
            onChange={(e) => setCgvAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] shrink-0"
          />
          <label htmlFor="cgv" className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
            J&apos;ai lu et j&apos;accepte les{" "}
            <a href="/cgv" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline hover:no-underline">
              Conditions Générales de Vente
            </a>{" "}
            et les{" "}
            <a href="/cgu" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline hover:no-underline">
              CGU
            </a>
            . Je confirme que la commande est composée de produits halal certifiés.
            <span className="font-medium"> Requis pour valider la commande.</span>
          </label>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800" role="alert">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-4 text-base font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[52px]"
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Traitement en cours...
            </>
          ) : (
            <>
              <Lock className="h-5 w-5" aria-hidden="true" />
              Confirmer ma commande · {formatPrice(total)}
            </>
          )}
        </button>

        <p className="text-xs text-center text-[var(--color-ink-subtle)]">
          <Lock className="h-3 w-3 inline mr-1" aria-hidden="true" />
          Paiement sécurisé SSL · Données jamais stockées · TVA incluse
        </p>
      </div>
    </div>
  );
}
