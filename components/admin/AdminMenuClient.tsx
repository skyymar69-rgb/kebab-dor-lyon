"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toggle } from "@/components/ui/Toggle";

interface Item {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  available: boolean;
  priceOverride: number | null;
}

export function AdminMenuClient({ items }: { items: Item[] }) {
  const router = useRouter();

  async function toggleAvailability(itemId: string, available: boolean) {
    await fetch(`/api/menu/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available }),
    });
    router.refresh();
  }

  async function setPriceOverride(itemId: string, price: number | null) {
    await fetch(`/api/menu/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceOverride: price }),
    });
    router.refresh();
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {["Produit", "Catégorie", "Prix de base", "Prix override", "Disponible"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item) => (
            <tr key={item.id} className={`hover:bg-gray-50 ${!item.available ? "opacity-50" : ""}`}>
              <td className="px-4 py-3 font-medium">{item.name}</td>
              <td className="px-4 py-3 text-gray-500 capitalize">{item.category}</td>
              <td className="px-4 py-3">{item.basePrice.toFixed(2)} €</td>
              <td className="px-4 py-3">
                <PriceOverrideInput
                  value={item.priceOverride}
                  onChange={(v) => setPriceOverride(item.id, v)}
                />
              </td>
              <td className="px-4 py-3">
                <Toggle
                  checked={item.available}
                  onChange={(v) => toggleAvailability(item.id, v)}
                  label={item.available ? "Disponible" : "Indisponible"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PriceOverrideInput({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value?.toString() ?? "");

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="text-xs text-[var(--color-primary)] hover:underline"
      >
        {value !== null ? `${value.toFixed(2)} €` : "— (définir)"}
      </button>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <input
        type="number"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        step="0.05"
        min="0"
        placeholder="Prix €"
        className="w-20 rounded border border-gray-300 px-2 py-1 text-xs"
        autoFocus
      />
      <button
        type="button"
        onClick={() => {
          const v = draft ? parseFloat(draft) : null;
          onChange(v);
          setEditing(false);
        }}
        className="text-xs bg-green-600 text-white rounded px-2 py-1"
      >
        OK
      </button>
      <button
        type="button"
        onClick={() => { onChange(null); setEditing(false); }}
        className="text-xs text-gray-500 hover:text-red-600"
      >
        Reset
      </button>
    </div>
  );
}
