"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_TRANSITIONS: Record<string, { value: string; label: string }[]> = {
  pending: [{ value: "preparing", label: "→ Préparer" }, { value: "cancelled", label: "Annuler" }],
  paid: [{ value: "preparing", label: "→ Préparer" }, { value: "cancelled", label: "Annuler" }],
  preparing: [{ value: "ready", label: "→ Prêt" }, { value: "delivering", label: "→ En livraison" }],
  ready: [{ value: "completed", label: "→ Terminé" }],
  delivering: [{ value: "completed", label: "→ Terminé" }],
  completed: [],
  cancelled: [],
};

export function OrdersClient({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const transitions = STATUS_TRANSITIONS[currentStatus] ?? [];

  if (transitions.length === 0) return <span className="text-xs text-gray-400">—</span>;

  async function updateStatus(newStatus: string) {
    setLoading(true);
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-1 flex-wrap">
      {transitions.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => updateStatus(t.value)}
          disabled={loading}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors min-h-[32px] ${
            t.value === "cancelled"
              ? "bg-red-100 text-red-700 hover:bg-red-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          } disabled:opacity-50`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
