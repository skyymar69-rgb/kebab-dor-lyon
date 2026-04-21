import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "CGV du Kebab d'Or La Mer Égée — conditions de vente en ligne, délais, annulations, remboursements.",
  robots: { index: false },
};

export default function CgvPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
        Conditions Générales de Vente (CGV)
      </h1>
      <p className="text-sm text-[var(--color-ink-subtle)] mb-10">
        Version en vigueur au 21 avril 2026 — applicables à toute commande passée via le Site
      </p>

      <div className="prose max-w-none space-y-10 text-[var(--color-ink-muted)] text-sm leading-relaxed">

        <section aria-labelledby="cgv-vendeur">
          <h2 id="cgv-vendeur" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 1 — Vendeur
          </h2>
          <p>
            <strong>LAC DE VAN</strong> — SASU au capital de 750 € — 37 rue Marietton, 69009 Lyon<br />
            SIREN : 929 846 244 — SIRET siège : 929 846 244 00010<br />
            RCS : 929 846 244 R.C.S. Lyon — TVA : FR37929846244<br />
            Code NAF : 56.10A — Convention collective : HCR IDCC 1979<br />
            Téléphone : <a href="tel:+33478472426" className="text-[var(--color-primary)] hover:underline">+33 4 78 47 24 26</a><br />
            Email : <a href="mailto:kebabdor@yahoo.fr" className="text-[var(--color-primary)] hover:underline">kebabdor@yahoo.fr</a>
          </p>
        </section>

        <section aria-labelledby="cgv-produits">
          <h2 id="cgv-produits" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 2 — Produits et disponibilité
          </h2>
          <p>
            LAC DE VAN commercialise des produits de restauration rapide halal (kebabs, sandwichs, tacos, roulés, burgers, accompagnements, boissons, desserts) à emporter ou en livraison.
          </p>
          <p className="mt-3">
            Les produits sont proposés dans la limite des stocks disponibles et des horaires d&apos;ouverture du restaurant. En cas d&apos;indisponibilité d&apos;un produit commandé, LAC DE VAN s&apos;engage à contacter l&apos;acheteur par téléphone ou email pour lui proposer un remplacement ou l&apos;annulation de la commande avec remboursement intégral.
          </p>
          <p className="mt-3">
            <strong>Mention halal :</strong> Toutes les viandes utilisées sont certifiées halal. LAC DE VAN s&apos;engage à maintenir cette certification et à en informer les clients en cas de changement.
          </p>
        </section>

        <section aria-labelledby="cgv-prix">
          <h2 id="cgv-prix" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 3 — Prix
          </h2>
          <p>
            Les prix affichés sur le Site sont exprimés en euros, toutes taxes comprises (TTC), incluant la TVA au taux applicable à la restauration à emporter et livraison (<strong>10 %</strong> conformément à l&apos;article 278 bis du Code Général des Impôts).
          </p>
          <p className="mt-3">
            Des frais de livraison s&apos;ajoutent au prix des produits pour les commandes en livraison :
          </p>
          <ul className="mt-2 space-y-1">
            <li>Zone 1 (Vaise, Lyon 9e — moins de 2 km) : <strong>2,50 €</strong></li>
            <li>Zone 2 (Lyon 5e, Caluire sud — moins de 3 km) : <strong>3,50 €</strong></li>
          </ul>
          <p className="mt-3">
            Commande minimum pour la livraison : <strong>15,00 €</strong> (hors frais de livraison).
          </p>
          <p className="mt-3">
            LAC DE VAN se réserve le droit de modifier ses prix à tout moment. Les prix applicables sont ceux en vigueur au moment de la validation définitive de la commande.
          </p>
        </section>

        <section aria-labelledby="cgv-commande">
          <h2 id="cgv-commande" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 4 — Passation et validation de la commande
          </h2>
          <p>
            La commande est passée via le Site en suivant les étapes décrites dans les CGU. La commande ne devient définitive qu&apos;après :
          </p>
          <ul className="mt-2 space-y-1">
            <li>Validation du paiement en ligne par Stripe (confirmation <em>payment_intent.succeeded</em>) ;</li>
            <li>Ou sélection du mode &ldquo;paiement sur place&rdquo; et confirmation de la commande.</li>
          </ul>
          <p className="mt-3">
            Un email de confirmation est envoyé à l&apos;adresse indiquée, contenant le numéro de commande (KDO-XXXX) et le récapitulatif. LAC DE VAN se réserve le droit de refuser toute commande anormale ou frauduleuse.
          </p>
        </section>

        <section aria-labelledby="cgv-paiement">
          <h2 id="cgv-paiement" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 5 — Paiement
          </h2>
          <p><strong>Paiement en ligne :</strong> Carte bancaire (Visa, Mastercard, American Express) via Stripe, Inc. La transaction est sécurisée par chiffrement TLS. Les données de carte ne sont jamais stockées par LAC DE VAN. Stripe est certifié PCI-DSS niveau 1.</p>
          <p className="mt-3"><strong>Paiement sur place :</strong> Espèces ou carte bancaire, à la récupération (click &amp; collect) ou à la livraison. LAC DE VAN se réserve le droit de refuser le paiement sur place en cas d&apos;abus répété.</p>
          <p className="mt-3">En cas d&apos;échec du paiement en ligne, la commande n&apos;est pas validée et aucun prélèvement n&apos;est effectué.</p>
        </section>

        <section aria-labelledby="cgv-livraison">
          <h2 id="cgv-livraison" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 6 — Modes de retrait et délais
          </h2>
          <h3 className="font-semibold text-[var(--color-ink)] mb-2">6.1 Click &amp; Collect</h3>
          <p>
            Retrait au restaurant : 37 rue Marietton, 69009 Lyon. Le délai de préparation estimé est de <strong>15 minutes</strong> après confirmation de la commande, selon l&apos;affluence. Ce délai est indicatif et non contractuel.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)] mb-2 mt-4">6.2 Livraison à domicile</h3>
          <p>
            Livraison dans les zones définies à l&apos;Article 3. Délai estimé : <strong>30 minutes</strong> (indicatif). Ce délai peut varier selon l&apos;affluence, les conditions de circulation et la distance. LAC DE VAN ne saurait être tenu responsable des retards indépendants de sa volonté.
          </p>
          <p className="mt-3">
            L&apos;acheteur doit être joignable et présent à l&apos;adresse de livraison. En cas d&apos;absence, LAC DE VAN contacte l&apos;acheteur par téléphone. Si le produit ne peut être livré (adresse erronée, absence prolongée), il sera ramené au restaurant et aucun remboursement ne sera effectué, sauf accord amiable.
          </p>
        </section>

        <section aria-labelledby="cgv-retractation">
          <h2 id="cgv-retractation" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 7 — Droit de rétractation
          </h2>
          <p>
            Conformément à l&apos;article L.221-28 du Code de la consommation, le <strong>droit de rétractation ne s&apos;applique pas</strong> aux produits de restauration susceptibles de se détériorer ou de se périmer rapidement.
          </p>
          <p className="mt-3">
            Les commandes de produits alimentaires sont donc fermes et définitives dès leur confirmation. Toute annulation après confirmation est soumise à l&apos;appréciation de LAC DE VAN.
          </p>
        </section>

        <section aria-labelledby="cgv-annulation">
          <h2 id="cgv-annulation" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 8 — Annulation et remboursement
          </h2>
          <p>
            L&apos;annulation d&apos;une commande n&apos;est possible que si la préparation n&apos;a pas encore commencé. Contactez-nous immédiatement au <a href="tel:+33478472426" className="text-[var(--color-primary)] hover:underline">+33 4 78 47 24 26</a>.
          </p>
          <p className="mt-3">
            En cas de problème avéré (produit manquant, non-conforme, non livré), un remboursement ou bon de remplacement sera proposé après vérification, dans un délai de 5 à 10 jours ouvrés pour les remboursements par carte.
          </p>
        </section>

        <section aria-labelledby="cgv-garanties">
          <h2 id="cgv-garanties" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 9 — Conformité et allergènes
          </h2>
          <p>
            Nos produits sont conformes à la réglementation en matière d&apos;étiquetage des allergènes (Règlement UE n°1169/2011). La liste des 14 allergènes majeurs est disponible sur demande en restaurant ou par téléphone.
          </p>
          <p className="mt-3">
            En cas de doute sur la composition d&apos;un produit ou d&apos;allergie connue, nous vous recommandons vivement de nous contacter avant de passer commande.
          </p>
        </section>

        <section aria-labelledby="cgv-mediation">
          <h2 id="cgv-mediation" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            Article 10 — Médiation et litiges
          </h2>
          <p>
            En cas de litige, une résolution amiable sera d&apos;abord recherchée. Conformément à l&apos;article L.616-1 du Code de la consommation et à la directive européenne 2013/11/UE, vous pouvez recourir gratuitement à un médiateur de la consommation.
          </p>
          <p className="mt-3">
            Plateforme européenne de règlement en ligne des litiges (RLL) :{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p className="mt-3">
            À défaut de résolution amiable, le litige sera soumis aux tribunaux français compétents (Lyon).
          </p>
        </section>

        <p className="text-xs text-[var(--color-ink-subtle)] pt-6 border-t border-[var(--color-border)]">
          Dernière mise à jour : 21 avril 2026 — LAC DE VAN, 929 846 244 R.C.S. Lyon
        </p>
      </div>
    </main>
  );
}
