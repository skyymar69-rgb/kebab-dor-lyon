import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { OpeningBanner } from "@/components/marketing/OpeningBanner";
import { MapSection } from "@/components/marketing/MapSection";
import { Star, ChevronRight, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Kebab d'Or – La Mer Égée | Kebab halal Lyon Vaise",
  description:
    "Restaurant kebab halal à Lyon Vaise (9e). Viande grillée, portions généreuses, tout personnalisable. 37 rue Marietton, Lyon. Disponible sur Deliveroo et Uber Eats.",
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
  {
    name: "Menu Sandwich Kebab",
    price: "13,65 €",
    tag: "Le classique",
    img: "/images/restaurant/kebab-sandwich-ouvert.webp",
    alt: "Sandwich kebab ouvert garni de viande grillée halal, tomates fraîches et sauce maison — Kebab d'Or Lyon Vaise",
  },
  {
    name: "Menu Assiette Kebab",
    price: "13,65 €",
    tag: "Généreux",
    img: "/images/restaurant/assiette-kebab-complete.webp",
    alt: "Assiette kebab complète avec viande grillée, riz, frites dorées et salade fraîche — Kebab d'Or Lyon 9e",
  },
  {
    name: "Menu Géant Kebab",
    price: "21,06 €",
    tag: "Pour les grandes faims",
    img: "/images/restaurant/kebab-geant.webp",
    alt: "Kebab géant grillé sur pain pita doré — spécialité Kebab d'Or Lyon Vaise",
  },
  {
    name: "Menu Tacos",
    price: "15,47 €",
    tag: "Tendance",
    img: "/images/restaurant/tacos-ouvert.webp",
    alt: "Tacos ouvert garni de viande hachée halal et fromage fondu — Kebab d'Or Lyon",
  },
  {
    name: "Menu Roulé",
    price: "12,35 €",
    tag: "Pratique",
    img: "/images/restaurant/menu-roule-boisson.webp",
    alt: "Menu roulé kebab avec frites et boisson — Kebab d'Or Vaise",
  },
  {
    name: "Menu Hamburger",
    price: "11,05 €",
    tag: "Halal",
    img: "/images/restaurant/frites-maison.webp",
    alt: "Frites maison dorées — accompagnement du menu hamburger Kebab d'Or",
  },
];

const GALLERY = [
  {
    src: "/images/restaurant/menu-assortiment.webp",
    alt: "Assortiment complet Kebab d'Or : sandwich kebab, tacos, assiette, nuggets et roulé — Lyon Vaise",
    className: "col-span-2 row-span-2",
    caption: "Notre assortiment",
  },
  {
    src: "/images/restaurant/interieur-restaurant.webp",
    alt: "Intérieur du restaurant Kebab d'Or à Lyon Vaise avec comptoir et menu affiché",
    className: "col-span-1 row-span-2",
    caption: "Notre restaurant",
  },
  {
    src: "/images/restaurant/kebab-sandwich-ouvert.webp",
    alt: "Kebab sandwich ouvert avec viande halal, tomates et sauce — Kebab d'Or Lyon",
    className: "col-span-1",
    caption: "Kebab sandwich",
  },
  {
    src: "/images/restaurant/assiette-kebab-complete.webp",
    alt: "Assiette kebab avec riz, frites et salade — Kebab d'Or Lyon 9e",
    className: "col-span-1",
    caption: "Assiette complète",
  },
  {
    src: "/images/restaurant/tacos-ouvert.webp",
    alt: "Tacos maison ouvert — steak haché et fromage fondu Kebab d'Or",
    className: "col-span-1",
    caption: "Tacos maison",
  },
  {
    src: "/images/restaurant/menu-roule-frites.webp",
    alt: "Menu roulé kebab avec frites — Kebab d'Or Lyon Vaise",
    className: "col-span-1",
    caption: "Menu roulé",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FastFoodRestaurant",
  name: "Kebab d'Or – La Mer Égée",
  alternateName: "Kebab d'Or Le Marietton",
  image: [
    "/images/restaurant/menu-assortiment.webp",
    "/images/restaurant/kebab-sandwich-ouvert.webp",
    "/images/restaurant/interieur-restaurant.webp",
  ],
  description:
    "Restaurant kebab halal à Lyon Vaise (9e). Viande grillée, portions généreuses, personnalisation totale.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "37 rue Marietton",
    addressLocality: "Lyon",
    addressRegion: "Auvergne-Rhône-Alpes",
    postalCode: "69009",
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 45.7676, longitude: 4.8113 },
  telephone: "+33478472426",
  url: "https://kebabdor-lyon.fr",
  servesCuisine: ["Halal", "Turkish", "Mediterranean"],
  priceRange: "€€",
  hasMap: "https://maps.google.com/?q=37+rue+Marietton+69009+Lyon",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday"], opens: "11:00", closes: "22:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday",   opens: "15:00", closes: "23:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "11:00", closes: "23:30" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "539", bestRating: "5" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <OpeningBanner />

      {/* ── HERO ── */}
      <section
        className="relative min-h-[88vh] flex items-center bg-[var(--color-ink)] overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/restaurant/menu-assortiment.webp"
            alt="Assortiment complet du Kebab d'Or Lyon Vaise : sandwich kebab, tacos, assiette avec riz et frites, roulé"
            fill
            className="object-cover opacity-45 hero-image"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-[var(--color-accent)] text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-2">
              <span aria-hidden="true">🥩</span> Viande 100 % Halal · Lyon Vaise
            </p>
            <h1
              id="hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance"
            >
              Le goût du vrai kebab à Vaise
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed">
              Portions généreuses, viande sélectionnée, chaque assiette composée à votre goût.
              Sur place, à emporter, ou en livraison.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/menu"
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-4 text-base font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[52px] shadow-lg"
              >
                Voir notre menu
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a
                href="tel:+33478472426"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 hover:border-white transition-colors min-h-[52px] backdrop-blur-sm"
                aria-label="Appeler le restaurant au 04 78 47 24 26"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                04 78 47 24 26
              </a>
            </div>

            <div className="mt-8 flex items-center gap-2 text-white/80 text-sm">
              <span aria-label="Note 5 étoiles sur 5" className="flex gap-0.5">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]" aria-hidden="true" />
                ))}
              </span>
              <span>4,5/5 — plus de 500 avis clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS ── */}
      <section className="py-20 bg-white" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                id="features-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-4"
              >
                Pourquoi choisir Kebab&nbsp;d&apos;Or&nbsp;?
              </h2>
              <p className="text-[var(--color-ink-muted)] mb-8 leading-relaxed">
                À deux pas du métro Valmy, le Kebab d&apos;Or défend la tradition des grillades méditerranéennes :
                viande fraîche, recettes généreuses, accueil chaleureux.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "🥩", title: "Viande halal sélectionnée", desc: "Veau et agneau certifiés halal, grillés à la broche chaque jour devant vous." },
                  { icon: "🍽️", title: "Portions généreuses",       desc: "On ne fait pas dans la demi-mesure. Chaque assiette est faite pour que vous repartiez rassasié." },
                  { icon: "⚡",  title: "Service rapide",           desc: "Sur place ou à emporter, vos commandes sont prêtes rapidement. Aussi disponible sur Deliveroo et Uber Eats." },
                ].map((feat) => (
                  <article key={feat.title} className="flex gap-4 items-start">
                    <span className="h-11 w-11 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-xl shrink-0" aria-hidden="true">
                      {feat.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold text-[var(--color-ink)] mb-0.5">{feat.title}</h3>
                      <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{feat.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="image-container rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                <Image
                  src="/images/restaurant/kebab-sandwich-ouvert.webp"
                  alt="Kebab sandwich ouvert garni de viande grillée halal, tomates fraîches et sauce maison — Kebab d'Or Lyon Vaise"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-4 border border-[var(--color-border)]">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[var(--color-accent)] text-[var(--color-accent)]" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-[var(--color-ink)]">539 avis vérifiés</p>
                <p className="text-xs text-[var(--color-ink-subtle)]">Google · Tripadvisor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APERÇU MENU ── */}
      <section className="py-20 bg-[var(--color-bg)]" aria-labelledby="menu-preview-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="menu-preview-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-3"
            >
              Nos formules populaires
            </h2>
            <p className="text-[var(--color-ink-muted)]">
              Chaque formule inclut accompagnement + boisson. Tout est personnalisable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MENU_STARS.map((item) => (
              <article
                key={item.name}
                className="card-hover group rounded-2xl bg-white border border-[var(--color-border)] overflow-hidden shadow-sm"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-[var(--color-accent)] px-2.5 py-1 text-xs font-bold text-white shadow">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-[var(--color-ink)]">{item.name}</h3>
                  <p className="font-bold text-[var(--color-primary)] text-lg shrink-0 ml-3">{item.price}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
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

      {/* ── GALERIE ── */}
      <section className="py-20 bg-white" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="gallery-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-3"
            >
              Notre restaurant en images
            </h2>
            <p className="text-[var(--color-ink-muted)]">
              Kebab d&apos;Or — La Mer Égée · 37 rue Marietton, Lyon 9e
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[220px]">
            {GALLERY.map((photo, i) => (
              <figure
                key={photo.src}
                className={`image-container relative overflow-hidden rounded-2xl group ${photo.className}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  priority={i === 0}
                />
                <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMANDER / LIVRAISON ── */}
      <section className="py-16 bg-[var(--color-primary)]" aria-labelledby="order-heading">
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 id="order-heading" className="font-display text-3xl font-bold mb-4">
            Envie d&apos;un kebab ?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Venez nous rendre visite au 37 rue Marietton, appelez-nous directement, ou commandez en livraison via nos partenaires.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+33478472426"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[var(--color-primary)] hover:bg-gray-50 transition-colors min-h-[48px]"
              aria-label="Appeler le restaurant au 04 78 47 24 26"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              04 78 47 24 26
            </a>
            <a
              href="https://deliveroo.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors min-h-[48px]"
              aria-label="Commander sur Deliveroo (ouvre dans un nouvel onglet)"
            >
              Commander sur Deliveroo
            </a>
            <a
              href="https://www.ubereats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors min-h-[48px]"
              aria-label="Commander sur Uber Eats (ouvre dans un nouvel onglet)"
            >
              Commander sur Uber Eats
            </a>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="py-20 bg-white" aria-labelledby="reviews-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="reviews-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-3"
            >
              Ce que disent nos clients
            </h2>
            <p className="text-[var(--color-ink-muted)]">
              4,5/5 sur plus de 500 avis vérifiés — Google, Tripadvisor, Restaurant Guru
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <article
                key={review.author}
                className="card-hover bg-[var(--color-bg)] rounded-2xl border border-[var(--color-border)] p-5 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-3" aria-label={`Note : ${review.rating} étoiles sur 5`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]" aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mb-3">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <footer className="text-xs text-[var(--color-ink-subtle)]">
                    <cite className="font-semibold not-italic text-[var(--color-ink)]">{review.author}</cite>{" "}
                    — {review.source} · {review.date}
                  </footer>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCALISATION ── */}
      <section className="py-20 bg-[var(--color-bg)]" aria-labelledby="location-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              id="location-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-3"
            >
              Nous trouver
            </h2>
            <p className="text-[var(--color-ink-muted)]">
              37 rue Marietton, 69009 Lyon — à 110 m du métro Valmy (ligne D)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="image-container relative h-52 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/restaurant/interieur-restaurant.webp"
                  alt="Intérieur du restaurant Kebab d'Or à Lyon Vaise avec comptoir de commande, menu affiché et salle accueillante"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-display font-bold text-lg">Kebab d&apos;Or</p>
                  <p className="text-sm text-white/80 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    37 rue Marietton, Lyon 9e
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[var(--color-border)] shadow-sm">
                <h3 className="font-display text-lg font-bold mb-4">Informations pratiques</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <dt className="font-semibold w-24 shrink-0 text-[var(--color-ink-muted)]">Adresse</dt>
                    <dd>37 rue Marietton, 69009 Lyon (Vaise, 9e)</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="font-semibold w-24 shrink-0 text-[var(--color-ink-muted)]">Métro</dt>
                    <dd>Valmy (ligne D) — 110 m à pied</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="font-semibold w-24 shrink-0 text-[var(--color-ink-muted)]">Téléphone</dt>
                    <dd>
                      <a href="tel:+33478472426" className="text-[var(--color-primary)] hover:underline font-medium flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                        +33 4 78 47 24 26
                      </a>
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <h4 className="font-semibold text-sm mb-3">Horaires d&apos;ouverture</h4>
                  <dl className="space-y-1.5 text-sm">
                    {[
                      ["Lun – Jeu", "11h00 – 22h30"],
                      ["Vendredi",  "15h00 – 23h30"],
                      ["Samedi",    "11h00 – 23h30"],
                      ["Dimanche",  "Fermé"],
                    ].map(([day, time]) => (
                      <div key={day} className="flex justify-between">
                        <dt className="text-[var(--color-ink-muted)]">{day}</dt>
                        <dd className={time === "Fermé" ? "text-gray-400" : "font-semibold text-[var(--color-ink)]"}>{time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=37+rue+Marietton+69009+Lyon"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2 w-full rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[44px]"
                aria-label="Itinéraire Google Maps vers le Kebab d'Or — ouvre dans un nouvel onglet"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Voir l&apos;itinéraire sur Google Maps
              </a>
            </div>

            <MapSection />
          </div>
        </div>
      </section>
    </>
  );
}
