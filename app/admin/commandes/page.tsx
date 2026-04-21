import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { formatPrice } from "@/lib/pricing";
import { OrdersClient } from "@/components/admin/OrdersClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Commandes — Admin" };

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getOrders() {
  try {
    return await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(100);
  } catch {
    return [];
  }
}

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  paid: "Payé",
  preparing: "En préparation",
  ready: "Prêt",
  delivering: "En livraison",
  completed: "Terminé",
  cancelled: "Annulé",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  preparing: "bg-orange-100 text-orange-800",
  ready: "bg-green-100 text-green-800",
  delivering: "bg-purple-100 text-purple-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

export default async function CommandesPage() {
  const orderList = await getOrders();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-[var(--color-ink)]">
          Commandes
        </h1>
        <div className="text-sm text-gray-500">
          {orderList.length} commande{orderList.length !== 1 ? "s" : ""}
        </div>
      </div>

      {orderList.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
          <p className="font-medium">Aucune commande pour l&apos;instant</p>
          <p className="text-sm mt-1">Les commandes apparaîtront ici dès réception.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["N° commande", "Client", "Mode", "Total", "Statut", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orderList.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-bold font-mono text-[var(--color-primary)]">
                        {order.shortCode}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-gray-500 text-xs">{order.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        order.channel === "pickup" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                      }`}>
                        {order.channel === "pickup" ? "Click & Collect" : "Livraison"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-800"}`}>
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(order.createdAt).toLocaleString("fr-FR", {
                        day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <OrdersClient orderId={order.id} currentStatus={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400 no-print">
        Page rafraîchie automatiquement toutes les 15 secondes.
      </div>
    </div>
  );
}
