"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toggle } from "@/components/ui/Toggle";
import { Save } from "lucide-react";

interface HourRow {
  dayOfWeek: number;
  dayLabel: string;
  openTime: string | null;
  closeTime: string | null;
  closed: boolean;
}

export function ParametresClient({ hours }: { hours: HourRow[] }) {
  const [rows, setRows] = useState(hours);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  function updateRow(dayOfWeek: number, updates: Partial<HourRow>) {
    setRows((prev) => prev.map((r) => r.dayOfWeek === dayOfWeek ? { ...r, ...updates } : r));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/opening-hours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rows),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    } catch {
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-[var(--color-ink)]">Horaires d&apos;ouverture</h2>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-60 transition-colors"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            {saved ? "Sauvegardé !" : saving ? "Sauvegarde..." : "Sauvegarder"}
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {rows.map((row) => (
            <div key={row.dayOfWeek} className="flex items-center gap-4 px-5 py-3">
              <span className="w-20 text-sm font-medium text-[var(--color-ink)]">
                {row.dayLabel}
              </span>

              <Toggle
                checked={!row.closed}
                onChange={(open) => updateRow(row.dayOfWeek, { closed: !open })}
                label={row.closed ? "Fermé" : "Ouvert"}
              />

              {!row.closed && (
                <>
                  <input
                    type="time"
                    value={row.openTime ?? ""}
                    onChange={(e) => updateRow(row.dayOfWeek, { openTime: e.target.value })}
                    aria-label={`Heure d'ouverture ${row.dayLabel}`}
                    className="rounded border border-gray-200 px-2 py-1 text-sm focus:border-[var(--color-primary)] focus:outline-none min-h-[36px]"
                  />
                  <span className="text-gray-400 text-sm">—</span>
                  <input
                    type="time"
                    value={row.closeTime ?? ""}
                    onChange={(e) => updateRow(row.dayOfWeek, { closeTime: e.target.value })}
                    aria-label={`Heure de fermeture ${row.dayLabel}`}
                    className="rounded border border-gray-200 px-2 py-1 text-sm focus:border-[var(--color-primary)] focus:outline-none min-h-[36px]"
                  />
                </>
              )}

              {row.closed && (
                <span className="text-sm text-gray-400">Fermé</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
