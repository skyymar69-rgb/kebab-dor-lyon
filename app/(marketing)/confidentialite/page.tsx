import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et RGPD du Kebab d'Or La Mer Égée — collecte, traitement et protection de vos données personnelles.",
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
        Politique de confidentialité
      </h1>
      <p className="text-sm text-[var(--color-ink-subtle)] mb-10">
        Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée.
      </p>

      <div className="prose max-w-none space-y-10 text-[var(--color-ink-muted)] text-sm leading-relaxed">

        <section aria-labelledby="responsable">
          <h2 id="responsable" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            1. Responsable du traitement
          </h2>
          <p>
            Le responsable du traitement des données à caractère personnel collectées sur ce site est :<br />
            <strong>LAC DE VAN</strong> — SASU au capital de 750 € — 37 rue Marietton, 69009 Lyon<br />
            SIREN : 929 846 244 — TVA : FR37929846244<br />
            Dirigeant : Temizer Helin<br />
            Email : <a href="mailto:kebabdor@yahoo.fr" className="text-[var(--color-primary)] hover:underline">kebabdor@yahoo.fr</a>
          </p>
        </section>

        <section aria-labelledby="donnees-collectees">
          <h2 id="donnees-collectees" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            2. Données collectées et finalités
          </h2>
          <table className="w-full border border-[var(--color-border)] rounded-lg overflow-hidden text-xs">
            <thead className="bg-[var(--color-bg)]">
              <tr>
                <th className="p-3 text-left font-semibold border-b border-[var(--color-border)]">Finalité</th>
                <th className="p-3 text-left font-semibold border-b border-[var(--color-border)]">Données collectées</th>
                <th className="p-3 text-left font-semibold border-b border-[var(--color-border)]">Base légale</th>
                <th className="p-3 text-left font-semibold border-b border-[var(--color-border)]">Durée</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Traitement des commandes", "Nom, prénom, email, téléphone, adresse de livraison, détail des articles commandés", "Exécution du contrat (art. 6.1.b RGPD)", "3 ans après la commande"],
                ["Paiement en ligne", "Données de carte transmises à Stripe (non stockées par LAC DE VAN)", "Exécution du contrat", "Selon la politique Stripe"],
                ["Envoi de confirmation de commande", "Email, détail de la commande", "Exécution du contrat", "3 ans"],
                ["Formulaire de contact", "Nom, email, message", "Consentement (art. 6.1.a RGPD)", "3 ans"],
                ["Cookies fonctionnels", "Panier (localStorage), session", "Intérêt légitime / nécessité technique", "Session ou 30 jours"],
                ["Cookies analytiques (si activés)", "Pages vues, durée de session (anonymisés — Vercel Analytics)", "Consentement", "13 mois"],
                ["Obligations comptables et légales", "Données de facturation", "Obligation légale (art. 6.1.c RGPD)", "10 ans (Code de Commerce)"],
              ].map(([fin, data, base, duree]) => (
                <tr key={fin} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="p-3 font-medium">{fin}</td>
                  <td className="p-3">{data}</td>
                  <td className="p-3">{base}</td>
                  <td className="p-3">{duree}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section aria-labelledby="destinataires">
          <h2 id="destinataires" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            3. Destinataires des données
          </h2>
          <p>Vos données sont transmises uniquement aux sous-traitants suivants, dans le cadre strict de leur mission :</p>
          <ul className="mt-3 space-y-2">
            <li><strong>Stripe Inc.</strong> — Prestataire de paiement. Traitement dans l&apos;UE. Certifié PCI-DSS. <a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">Politique de confidentialité Stripe</a>.</li>
            <li><strong>Resend Inc.</strong> — Plateforme d&apos;envoi d&apos;emails transactionnels. Vos données ne sont pas revendues. <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">Politique Resend</a>.</li>
            <li><strong>Vercel Inc.</strong> — Hébergement. Infrastructure UE disponible. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">Politique Vercel</a>.</li>
          </ul>
          <p className="mt-3">Aucune donnée n&apos;est vendue, louée ou cédée à des fins commerciales. Aucun transfert hors UE sans garanties appropriées (clauses contractuelles types ou certification EU-US DPF).</p>
        </section>

        <section aria-labelledby="cookies">
          <h2 id="cookies" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            4. Cookies
          </h2>
          <h3 className="font-semibold text-[var(--color-ink)] mb-2">4.1 Cookies strictement nécessaires</h3>
          <p>Ces cookies sont indispensables au fonctionnement du site (panier, session, CSRF). Ils ne peuvent pas être désactivés.</p>
          <ul className="mt-2 space-y-1">
            <li><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">kebab-dor-cart</code> — localStorage — Panier de commande — 30 jours</li>
            <li><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">kebab-dor-consent</code> — localStorage — Préférences cookies — 13 mois</li>
            <li><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">next-auth.session-token</code> — httpOnly cookie — Session admin — Session</li>
          </ul>

          <h3 className="font-semibold text-[var(--color-ink)] mb-2 mt-4">4.2 Cookies analytiques (avec consentement)</h3>
          <p>Vercel Analytics utilise des mesures agrégées et anonymisées. Aucun suivi individuel sans consentement explicite.</p>

          <h3 className="font-semibold text-[var(--color-ink)] mb-2 mt-4">4.3 Gestion du consentement</h3>
          <p>Lors de votre première visite, un bandeau vous propose d&apos;accepter ou de refuser les cookies non essentiels. Vous pouvez modifier votre choix à tout moment via le lien &ldquo;Gérer les cookies&rdquo; en bas de page.</p>
        </section>

        <section aria-labelledby="droits">
          <h2 id="droits" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            5. Vos droits
          </h2>
          <p>Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants :</p>
          <ul className="mt-3 space-y-1">
            <li><strong>Droit d&apos;accès</strong> (art. 15) — Obtenir une copie de vos données</li>
            <li><strong>Droit de rectification</strong> (art. 16) — Corriger des données inexactes</li>
            <li><strong>Droit à l&apos;effacement</strong> (art. 17) — &ldquo;Droit à l&apos;oubli&rdquo;</li>
            <li><strong>Droit à la limitation</strong> (art. 18) — Suspendre le traitement</li>
            <li><strong>Droit à la portabilité</strong> (art. 20) — Recevoir vos données dans un format structuré</li>
            <li><strong>Droit d&apos;opposition</strong> (art. 21) — S&apos;opposer au traitement pour intérêt légitime</li>
            <li><strong>Droit de retirer le consentement</strong> à tout moment</li>
          </ul>
          <p className="mt-3">
            Pour exercer ces droits : <a href="mailto:kebabdor@yahoo.fr" className="text-[var(--color-primary)] hover:underline">kebabdor@yahoo.fr</a> ou par courrier à : LAC DE VAN, 37 rue Marietton, 69009 Lyon.<br />
            Réponse sous 30 jours. Vous pouvez également saisir la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">CNIL</a> si vous estimez que vos droits ne sont pas respectés.
          </p>
        </section>

        <section aria-labelledby="securite">
          <h2 id="securite" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            6. Sécurité
          </h2>
          <p>
            Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement HTTPS (TLS 1.3), hachage des tokens, accès restreint aux données, validation de toutes les entrées côté serveur. Les données de carte bancaire ne transitent jamais par nos serveurs — elles sont traitées directement par Stripe (PCI-DSS Level 1).
          </p>
        </section>

        <section aria-labelledby="mineurs">
          <h2 id="mineurs" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            7. Mineurs
          </h2>
          <p>
            Ce site n&apos;est pas destiné aux personnes de moins de 16 ans. Nous ne collectons pas sciemment de données relatives aux mineurs. Si vous êtes parent ou tuteur et pensez que votre enfant nous a transmis des données, contactez-nous immédiatement.
          </p>
        </section>

        <section aria-labelledby="modifications">
          <h2 id="modifications" className="font-display text-xl font-bold text-[var(--color-ink)] mb-3">
            8. Modifications
          </h2>
          <p>
            Nous nous réservons le droit de modifier cette politique à tout moment. Toute modification substantielle sera notifiée par un avis visible sur le site. La date de dernière mise à jour figure ci-dessous.
          </p>
        </section>

        <p className="text-xs text-[var(--color-ink-subtle)] pt-6 border-t border-[var(--color-border)]">
          Dernière mise à jour : 21 avril 2026
        </p>
      </div>
    </main>
  );
}
