import Link from "next/link";
import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";

const DAYS_FR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const hours = [
  { day: "Lundi – Jeudi", time: "11h00 – 22h30" },
  { day: "Vendredi", time: "15h00 – 23h30" },
  { day: "Samedi", time: "11h00 – 23h30" },
  { day: "Dimanche", time: "Fermé" },
];

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgu", label: "CGU" },
  { href: "/cgv", label: "CGV" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
];

export function Footer() {
  return (
    <footer
      className="bg-[var(--color-ink)] text-white mt-auto"
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">
              Kebab d&apos;Or<br />
              <span className="text-[var(--color-accent)] text-base">La Mer Égée</span>
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Restaurant kebab halal à Lyon Vaise. Viande sélectionnée, portions généreuses, personnalisation totale de votre assiette.
            </p>
            <address className="not-italic space-y-2">
              <p className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 mt-0.5 text-[var(--color-accent)] shrink-0" aria-hidden="true" />
                <span>
                  37 rue Marietton<br />
                  69009 Lyon (Vaise)
                </span>
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-[var(--color-accent)] shrink-0" aria-hidden="true" />
                <a
                  href="tel:+33478472426"
                  className="hover:text-white transition-colors"
                  aria-label="Appeler le restaurant au +33 4 78 47 24 26"
                >
                  +33 4 78 47 24 26
                </a>
              </p>
            </address>
            <p className="mt-3 text-sm text-gray-400">
              <span className="inline-flex items-center gap-1">
                <span aria-hidden="true">🚇</span>
                Métro Valmy (D) — 110 m
              </span>
            </p>
          </div>

          {/* Horaires */}
          <div>
            <h2 className="font-display text-base font-semibold text-white mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
              Horaires
            </h2>
            <dl className="space-y-1.5">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm">
                  <dt className="text-gray-400">{h.day}</dt>
                  <dd
                    className={
                      h.time === "Fermé" ? "text-gray-500" : "text-white font-medium"
                    }
                  >
                    {h.time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-gray-500">
              Horaires sous réserve de modification. Appelez-nous pour confirmer les jours fériés.
            </p>
          </div>

          {/* Liens */}
          <div>
            <h2 className="font-display text-base font-semibold text-white mb-3">
              Navigation
            </h2>
            <nav aria-label="Liens du pied de page">
              <ul className="space-y-2">
                {[
                  { href: "/", label: "Accueil" },
                  { href: "/menu", label: "Notre menu" },
                  { href: "/commander", label: "Commander en ligne" },
                  { href: "/a-propos", label: "À propos" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="text-center sm:text-right">
            <p>
              © {new Date().getFullYear()} LAC DE VAN — Kebab d&apos;Or La Mer Égée.
              Tous droits réservés.
            </p>
            <p className="mt-1">
              Fièrement réalisé par{" "}
              <a
                href="https://internet.kayzen-lyon.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-0.5"
                aria-label="Kayzen Web — agence web Lyon (ouvre dans un nouvel onglet)"
              >
                Kayzen Web
                <ExternalLink className="h-3 w-3 ml-0.5" aria-hidden="true" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
