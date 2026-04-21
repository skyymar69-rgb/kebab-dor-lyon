"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore, computeCartSubtotal } from "@/lib/cart/store";
import { formatPrice, computeVat } from "@/lib/pricing";

export function PanierClient() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const subtotal = computeCartSubtotal(items);
  const vat = computeVat(subtotal);
  const minOrder = 15;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-8">
        Mon panier
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-[var(--color-border)]" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-2">
            Votre panier est vide
          </h2>
          <p className="text-[var(--color-ink-muted)] mb-6">
            Parcourez notre menu et composez votre repas.
          </p>
          <Link
            href="/commander"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[44px]"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Voir le menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-[var(--color-border)] p-4 flex gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-[var(--color-ink)] truncate">{item.name}</h2>
                  {/* Options summary */}
                  {item.options && (
                    <p className="text-xs text-[var(--color-ink-subtle)] mt-0.5 leading-relaxed">
                      {[
                        item.options.viande,
                        item.options.accompagnement,
                        item.options.sauces?.join(", "),
                        item.options.boisson,
                        item.options.supplements?.join(", "),
                        item.options.notes,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                  <p className="font-bold text-[var(--color-primary)] mt-2">
                    {formatPrice((item.basePrice + item.supplementsTotal) * item.quantity)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Supprimer ${item.name} du panier`}
                    className="text-[var(--color-ink-subtle)] hover:text-red-600 transition-colors p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Réduire la quantité de ${item.name}`}
                      className="h-8 w-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      <Minus className="h-3 w-3" aria-hidden="true" />
                    </button>
                    <span
                      aria-live="polite"
                      aria-label={`Quantité : ${item.quantity}`}
                      className="font-bold w-5 text-center text-sm"
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Augmenter la quantité de ${item.name}`}
                      className="h-8 w-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      <Plus className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <Link
              href="/commander"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline mt-2"
            >
              + Ajouter d&apos;autres articles
            </Link>
          </div>

          {/* Summary */}
          <aside className="bg-white rounded-2xl border border-[var(--color-border)] p-5 h-fit sticky top-20">
            <h2 className="font-display text-lg font-bold text-[var(--color-ink)] mb-4">
              Récapitulatif
            </h2>

            <dl className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <dt className="text-[var(--color-ink-muted)]">Sous-total</dt>
                <dd className="font-medium">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--color-ink-muted)]">TVA 10 %</dt>
                <dd className="font-medium">{formatPrice(vat)}</dd>
              </div>
              <div className="flex justify-between text-xs text-[var(--color-ink-subtle)]">
                <dt>Frais de livraison</dt>
                <dd>Calculés à l&apos;étape suivante</dd>
              </div>
            </dl>

            <div className="flex justify-between font-bold text-lg border-t border-[var(--color-border)] pt-3 mb-4">
              <span>Total estimé</span>
              <span className="text-[var(--color-primary)]">{formatPrice(subtotal)}</span>
            </div>

            {subtotal < minOrder && (
              <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2 mb-4">
                Minimum {formatPrice(minOrder)} requis pour la livraison. Il vous manque {formatPrice(minOrder - subtotal)}.
              </p>
            )}

            <Link
              href="/commander/livraison"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[var(--color-primary)] px-6 py-4 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[52px]"
            >
              Continuer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <p className="text-xs text-center text-[var(--color-ink-subtle)] mt-3">
              Halal · Paiement sécurisé · Sans commission
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
