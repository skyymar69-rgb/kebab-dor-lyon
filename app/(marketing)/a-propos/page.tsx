import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "L'histoire du Kebab d'Or La Mer Égée à Lyon Vaise. Engagements halal, viande sélectionnée, cuisine méditerranéenne authentique.",
  alternates: { canonical: "/a-propos" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--color-ink)] py-16 px-4 text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-4">
          À propos
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Un kebab, c&apos;est simple. Mais bien fait, avec de la viande de qualité et des portions honnêtes, ça change tout.
        </p>
      </section>

      <main id="main-content" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-4">
            Notre histoire
          </h2>
          <p className="text-[var(--color-ink-muted)] leading-relaxed mb-6">
            Le Kebab d&apos;Or – La Mer Égée est né en 2024 au cœur de Vaise, dans le 9e arrondissement de Lyon. L&apos;ambition était simple : proposer un vrai kebab, préparé avec soin, dans un quartier qui mérite mieux que la fast-food industrielle.
          </p>
          <p className="text-[var(--color-ink-muted)] leading-relaxed mb-10">
            Le nom La Mer Égée rappelle les origines méditerranéennes et turques de la cuisine que nous portons — une cuisine de partage, généreuse, épicée juste ce qu&apos;il faut. Les clients de Vaise, du métro Valmy et au-delà ont rapidement adopté l&apos;endroit. Plus de 500 avis et une note de 4,5/5 plus tard, on continue de faire la même chose : un bon kebab, c&apos;est tout.
          </p>

          <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-4">
            Notre engagement halal
          </h2>
          <p className="text-[var(--color-ink-muted)] leading-relaxed mb-6">
            Toutes nos viandes sont certifiées halal — veau, agneau, poulet. Pas de compromis, pas d&apos;ambiguïté. C&apos;est une exigence que nous imposons à nos fournisseurs depuis le premier jour.
          </p>

          <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-6">
            Nos valeurs
          </h2>
          <ul className="space-y-3 mb-10">
            {[
              "Qualité des matières premières — on ne fait pas de compromis sur la viande",
              "Portions généreuses — un client qui repart rassasié est un client qui revient",
              "Personnalisation totale — vous êtes le chef de votre assiette",
              "Prix justes — on ne se cache pas derrière des commissions plateforme",
              "Accueil chaleureux — on connaît nos clients, on aime notre quartier",
            ].map((value) => (
              <li key={value} className="flex items-start gap-3 text-[var(--color-ink-muted)]">
                <CheckCircle
                  className="h-5 w-5 text-green-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{value}</span>
              </li>
            ))}
          </ul>

          <div className="bg-[var(--color-bg)] rounded-2xl border border-[var(--color-border)] p-6 text-center">
            <p className="font-display text-xl font-bold text-[var(--color-ink)] mb-2">
              Venez nous voir — ou commandez en ligne
            </p>
            <p className="text-[var(--color-ink-muted)] text-sm mb-4">
              37 rue Marietton, Lyon 9e (Vaise) · Métro Valmy (ligne D)
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/commander"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[44px]"
              >
                Commander en ligne
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--color-primary)] px-6 py-3 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors min-h-[44px]"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
