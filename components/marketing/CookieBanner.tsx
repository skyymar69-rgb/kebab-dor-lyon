"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

type ConsentState = {
  analytics: boolean;
  decided: boolean;
};

const CONSENT_KEY = "kebabdor-consent";

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        setConsent(JSON.parse(stored) as ConsentState);
      } else {
        setConsent({ analytics: false, decided: false });
      }
    } catch {
      setConsent({ analytics: false, decided: false });
    }
  }, []);

  function saveConsent(analytics: boolean) {
    const value: ConsentState = { analytics, decided: true };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    setConsent(value);
  }

  if (!consent || consent.decided) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gestion des cookies"
      aria-describedby="cookie-desc"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl bg-[var(--color-ink)] text-white rounded-2xl shadow-2xl p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-[var(--color-accent)] shrink-0" aria-hidden="true" />
            <h2 className="font-display text-base font-bold">Gestion des cookies</h2>
          </div>
          <button
            type="button"
            onClick={() => saveConsent(false)}
            aria-label="Fermer — refuser les cookies optionnels"
            className="text-gray-400 hover:text-white transition-colors p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p id="cookie-desc" className="text-sm text-gray-300 mb-4">
          Nous utilisons des cookies <strong className="text-white">strictement nécessaires</strong> au fonctionnement du site (panier, session). Avec votre accord, nous déposons également des cookies analytiques anonymes (Vercel Analytics) pour améliorer notre service. Aucune donnée n&apos;est vendue à des tiers.{" "}
          <Link href="/confidentialite" className="text-[var(--color-accent)] hover:underline">
            En savoir plus
          </Link>
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => saveConsent(true)}
            className="flex-1 rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-sm font-bold text-white hover:bg-[var(--color-accent-dark)] transition-colors min-h-[44px]"
          >
            Tout accepter
          </button>
          <button
            type="button"
            onClick={() => saveConsent(false)}
            className="flex-1 rounded-lg border border-gray-600 px-4 py-2.5 text-sm font-semibold text-gray-300 hover:bg-gray-800 transition-colors min-h-[44px]"
          >
            Cookies nécessaires uniquement
          </button>
        </div>
      </div>
    </div>
  );
}
