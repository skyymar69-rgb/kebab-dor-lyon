"use client";

import { useState, useCallback, useId, useEffect, useRef } from "react";
import { X, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { useCartStore, type CartItem, type CartItemOption } from "@/lib/cart/store";
import { formatPrice } from "@/lib/pricing";
import { nanoid } from "nanoid";

interface ItemOptions {
  viandes?: string[];
  accompagnements?: string[];
  sauces?: string[];
  boissons?: string[];
  supplements?: { name: string; price: number }[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  options?: ItemOptions;
  halal: boolean;
}

interface Props {
  item: MenuItem;
  open: boolean;
  onClose: () => void;
}

const MAX_FREE_SAUCES = 2;
const EXTRA_SAUCE_PRICE = 0.5;

export function ProductConfigDialog({ item, open, onClose }: Props) {
  const dialogId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);

  const options = (item.options ?? {}) as ItemOptions;
  const hasViandes = (options.viandes?.length ?? 0) > 0;
  const hasAccompagnements = (options.accompagnements?.length ?? 0) > 0;
  const hasSauces = (options.sauces?.length ?? 0) > 0;
  const hasBoissons = (options.boissons?.length ?? 0) > 0;
  const hasSupplements = (options.supplements?.length ?? 0) > 0;

  const [viande, setViande] = useState(options.viandes?.[0] ?? "");
  const [accompagnement, setAccompagnement] = useState(options.accompagnements?.[0] ?? "");
  const [sauces, setSauces] = useState<string[]>([]);
  const [boisson, setBoisson] = useState(options.boissons?.[0] ?? "");
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (open) {
      setViande(options.viandes?.[0] ?? "");
      setAccompagnement(options.accompagnements?.[0] ?? "");
      setSauces([]);
      setBoisson(options.boissons?.[0] ?? "");
      setSelectedSupplements([]);
      setNotes("");
      setQuantity(1);
      setAdded(false);
    }
  }, [open, options]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const toggleSauce = useCallback((sauce: string) => {
    setSauces((prev) => {
      if (prev.includes(sauce)) return prev.filter((s) => s !== sauce);
      return [...prev, sauce];
    });
  }, []);

  const toggleSupplement = useCallback((name: string) => {
    setSelectedSupplements((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }, []);

  const extraSauceCount = Math.max(0, sauces.length - MAX_FREE_SAUCES);
  const saucesTotal = extraSauceCount * EXTRA_SAUCE_PRICE;
  const supplementsTotal = selectedSupplements.reduce((sum, name) => {
    const sup = options.supplements?.find((s) => s.name === name);
    return sum + (sup?.price ?? 0);
  }, 0);
  const itemTotal = (item.basePrice + saucesTotal + supplementsTotal) * quantity;

  function handleAdd() {
    const cartItem: CartItem = {
      id: nanoid(),
      menuItemId: item.id,
      name: item.name,
      basePrice: item.basePrice + saucesTotal + supplementsTotal,
      supplementsTotal: saucesTotal + supplementsTotal,
      quantity,
      options: {
        viande: viande || undefined,
        accompagnement: accompagnement || undefined,
        sauces: sauces.length > 0 ? sauces : undefined,
        boisson: boisson || undefined,
        supplements: selectedSupplements.length > 0 ? selectedSupplements : undefined,
        notes: notes.trim() || undefined,
      } satisfies CartItemOption,
    };
    addItem(cartItem);
    setAdded(true);
    setTimeout(() => onClose(), 800);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${dialogId}-title`}
        tabIndex={-1}
        className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden focus:outline-none"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-5 border-b border-[var(--color-border)]">
          <div>
            <h2 id={`${dialogId}-title`} className="font-display text-xl font-bold text-[var(--color-ink)]">
              {item.name}
            </h2>
            <p className="text-sm text-[var(--color-ink-muted)] mt-0.5">{item.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la configuration"
            className="shrink-0 p-2 text-[var(--color-ink-subtle)] hover:text-[var(--color-ink)] rounded-lg hover:bg-[var(--color-bg)] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* Viande */}
          {hasViandes && (
            <fieldset>
              <legend className="text-sm font-bold text-[var(--color-ink)] mb-2">
                Viande <span aria-label="obligatoire" className="text-[var(--color-primary)]">*</span>
              </legend>
              <div className="space-y-2">
                {options.viandes!.map((v) => (
                  <label key={v} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] cursor-pointer hover:border-[var(--color-primary)]/50 has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-red-50 transition-colors">
                    <input
                      type="radio"
                      name="viande"
                      value={v}
                      checked={viande === v}
                      onChange={() => setViande(v)}
                      className="text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    />
                    <span className="text-sm">{v}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {/* Accompagnement */}
          {hasAccompagnements && (
            <fieldset>
              <legend className="text-sm font-bold text-[var(--color-ink)] mb-2">
                Accompagnement <span aria-label="obligatoire" className="text-[var(--color-primary)]">*</span>
              </legend>
              <div className="space-y-2">
                {options.accompagnements!.map((a) => (
                  <label key={a} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] cursor-pointer hover:border-[var(--color-primary)]/50 has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-red-50 transition-colors">
                    <input
                      type="radio"
                      name="accompagnement"
                      value={a}
                      checked={accompagnement === a}
                      onChange={() => setAccompagnement(a)}
                      className="text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    />
                    <span className="text-sm">{a}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {/* Sauces */}
          {hasSauces && (
            <fieldset>
              <legend className="text-sm font-bold text-[var(--color-ink)] mb-1">
                Sauces
              </legend>
              <p className="text-xs text-[var(--color-ink-subtle)] mb-2">
                2 sauces incluses. Chaque sauce supplémentaire : +{formatPrice(EXTRA_SAUCE_PRICE)}
              </p>
              <div className="space-y-2">
                {options.sauces!.map((s) => {
                  const checked = sauces.includes(s);
                  return (
                    <label key={s} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] cursor-pointer hover:border-[var(--color-primary)]/50 has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-red-50 transition-colors">
                      <input
                        type="checkbox"
                        value={s}
                        checked={checked}
                        onChange={() => toggleSauce(s)}
                        className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                      />
                      <span className="text-sm flex-1">{s}</span>
                      {checked && sauces.indexOf(s) >= MAX_FREE_SAUCES && (
                        <span className="text-xs text-[var(--color-primary)] font-medium">
                          +{formatPrice(EXTRA_SAUCE_PRICE)}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Boisson */}
          {hasBoissons && (
            <div>
              <label htmlFor={`${dialogId}-boisson`} className="block text-sm font-bold text-[var(--color-ink)] mb-2">
                Boisson
              </label>
              <select
                id={`${dialogId}-boisson`}
                value={boisson}
                onChange={(e) => setBoisson(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 min-h-[44px]"
              >
                {options.boissons!.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}

          {/* Suppléments */}
          {hasSupplements && (
            <fieldset>
              <legend className="text-sm font-bold text-[var(--color-ink)] mb-2">
                Suppléments
              </legend>
              <div className="space-y-2">
                {options.supplements!.map((sup) => (
                  <label key={sup.name} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--color-border)] cursor-pointer hover:border-[var(--color-primary)]/50 has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-red-50 transition-colors">
                    <input
                      type="checkbox"
                      value={sup.name}
                      checked={selectedSupplements.includes(sup.name)}
                      onChange={() => toggleSupplement(sup.name)}
                      className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    />
                    <span className="text-sm flex-1">{sup.name}</span>
                    <span className="text-xs text-[var(--color-primary)] font-semibold">
                      +{formatPrice(sup.price)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {/* Notes */}
          <div>
            <label htmlFor={`${dialogId}-notes`} className="block text-sm font-bold text-[var(--color-ink)] mb-2">
              Notes (optionnel)
            </label>
            <textarea
              id={`${dialogId}-notes`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={200}
              rows={2}
              placeholder="Allergie, sans oignon, bien cuit... (200 caractères max)"
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 resize-none"
            />
            <p className="text-xs text-[var(--color-ink-subtle)] mt-1" aria-live="polite">
              {notes.length}/200 caractères
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[var(--color-border)] bg-white">
          {/* Quantity */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuer la quantité"
                disabled={quantity <= 1}
                className="h-9 w-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-40 transition-colors"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span
                aria-live="polite"
                aria-label={`Quantité : ${quantity}`}
                className="font-bold text-lg w-6 text-center"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                aria-label="Augmenter la quantité"
                disabled={quantity >= 10}
                className="h-9 w-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-40 transition-colors"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <span className="font-bold text-lg text-[var(--color-primary)]" aria-live="polite">
              {formatPrice(itemTotal)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={added}
            className={`w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold text-white transition-all min-h-[52px] ${
              added
                ? "bg-green-600"
                : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
            }`}
            aria-label={added ? "Ajouté au panier" : `Ajouter au panier — ${formatPrice(itemTotal)}`}
          >
            {added ? (
              <>
                <Check className="h-5 w-5" aria-hidden="true" />
                Ajouté au panier !
              </>
            ) : (
              <>
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                Ajouter · {formatPrice(itemTotal)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
