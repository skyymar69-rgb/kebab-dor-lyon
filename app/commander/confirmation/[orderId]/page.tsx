import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { CheckCircle, Phone, Calendar, Clock, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Commande confirmée",
  robots: { index: false },
};

type OrderItem = {
  name: string;
  quantity: number;
  basePrice: number;
  supplementsTotal: number;
};

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  let order;
  try {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);
    order = result[0];
  } catch {
    order = null;
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Commande introuvable</h1>
        <p className="text-[var(--color-ink-muted)] mb-6">
          Cette commande n&apos;existe pas ou a été supprimée.
        </p>
        <Link href="/" className="text-[var(--color-primary)] underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  const items = order.items as OrderItem[];
  const icsUrl = `/api/ics?orderId=${orderId}`;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Success header */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" aria-hidden="true" />
        </div>
        <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
          Commande confirmée !
        </h1>
        <p className="text-[var(--color-ink-muted)]">
          Merci {order.customerName}. Votre commande a bien été reçue.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 bg-[var(--color-primary)] text-white rounded-xl px-6 py-3 text-lg font-bold">
          <span>N° {order.shortCode}</span>
        </div>

        <p className="text-sm text-[var(--color-ink-subtle)] mt-3">
          Une confirmation a été envoyée à <strong>{order.customerEmail}</strong>
        </p>
      </div>

      {/* Order details */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 mb-6">
        <h2 className="font-display text-lg font-bold text-[var(--color-ink)] mb-4">
          Détails de votre commande
        </h2>

        <dl className="space-y-3 text-sm mb-5">
          <div className="flex items-center gap-3">
            {order.channel === "pickup" ? (
              <MapPin className="h-4 w-4 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
            ) : (
              <MapPin className="h-4 w-4 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
            )}
            <div>
              <dt className="font-medium">{order.channel === "pickup" ? "Click & Collect" : "Livraison à domicile"}</dt>
              {order.channel === "pickup" ? (
                <dd className="text-[var(--color-ink-muted)]">37 rue Marietton, 69009 Lyon</dd>
              ) : (
                <dd className="text-[var(--color-ink-muted)]">
                  {order.deliveryAddress ? JSON.stringify(order.deliveryAddress) : "Adresse fournie"}
                </dd>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
            <div>
              <dt className="font-medium">Temps estimé</dt>
              <dd className="text-[var(--color-ink-muted)]">
                {order.channel === "pickup" ? "~15 minutes" : "~30 minutes"}
              </dd>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-4 w-4 shrink-0" aria-hidden="true" />
            <div>
              <dt className="font-medium">Paiement</dt>
              <dd className="text-[var(--color-ink-muted)]">
                {order.paymentMethod === "stripe" ? "Carte bancaire (Stripe)" : "Sur place / à la livraison"}
              </dd>
            </div>
          </div>
        </dl>

        {/* Items */}
        <div className="border-t border-[var(--color-border)] pt-4">
          <h3 className="text-sm font-semibold mb-3">Articles commandés</h3>
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span className="text-[var(--color-ink-muted)]">
                  {item.quantity}× {item.name}
                </span>
                <span className="font-medium">
                  {formatPrice((item.basePrice + item.supplementsTotal) * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold border-t border-[var(--color-border)] pt-3 mt-3">
            <span>Total</span>
            <span className="text-[var(--color-primary)]">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <a
          href={icsUrl}
          download={`commande-${order.shortCode}.ics`}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--color-primary)] px-4 py-3 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors min-h-[48px]"
          aria-label="Ajouter cette commande à votre calendrier"
        >
          <Calendar className="h-4 w-4" aria-hidden="true" />
          Ajouter au calendrier
        </a>

        <a
          href="tel:+33478472426"
          className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-ink)] px-4 py-3 text-sm font-bold text-white hover:bg-gray-800 transition-colors min-h-[48px]"
          aria-label="Appeler le restaurant Kebab d'Or"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Appeler le restaurant
        </a>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors underline"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
