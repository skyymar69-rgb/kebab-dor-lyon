import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "CGU du site Kebab d'Or La Mer Égée — conditions d'utilisation du service de commande en ligne.",
  robots: { index: false },
};

export default function CguPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
        Conditions Générales d&apos;Utilisation (CGU)
      </h1>
      <p className="text-sm text-[var(--color-ink-subtle)] mb-10">
        Version en vigueur au 21 avril 2026
      </p>

      <div className="prose max-w-none space-y-10 text-[var(--color-ink-muted)] text-sm leading-relaxed">

        <section aria-labelledby="cgu-objet">
          <h2 id="cgu-objet" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 1 — Objet et champ d&apos;application
          </h2>
          <p>
            Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et l&apos;utilisation du site internet <strong>kebabdor-lyon.fr</strong> (ci-après &ldquo;le Site&rdquo;), édité par LAC DE VAN, SASU au capital de 750 €, immatriculée au RCS de Lyon sous le numéro 929 846 244, dont le siège social est sis 37 rue Marietton, 69009 Lyon.
          </p>
          <p className="mt-3">
            Le Site propose un service de présentation et de commande en ligne de produits de restauration rapide (kebab, sandwichs, tacos, boissons et desserts halal). L&apos;utilisation du Site implique l&apos;acceptation entière et sans réserve des présentes CGU.
          </p>
        </section>

        <section aria-labelledby="cgu-acces">
          <h2 id="cgu-acces" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 2 — Accès au Site
          </h2>
          <p>
            L&apos;accès au Site est libre et gratuit. Il nécessite une connexion internet dont l&apos;utilisateur supporte les coûts. LAC DE VAN se réserve le droit d&apos;interrompre, de suspendre ou de modifier sans préavis l&apos;accès au Site pour maintenance, mise à jour ou toute autre raison légitime.
          </p>
          <p className="mt-3">
            L&apos;utilisation du service de commande en ligne est réservée aux personnes physiques majeures (18 ans ou plus) ayant la capacité juridique de contracter. Les commandes passées par des mineurs sous la responsabilité de leurs parents/tuteurs légaux sont acceptées avec l&apos;accord de ces derniers.
          </p>
        </section>

        <section aria-labelledby="cgu-service">
          <h2 id="cgu-service" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 3 — Description du service
          </h2>
          <p>Le Site permet :</p>
          <ul className="mt-2 space-y-1">
            <li>La consultation du menu et des prix en vigueur ;</li>
            <li>La personnalisation et la commande de produits (viande, accompagnements, sauces, boissons) ;</li>
            <li>Le choix du mode de retrait : click &amp; collect (retrait au restaurant) ou livraison à domicile ;</li>
            <li>Le paiement en ligne par carte bancaire (via Stripe) ou sur place/à la livraison ;</li>
            <li>La réception d&apos;une confirmation de commande par email.</li>
          </ul>
          <p className="mt-3">
            Les produits sont disponibles dans la limite des stocks et des horaires d&apos;ouverture du restaurant. LAC DE VAN se réserve le droit de modifier à tout moment la carte, les prix et les zones de livraison sans préavis, sauf pour les commandes déjà confirmées.
          </p>
        </section>

        <section aria-labelledby="cgu-commande">
          <h2 id="cgu-commande" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 4 — Processus de commande
          </h2>
          <p>La commande s&apos;effectue en plusieurs étapes :</p>
          <ol className="mt-2 space-y-1 list-decimal list-inside">
            <li>Sélection des produits et personnalisation ;</li>
            <li>Vérification du panier ;</li>
            <li>Choix du mode de retrait et saisie des coordonnées ;</li>
            <li>Sélection du mode de paiement ;</li>
            <li>Acceptation des CGV et confirmation de la commande.</li>
          </ol>
          <p className="mt-3">
            La commande devient définitive et engage l&apos;utilisateur dès la validation de l&apos;étape de paiement (ou confirmation &ldquo;paiement sur place&rdquo;). Une confirmation est envoyée par email avec un numéro de commande (KDO-XXXX).
          </p>
        </section>

        <section aria-labelledby="cgu-responsabilite">
          <h2 id="cgu-responsabilite" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 5 — Responsabilité
          </h2>
          <p>
            LAC DE VAN met tout en œuvre pour assurer la disponibilité du Site et la fiabilité des informations. Cependant, LAC DE VAN ne saurait être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le Site, notamment en cas de panne, d&apos;attaque informatique ou de force majeure.
          </p>
          <p className="mt-3">
            L&apos;utilisateur est responsable de la sécurité de ses accès et de l&apos;exactitude des informations qu&apos;il saisit lors de la commande (adresse de livraison, coordonnées).
          </p>
        </section>

        <section aria-labelledby="cgu-propriete">
          <h2 id="cgu-propriete" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 6 — Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble des éléments composant le Site (design, textes, images, logos) est protégé par les droits de propriété intellectuelle au bénéfice de LAC DE VAN ou de ses partenaires. Toute reproduction ou utilisation sans autorisation écrite préalable est interdite.
          </p>
        </section>

        <section aria-labelledby="cgu-donnees">
          <h2 id="cgu-donnees" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 7 — Données personnelles
          </h2>
          <p>
            Le traitement des données personnelles est régi par notre{" "}
            <a href="/confidentialite" className="text-[var(--color-primary)] underline hover:no-underline">
              Politique de confidentialité
            </a>
            , conformément au RGPD.
          </p>
        </section>

        <section aria-labelledby="cgu-loi">
          <h2 id="cgu-loi" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 8 — Droit applicable et litiges
          </h2>
          <p>
            Les présentes CGU sont soumises au droit français. En cas de litige, une solution amiable sera recherchée préalablement à tout recours judiciaire. À défaut, le litige sera soumis aux tribunaux compétents de Lyon.
          </p>
          <p className="mt-3">
            Conformément à l&apos;article L.616-1 du Code de la consommation, vous pouvez recourir gratuitement au médiateur de la consommation compétent pour le secteur de la restauration. Coordonnées disponibles sur simple demande.
          </p>
        </section>

        <section aria-labelledby="cgu-modification">
          <h2 id="cgu-modification" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 9 — Modification des CGU
          </h2>
          <p>
            LAC DE VAN se réserve le droit de modifier les présentes CGU à tout moment. Les nouvelles CGU entrent en vigueur dès leur publication sur le Site. L&apos;utilisation du Site après modification vaut acceptation des nouvelles CGU.
          </p>
        </section>

        <p className="text-xs text-[var(--color-ink-subtle)] pt-6 border-t border-[var(--color-border)]">
          Dernière mise à jour : 21 avril 2026 — LAC DE VAN, SIEU 929 846 244 R.C.S. Lyon
        </p>
      </div>
    </main>
  );
}
