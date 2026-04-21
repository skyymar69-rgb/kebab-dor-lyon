"use client";

import { useState } from "react";
import QRCodeSVG from "react-qr-code";
import { Phone, MapPin, Globe, Download, X, QrCode, Star } from "lucide-react";

const QR_CODES = [
  {
    id: "site",
    label: "Commander en ligne",
    value: "https://kebabdor-lyon.fr",
    description: "Accès direct au site",
  },
  {
    id: "maps",
    label: "Nous trouver",
    value: "https://maps.google.com/?q=37+rue+Marietton+69009+Lyon",
    description: "Itinéraire Google Maps",
  },
  {
    id: "avis",
    label: "Laisser un avis",
    value: "https://g.page/r/kebabdor-lyon/review",
    description: "Avis Google",
  },
];

export function CarteContactNumerique() {
  const [open, setOpen] = useState(false);
  const [activeQR, setActiveQR] = useState("site");

  const activeCode = QR_CODES.find((q) => q.id === activeQR) ?? QR_CODES[0]!;

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir la carte de contact numérique"
        className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-medium text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors min-h-[40px]"
      >
        <QrCode className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Contact</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Carte de contact numérique — Kebab d'Or"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] p-6 text-white">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-3xl shrink-0" aria-hidden="true">
                  🥙
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">Kebab d&apos;Or</h2>
                  <p className="text-white/80 text-sm">La Mer Égée — Lyon Vaise</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" aria-hidden="true" />
                    ))}
                    <span className="text-xs text-white/70 ml-1">4,5/5 · +500 avis</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-1.5 text-sm text-white/90">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  37 rue Marietton, 69009 Lyon (Vaise)
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <a href="tel:+33478472426" className="hover:underline">+33 4 78 47 24 26</a>
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
                  kebabdor-lyon.fr
                </p>
              </div>
            </div>

            {/* QR codes */}
            <div className="p-5">
              {/* Tabs */}
              <div className="flex gap-2 mb-5 overflow-x-auto">
                {QR_CODES.map((qr) => (
                  <button
                    key={qr.id}
                    type="button"
                    onClick={() => setActiveQR(qr.id)}
                    aria-pressed={activeQR === qr.id}
                    className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-colors min-h-[36px] ${
                      activeQR === qr.id
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-[var(--color-bg)] text-[var(--color-ink-muted)] hover:bg-gray-100"
                    }`}
                  >
                    {qr.label}
                  </button>
                ))}
              </div>

              {/* QR display */}
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-white rounded-xl border border-[var(--color-border)] shadow-sm">
                  <QRCodeSVG
                    value={activeCode.value}
                    size={160}
                    level="M"
                    aria-label={`QR Code — ${activeCode.label}`}
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm text-[var(--color-ink)]">{activeCode.label}</p>
                  <p className="text-xs text-[var(--color-ink-subtle)]">{activeCode.description}</p>
                </div>
              </div>

              {/* vCard download */}
              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <a
                  href="/kebabdor.vcf"
                  download="Kebab-dOr-Lyon.vcf"
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm font-semibold text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors min-h-[44px]"
                  aria-label="Télécharger la fiche contact (vCard)"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Enregistrer le contact (.vcf)
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
