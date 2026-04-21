import Link from "next/link";
import { ShoppingBag, ChevronRight } from "lucide-react";

export default function CommanderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)] shadow-sm" role="banner">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display text-lg font-bold text-[var(--color-primary)]"
            aria-label="Kebab d'Or — retour à l'accueil"
          >
            Kebab d&apos;Or
          </Link>

          <nav aria-label="Étapes de commande" className="hidden sm:flex items-center gap-1 text-xs font-medium text-[var(--color-ink-subtle)]">
            {[
              { href: "/commander", label: "Catalogue" },
              { href: "/commander/panier", label: "Panier" },
              { href: "/commander/livraison", label: "Livraison" },
              { href: "/commander/paiement", label: "Paiement" },
            ].map((step, i, arr) => (
              <span key={step.href} className="flex items-center gap-1">
                <Link href={step.href} className="hover:text-[var(--color-primary)] transition-colors">
                  {step.label}
                </Link>
                {i < arr.length - 1 && (
                  <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
                )}
              </span>
            ))}
          </nav>

          <Link
            href="/commander/panier"
            className="flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]"
            aria-label="Voir mon panier"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="hidden sm:inline">Mon panier</span>
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 bg-[var(--color-bg)]">
        {children}
      </main>
    </>
  );
}
