"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ShoppingBag, AlertCircle } from "lucide-react";
import { ProductConfigDialog } from "./ProductConfigDialog";
import { formatPrice } from "@/lib/pricing";
import { getTodayStatus } from "@/lib/opening-hours";

interface MenuItemRaw {
  id: string;
  category: string;
  name: string;
  description: string;
  basePrice: number;
  image?: string;
  halal: boolean;
  options?: Record<string, unknown>;
  tags?: string[];
  available: boolean;
}

interface Props {
  menu: MenuItemRaw[];
  highlightItemId?: string;
}

const CATEGORIES = [
  { id: "all", label: "Tout" },
  { id: "menu", label: "Formules" },
  { id: "sandwich", label: "Sandwichs" },
  { id: "assiette", label: "Assiettes" },
  { id: "tacos", label: "Tacos" },
  { id: "roule", label: "Roulés" },
  { id: "burger", label: "Burgers" },
  { id: "enfant", label: "Enfant" },
  { id: "boisson", label: "Boissons" },
  { id: "dessert", label: "Desserts" },
] as const;

const TAG_FILTER = [
  { id: "populaire", label: "⭐ Populaire" },
  { id: "epice", label: "🌶️ Épicé" },
  { id: "vegetarien", label: "🥗 Végétarien" },
] as const;

export function CommanderCatalog({ menu, highlightItemId }: Props) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItemRaw | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (highlightItemId) {
      const item = menu.find((m) => m.id === highlightItemId);
      if (item && item.available) {
        setSelectedItem(item);
        setIsOpen(true);
      }
    }
  }, [highlightItemId, menu]);

  const todayStatus = getTodayStatus();

  const filtered = menu.filter((item) => {
    if (!item.available) return false;
    if (category !== "all" && item.category !== category) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (tagFilter && !item.tags?.includes(tagFilter)) return false;
    return true;
  });

  return (
    <>
      {/* Closed banner */}
      {!todayStatus.isOpen && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 flex items-center gap-2 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            <strong>Restaurant fermé</strong> — {todayStatus.todayLabel}.{" "}
            {todayStatus.nextOpenLabel && <span>{todayStatus.nextOpenLabel}.</span>}{" "}
            Vous pouvez préparer votre commande pour plus tard.
          </span>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
            Commander en ligne
          </h1>
          <p className="text-sm text-[var(--color-ink-muted)]">
            Composez votre repas — tout est personnalisable. Livraison ou click &amp; collect.
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-ink-subtle)]"
              aria-hidden="true"
            />
            <label htmlFor="search-menu" className="sr-only">Rechercher dans le menu</label>
            <input
              id="search-menu"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-white pl-9 pr-3 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 min-h-[44px]"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {TAG_FILTER.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTagFilter(tagFilter === t.id ? null : t.id)}
                aria-pressed={tagFilter === t.id}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors min-h-[44px] ${
                  tagFilter === t.id
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white border border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              >
                <Filter className="h-3 w-3 inline mr-1" aria-hidden="true" />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-none"
          role="tablist"
          aria-label="Catégories du menu"
        >
          {CATEGORIES.map((cat) => {
            const count = cat.id === "all"
              ? menu.filter((m) => m.available).length
              : menu.filter((m) => m.category === cat.id && m.available).length;
            if (count === 0 && cat.id !== "all") return null;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={category === cat.id}
                onClick={() => setCategory(cat.id)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors min-h-[40px] ${
                  category === cat.id
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white border border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              >
                {cat.label}
                <span className="ml-1.5 text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[var(--color-ink-muted)]">
            <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30" aria-hidden="true" />
            <p className="font-medium">Aucun produit trouvé</p>
            <p className="text-sm mt-1">Essayez de modifier vos filtres</p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            role="list"
            aria-label="Produits disponibles"
          >
            {filtered.map((item) => (
              <article
                key={item.id}
                role="listitem"
                className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-1 mb-2 flex-wrap">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-[var(--color-bg)] text-[var(--color-ink-muted)] rounded-full px-2 py-0.5">
                        {tag === "populaire" ? "⭐ Populaire" : tag === "epice" ? "🌶️ Épicé" : tag === "vegetarien" ? "🥗 Végétarien" : tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="font-display text-base font-bold text-[var(--color-ink)] mb-1">
                  {item.name}
                </h2>
                <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed flex-1 mb-4">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-[var(--color-primary)] text-lg">
                    {formatPrice(item.basePrice)}
                  </span>
                  {item.halal && (
                    <span className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5 font-medium">
                      ✓ Halal
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => { setSelectedItem(item); setIsOpen(true); }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[44px] w-full"
                  aria-label={`Configurer et ajouter au panier : ${item.name} — ${formatPrice(item.basePrice)}`}
                >
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  Ajouter au panier
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <ProductConfigDialog
          item={selectedItem}
          open={isOpen}
          onClose={() => { setIsOpen(false); setSelectedItem(null); }}
        />
      )}
    </>
  );
}
