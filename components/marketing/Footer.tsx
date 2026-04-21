import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";

const FORMULES = [
  { name: "Menu Sandwich Kebab", price: "13,65 €" },
  { name: "Menu Assiette Kebab", price: "13,65 €" },
  { name: "Menu Géant Kebab",    price: "21,06 €" },
  { name: "Menu Tacos",          price: "15,47 €" },
  { name: "Menu Maxi Tacos",     price: "21,06 €" },
  { name: "Menu Roulé",          price: "12,35 €" },
  { name: "Menu Hamburger",      price: "11,05 €" },
  { name: "Menu Enfant",         price: "7,50 €"  },
];

const SITEMAP = [
  { href: "/",                  label: "Accueil" },
  { href: "/menu",              label: "Notre menu" },
  { href: "/commander",         label: "Commander en ligne" },
  { href: "/a-propos",          label: "À propos" },
  { href: "/contact",           label: "Contact" },
  { href: "/mentions-legales",  label: "Mentions légales" },
  { href: "/cgu",               label: "CGU" },
  { href: "/cgv",               label: "CGV" },
  { href: "/confidentialite",   label: "Confidentialité" },
];

const HOURS = [
  { day: "Lundi – Jeudi", time: "11h00 – 22h30" },
  { day: "Vendredi",      time: "15h00 – 23h30" },
  { day: "Samedi",        time: "11h00 – 23h30" },
  { day: "Dimanche",      time: "Fermé" },
];

const FOOTER_PHOTOS = [
  {
    src: "/images/restaurant/kebab-sandwich-ouvert.webp",
    alt: "Sandwich kebab ouvert garni de viande halal — Kebab d'Or Lyon Vaise",
  },
  {
    src: "/images/restaurant/assiette-kebab-complete.webp",
    alt: "Assiette kebab complète avec riz, frites et salade — Kebab d'Or",
  },
  {
    src: "/images/restaurant/tacos-ouvert.webp",
    alt: "Tacos ouvert au steak haché et fromage fondu — Kebab d'Or Lyon",
  },
];

export function Footer() {
  return (
    <footer
      className="bg-[var(--color-ink)] text-white mt-auto"
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Col 1 : Brand + photos ── */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4"
              aria-label="Kebab d'Or — La Mer Égée, retour à l'accueil"
            >
              <span aria-hidden="true" className="text-2xl">🥙</span>
              <span>
                <span className="font-display text-lg font-bold text-white block">Kebab d&apos;Or</span>
                <span className="text-[var(--color-accent)] text-sm">La Mer Égée</span>
              </span>
            </Link>

            <address className="not-italic space-y-2 mb-5">
              <p className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4 mt-0.5 text-[var(--color-accent)] shrink-0" aria-hidden="true" />
                <span>37 rue Marietton<br />69009 Lyon (Vaise)</span>
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-[var(--color-accent)] shrink-0" aria-hidden="true" />
                <a
                  href="tel:+33478472426"
                  className="hover:text-white transition-colors"
                  aria-label="Appeler le +33 4 78 47 24 26"
                >
                  +33 4 78 47 24 26
                </a>
              </p>
              <p className="text-sm text-gray-400 flex items-center gap-1.5">
                <span aria-hidden="true">🚇</span>
                Métro Valmy (ligne D) — 110 m
              </p>
            </address>

            {/* Photos mini-galerie */}
            <div className="grid grid-cols-3 gap-1.5" aria-label="Photos du restaurant">
              {FOOTER_PHOTOS.map((photo) => (
                <div
                  key={photo.src}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Col 2 : Nos formules ── */}
          <div>
            <h2 className="font-display text-base font-semibold text-white mb-4 flex items-center gap-2">
              <span aria-hidden="true" className="text-[var(--color-accent)]">🍽️</span>
              Nos formules
            </h2>
            <ul className="space-y-2">
              {FORMULES.map((f) => (
                <li key={f.name}>
                  <Link
                    href="/commander"
                    className="flex items-center justify-between text-sm group"
                  >
                    <span className="text-gray-400 group-hover:text-white transition-colors">
                      {f.name}
                    </span>
                    <span className="font-semibold text-[var(--color-accent)] shrink-0 ml-3">
                      {f.price}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              Accompagnement + boisson inclus · TVA 10 % incluse
            </p>
          </div>

          {/* ── Col 3 : Plan du site ── */}
          <div>
            <h2 className="font-display text-base font-semibold text-white mb-4">
              Plan du site
            </h2>
            <nav aria-label="Plan du site">
              <ul className="space-y-2">
                {SITEMAP.map((link) => (
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

          {/* ── Col 4 : Horaires + Livraison partenaires ── */}
          <div>
            <h2 className="font-display text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
              Horaires
            </h2>
            <dl className="space-y-2 mb-6">
              {HOURS.map((h) => (
                <div key={h.day} className="flex justify-between text-sm">
                  <dt className="text-gray-400">{h.day}</dt>
                  <dd className={h.time === "Fermé" ? "text-gray-600" : "font-medium text-white"}>
                    {h.time}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="pt-5 border-t border-gray-800">
              <h3 className="text-sm font-semibold text-white mb-3">
                Livraison à domicile
              </h3>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                La livraison est assurée par nos partenaires. Retrouvez-nous sur :
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://deliveroo.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                  aria-label="Commander sur Deliveroo (ouvre dans un nouvel onglet)"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00CCBC] text-white font-bold text-xs shrink-0" aria-hidden="true">
                    D
                  </span>
                  Deliveroo
                  <ExternalLink className="h-3 w-3 ml-auto text-gray-600" aria-hidden="true" />
                </a>
                <a
                  href="https://www.ubereats.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                  aria-label="Commander sur Uber Eats (ouvre dans un nouvel onglet)"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-black border border-gray-600 text-white font-bold text-xs shrink-0" aria-hidden="true">
                    U
                  </span>
                  Uber Eats
                  <ExternalLink className="h-3 w-3 ml-auto text-gray-600" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Barre légale ── */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} LAC DE VAN SASU — Kebab d&apos;Or La Mer Égée.
            Tous droits réservés.
          </p>
          <p>
            Fièrement réalisé par{" "}
            <a
              href="https://internet.kayzen-lyon.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-0.5"
              aria-label="Kayzen Web, agence web à Lyon — ouvre dans un nouvel onglet"
            >
              Kayzen Web
              <ExternalLink className="h-3 w-3 ml-0.5" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
