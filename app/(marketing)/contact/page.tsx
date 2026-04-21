import type { Metadata } from "next";
import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/marketing/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez le Kebab d'Or à Lyon Vaise. Téléphone, adresse, horaires et formulaire de contact. 37 rue Marietton, 69009 Lyon.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[var(--color-ink)] py-16 px-4 text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-4">
          Nous contacter
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Une question, une réclamation, un grand événement à organiser ? On est là.
        </p>
      </section>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-6">
              Informations pratiques
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[var(--color-border)]">
                <MapPin className="h-5 w-5 text-[var(--color-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[var(--color-ink)]">Adresse</p>
                  <address className="not-italic text-sm text-[var(--color-ink-muted)] mt-0.5">
                    37 rue Marietton<br />
                    69009 Lyon (Vaise, 9e)
                  </address>
                  <a
                    href="https://maps.google.com/?q=37+rue+Marietton+69009+Lyon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--color-primary)] hover:underline"
                    aria-label="Voir l'itinéraire sur Google Maps (ouvre dans un nouvel onglet)"
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    Voir l&apos;itinéraire
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[var(--color-border)]">
                <Phone className="h-5 w-5 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[var(--color-ink)]">Téléphone</p>
                  <a
                    href="tel:+33478472426"
                    className="text-sm text-[var(--color-primary)] hover:underline"
                    aria-label="Appeler le restaurant au +33 4 78 47 24 26"
                  >
                    +33 4 78 47 24 26
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[var(--color-border)]">
                <Clock className="h-5 w-5 text-[var(--color-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[var(--color-ink)] mb-2">Horaires</p>
                  <dl className="text-sm text-[var(--color-ink-muted)] space-y-1">
                    {[
                      ["Lundi – Jeudi", "11h00 – 22h30"],
                      ["Vendredi", "15h00 – 23h30"],
                      ["Samedi", "11h00 – 23h30"],
                      ["Dimanche", "Fermé"],
                    ].map(([day, time]) => (
                      <div key={day} className="flex justify-between gap-4">
                        <dt>{day}</dt>
                        <dd className={time === "Fermé" ? "text-gray-400" : "font-medium"}>{time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <p className="font-semibold mb-1">🚇 Accès facile</p>
              <p>Métro <strong>Valmy</strong> (ligne D) — à seulement 110 m. Parking disponible à proximité.</p>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-6">
              Envoyer un message
            </h2>
            <ContactForm />
          </div>
        </div>
      </main>
    </>
  );
}
