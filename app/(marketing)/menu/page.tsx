import type { Metadata } from "next";
import { Phone } from "lucide-react";
import menuData from "@/data/menu.json";
import { formatPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Découvrez le menu du Kebab d'Or à Lyon Vaise : sandwichs, assiettes, tacos, roulés, burgers halal. Tout est personnalisable. Disponible sur place, à emporter, Deliveroo et Uber Eats.",
  alternates: { canonical: "/menu" },
};

const CATEGORIES = [
  { id: "menu",     label: "Formules" },
  { id: "sandwich", label: "Sandwichs" },
  { id: "assiette", label: "Assiettes" },
  { id: "tacos",    label: "Tacos" },
  { id: "roule",    label: "Roulés" },
  { id: "burger",   label: "Burgers" },
  { id: "enfant",   label: "Enfant" },
  { id: "boisson",  label: "Boissons" },
  { id: "dessert",  label: "Desserts" },
  { id: "sauce",    label: "Sauces" },
] as const;

const TAG_LABELS: Record<string, string> = {
  populaire:  "⭐ Populaire",
  nouveau:    "🆕 Nouveau",
  vegetarien: "🥗 Végétarien",
  epice:      "🌶️ Épicé",
};

export default function MenuPage() {
  const byCategory = Object.fromEntries(
    CATEGORIES.map((cat) => [
      cat.id,
      menuData.filter((item) => item.category === cat.id),
    ])
  );

  const activeCategories = CATEGORIES.filter(
    (cat) => (byCategory[cat.id]?.length ?? 0) > 0
  );

  return (
    <>
      {/* En-tête */}
      <section className="bg-[var(--color-ink)] py-16 px-4 text-center">
        <p className="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-wider mb-3">
          Halal · Personnalisable · Généreux
        </p>
        <h1 className="font-display text-4xl font-bold text-white mb-4">
          Notre Menu
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto mb-6">
          Tout est composable : choisissez votre viande, accompagnement, crudités, sauces et boisson.
          Sur place, à emporter, ou via Deliveroo et Uber Eats.
        </p>
        <a
          href="tel:+33478472426"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[44px]"
          aria-label="Appeler le restaurant au 04 78 47 24 26"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Réserver ou commander — 04 78 47 24 26
        </a>
      </section>

      {/* Nav catégories sticky */}
      <nav
        className="sticky top-16 z-40 bg-white border-b border-[var(--color-border)] overflow-x-auto"
        aria-label="Catégories du menu"
      >
        <div className="flex gap-1 px-4 py-2 min-w-max">
          {activeCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-ink-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)] transition-colors min-h-[40px] flex items-center"
            >
              {cat.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Sections par catégorie */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {activeCategories.map((cat) => {
          const items = byCategory[cat.id] ?? [];
          return (
            <section key={cat.id} id={cat.id} aria-labelledby={`heading-${cat.id}`}>
              <h2
                id={`heading-${cat.id}`}
                className="font-display text-2xl font-bold text-[var(--color-ink)] mb-6 pb-3 border-b border-[var(--color-border)]"
              >
                {cat.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-[var(--color-bg)] text-[var(--color-ink-muted)] rounded-full px-2 py-0.5"
                          >
                            {TAG_LABELS[tag] ?? tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="font-display text-base font-bold text-[var(--color-ink)] mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed flex-1 mb-4">
                      {item.description}
                    </p>

                    {"viandes" in (item.options ?? {}) && (
                      <p className="text-xs text-[var(--color-ink-subtle)] mb-3">
                        Viandes : {(item.options as { viandes?: string[] }).viandes?.join(", ")}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-bold text-[var(--color-primary)] text-lg">
                        {formatPrice(item.basePrice)}
                      </span>
                      {item.halal && (
                        <span className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5 font-medium">
                          ✓ Halal
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Note halal + commande */}
      <div className="bg-[var(--color-bg)] border-t border-[var(--color-border)] py-8 px-4 text-center">
        <p className="text-sm text-[var(--color-ink-muted)] mb-4">
          <strong className="text-[var(--color-ink)]">Viande 100 % Halal.</strong>{" "}
          En cas de doute ou pour passer commande, appelez-nous directement.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:+33478472426"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[44px]"
            aria-label="Appeler le restaurant au 04 78 47 24 26"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            04 78 47 24 26
          </a>
          <a
            href="https://deliveroo.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors min-h-[44px]"
            aria-label="Commander sur Deliveroo — ouvre dans un nouvel onglet"
          >
            Livraison sur Deliveroo
          </a>
          <a
            href="https://www.ubereats.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors min-h-[44px]"
            aria-label="Commander sur Uber Eats — ouvre dans un nouvel onglet"
          >
            Livraison sur Uber Eats
          </a>
        </div>
      </div>
    </>
  );
}
