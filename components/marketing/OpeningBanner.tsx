"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getTodayStatus } from "@/lib/opening-hours";

export function OpeningBanner() {
  const [status, setStatus] = useState<ReturnType<typeof getTodayStatus> | null>(null);

  useEffect(() => {
    setStatus(getTodayStatus());
    const interval = setInterval(() => setStatus(getTodayStatus()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <div
      className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium ${
        status.isOpen
          ? "bg-green-600 text-white"
          : "bg-[var(--color-ink-muted)] text-white"
      }`}
      role="status"
      aria-live="polite"
      aria-label={`Statut du restaurant : ${status.todayLabel}${status.nextOpenLabel ? ` — ${status.nextOpenLabel}` : ""}`}
    >
      <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{status.todayLabel}</span>
      {status.nextOpenLabel && (
        <span className="opacity-80">— {status.nextOpenLabel}</span>
      )}
    </div>
  );
}
