import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { OpeningBanner } from "@/components/marketing/OpeningBanner";
import { MapSection } from "@/components/marketing/MapSection";
import { Star, CheckCircle, Clock, Bike, ShoppingBag, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Kebab d'Or – La Mer Égée | Kebab halal Lyon Vaise — Commande en ligne",
  description:
    "Le meilleur kebab halal à Lyon Vaise. Commandez en ligne en click & collect ou livraison. 37 rue Marietton, Lyon 9e. Portions généreuses, personnalisation totale.",
  alternates: { canonical: "/" },
};

const REVIEWS = [
  {
    author: "Sylvain C.",
    rating: 5,
    date: "Février 2026",
    text: "Excellent kebab à l'ancienne ! Tout est délicieux et copieux !",
    source: "Google",
  },
  {
    author: "Dali S.",
    rating: 5,
    date: "Janvier 2025",
    text: "Très bon kebab je vous recommande franchement, le chef est cool et les commandes arrivent très rapidement.",
    source: "Google",
  },
  {
    author: "Gabin D.",
    rating: 5,
    date: "Janvier 2025",
    text: "Chaque repas est servi avec une saveur unique et un goût inoubliable. Service excellent, ambiance agréable.",
    source: "Google",
  },
  {
    author: "Enzo P.",
    rating: 5,
    date: "Janvier 2024",
    text: "Très bon kebab, gérant généreux et professionnel. L'endroit est propre et bien tenu.",
    source: "Tripadvisor",
  },
  {
    author: "Nils C.",
    rating: 5,
    date: "Janvier 2025",
    text: "Bon kebab bien avec de bonne viande j'ai aimé. Accueil le chef est sympa et cool, on se sent bien dans l'ambiance.",
    source: "Google",
  },
  {
    author: "Axel V.",
    rating: 5,
    date: "Février 2026",
    text: "Au top rien à dire.",
    source: "Google",
  },
];

const MENU_STARS = [
  { name: "Menu Sandwich Kebab", price: "13,65 €", tag: "Le classique" },
  { name: "Menu Assiette Kebab", price: "13,65 €", tag: "Généreux" },
  { name: "Menu Géant Kebab", price: "21,06 €", tag: "Pour les grandes faims" },
  { name: "Menu Tacos", price: "15,47 €", tag: "Tendance" },
  { name: "Menu Roulé", price: "12,35 €", tag: "Pratique" },
  { name: "Menu Hamburger", price: "11,05 €", tag: "Halal" },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FastFoodRestaurant",
  name: "Kebab d'Or – La Mer Égée",
  alternateName: "Kebab d'Or Le Marietton",
  image: "/og-image.jpg",
  description:
    "Restaurant kebab halal à Lyon Vaise (9e), spécialisé dans les grillades méditerranéennes. Personnalisation totale, portions généreuses.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "37 rue Marietton",
    addressLocality: "Lyon",
    addressRegion: "Auvergne-Rhône-Alpes",
    postalCode: "69009",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.7676,
    longitude: 4.8113,
  },
  telephone: "+33478472426",
  url: "https://kebabdor-lyon.fr",
  servesCuisine: ["Halal", "Turkish", "Mediterranean"],
  priceRange: "€€",
  hasMap: "https://maps.google.com/?q=37+rue+Marietton+69009+Lyon",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "11:00",
      closes: "22:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "15:00",
      closes: "23:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "11:00",
      closes: "23:30",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "539",
    bestRating: "5",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <OpeningBanner />

      {/* HERO */}
      <section
        className="relative min-h-[85vh] flex items-center bg-[var(--color-ink)] overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1200&q=80"
            alt="Assiette kebab généreuse avec viande grillée, frites et sauces"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-[var(--color-accent)] text-sm font-semibold tracking-wider uppercase mb-4">
              🥩 Viande 100 % Halal · Lyon Vaise
            </p>
            <h1
              id="hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance"
            >
              Le goût du vrai kebab à Vaise
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl">
              Portions généreuses, viande sélectionnée, chaque assiette composée à votre goût. Commandez en ligne — sans commission Deliveroo.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/commander"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-4 text-base font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[52px] shadow-lg"
              >
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                Commander maintenant
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors min-h-[52px]"
              >
                Voir le menu
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2 text-white/80 text-sm">
              <span aria-hidden="true" className="flex gap-0.5">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]" aria-hidden="true" />
                ))}
              </span>
              <span>4,5/5 — plus de 500 avis clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section
        className="py-16 bg-white"
        aria-labelledby="features-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="features-heading"
            className="font-display text-3xl font-bold text-center text-[var(--color-ink)] mb-12"
          >
            Pourquoi choisir Kebab d&apos;Or ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🥩",
                title: "Viande halal sélectionnée",
                desc: "Viande de veau et agneau, certifiée halal. Grillée à la broche devant vous, chaque jour.",
              },
              {
                icon: "🍽️",
                title: "Portions généreuses",
                desc: "On ne fait pas dans la demi-mesure. Chaque assiette est composée pour que vous repartiez rassasié.",
              },
              {
                icon: "⚡",
                title: "Prêt en 15 minutes",
                desc: "Click & collect ou livraison. Commandez en ligne, on s'occupe du reste. Pas de commission, pas d'attente.",
              },
            ].map((feat) => (
              <article
                key={feat.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]"
              >
                <span className="text-4xl mb-4" aria-hidden="true">{feat.icon}</span>
                <h3 className="font-display text-xl font-bold mb-2 text-[var(--color-ink)]">
                  {feat.title}
                </h3>
                <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                  {feat.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BANNIÈRE ANTI-COMMISSION */}
      <section className="bg-[var(--color-primary)] py-8 px-4" aria-label="Avantage commande directe">
        <div className="mx-auto max-w-4xl text-center text-white">
          <p className="font-display text-2xl font-bold mb-2">
            Économisez jusqu&apos;à 30% par rapport à Deliveroo
          </p>
          <p className="text-white/80 mb-4">
            En commandant directement sur notre site, vous payez le prix juste — sans commission plateforme. Et nous, on préserve notre qualité.
          </p>
          <Link
            href="/commander"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[var(--color-primary)] hover:bg-gray-50 transition-colors min-h-[44px]"
          >
            Commander sans commission
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* APERÇU MENU */}
      <section className="py-16 bg-[var(--color-bg)]" aria-labelledby="menu-preview-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              id="menu-preview-heading"
              className="font-display text-3xl font-bold text-[var(--color-ink)] mb-3"
            >
              Nos formules populaires
            </h2>
            <p className="text-[var(--color-ink-muted)]">
              Chaque formule inclut accompagnement + boisson. Tout est personnalisable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MENU_STARS.map((item) => (
              <article
                key={item.name}
                className="flex items-center justify-between rounded-xl bg-white border border-[var(--color-border)] p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wide">
                    {item.tag}
                  </span>
                  <h3 className="font-display text-base font-bold text-[var(--color-ink)] mt-0.5">
                    {item.name}
                  </h3>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="font-bold text-[var(--color-primary)] text-lg">{item.price}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--color-primary)] px-6 py-3 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors min-h-[44px]"
            >
              Voir tout le menu
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-16 bg-white" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="how-it-works-heading"
            className="font-display text-3xl font-bold text-center text-[var(--color-ink)] mb-12"
          >
            Comment commander ?
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
            {[
              {
                num: "1",
                icon: <ShoppingBag className="h-6 w-6" aria-hidden="true" />,
                title: "Choisissez",
                desc: "Parcourez le menu, composez votre assiette — viande, accompagnement, sauces, boisson — tout à votre goût.",
              },
              {
                num: "2",
                icon: <CheckCircle className="h-6 w-6" aria-hidden="true" />,
                title: "Payez",
                desc: "Carte en ligne en toute sécurité (Stripe), ou paiement sur place à la récupération. Votre choix.",
              },
              {
                num: "3",
                icon: <Bike className="h-6 w-6" aria-hidden="true" />,
                title: "Récupérez ou on livre",
                desc: "Click & collect en 15 min au 37 rue Marietton, ou livraison à domicile sous 30 min dans la zone Vaise / Lyon 9.",
              },
            ].map((step) => (
              <li
                key={step.num}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-white mb-4"
                  aria-hidden="true"
                >
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-[var(--color-ink-subtle)] uppercase tracking-wider mb-1">
                  Étape {step.num}
                </span>
                <h3 className="font-display text-xl font-bold text-[var(--color-ink)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>

          <div className="text-center mt-10">
            <Link
              href="/commander"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-4 text-base font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[52px]"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              Démarrer ma commande
            </Link>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-16 bg-[var(--color-bg)]" aria-labelledby="reviews-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              id="reviews-heading"
              className="font-display text-3xl font-bold text-[var(--color-ink)] mb-3"
            >
              Ce que disent nos clients
            </h2>
            <p className="text-[var(--color-ink-muted)]">
              4,5/5 sur plus de 500 avis vérifiés — Restaurant Guru, Google, Tripadvisor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <article
                key={review.author}
                className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-3" aria-label={`Note : ${review.rating} étoiles sur 5`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mb-3">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <footer className="text-xs text-[var(--color-ink-subtle)]">
                    <cite className="font-semibold not-italic text-[var(--color-ink)]">
                      {review.author}
                    </cite>{" "}
                    — {review.source} · {review.date}
                  </footer>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALISATION */}
      <section className="py-16 bg-white" aria-labelledby="location-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              id="location-heading"
              className="font-display text-3xl font-bold text-[var(--color-ink)] mb-3"
            >
              Nous trouver
            </h2>
            <p className="text-[var(--color-ink-muted)]">
              37 rue Marietton, 69009 Lyon — à 110 m du métro Valmy (ligne D)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="bg-[var(--color-bg)] rounded-2xl p-6 border border-[var(--color-border)]">
                <h3 className="font-display text-lg font-bold mb-4">Informations pratiques</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <dt className="font-semibold w-24 shrink-0">Adresse</dt>
                    <dd>37 rue Marietton, 69009 Lyon (Vaise, 9e)</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="font-semibold w-24 shrink-0">Métro</dt>
                    <dd>Valmy (ligne D) — 110 m</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="font-semibold w-24 shrink-0">Téléphone</dt>
                    <dd>
                      <a href="tel:+33478472426" className="text-[var(--color-primary)] hover:underline">
                        +33 4 78 47 24 26
                      </a>
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <h4 className="font-semibold text-sm mb-2">Horaires</h4>
                  <dl className="space-y-1 text-sm text-[var(--color-ink-muted)]">
                    {[
                      ["Lundi – Jeudi", "11h00 – 22h30"],
                      ["Vendredi", "15h00 – 23h30"],
                      ["Samedi", "11h00 – 23h30"],
                      ["Dimanche", "Fermé"],
                    ].map(([day, time]) => (
                      <div key={day} className="flex justify-between">
                        <dt>{day}</dt>
                        <dd className={time === "Fermé" ? "text-gray-400" : "font-medium text-[var(--color-ink)]"}>{time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=37+rue+Marietton+69009+Lyon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[44px]"
                aria-label="Obtenir l'itinéraire vers le Kebab d'Or (ouvre Google Maps dans un nouvel onglet)"
              >
                <Clock className="h-4 w-4" aria-hidden="true" />
                Voir l&apos;itinéraire
              </a>
            </div>

            <MapSection />
          </div>
        </div>
      </section>
    </>
  );
}
