import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Kebab d'Or La Mer Égée — informations légales, éditeur, hébergeur.",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-3xl font-bold text-[var(--color-ink)] mb-2">
        Mentions légales
      </h1>
      <p className="text-sm text-[var(--color-ink-subtle)] mb-10">
        Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l&apos;économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site les présentes mentions légales.
      </p>

      <div className="prose max-w-none space-y-10 text-[var(--color-ink-muted)]">

        {/* 1. Éditeur */}
        <section aria-labelledby="editeur">
          <h2 id="editeur" className="font-display text-xl font-bold text-[var(--color-ink)] mb-4">
            1. Éditeur du site
          </h2>
          <p>Le site internet accessible à l&apos;adresse <strong>kebabdor-lyon.fr</strong> est édité par :</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Raison sociale</dt>
              <dd>LAC DE VAN</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Forme juridique</dt>
              <dd>SASU (Société par Actions Simplifiée Unipersonnelle)</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Capital social</dt>
              <dd>750,00 €</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">SIREN</dt>
              <dd>929 846 244</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">SIRET (siège)</dt>
              <dd>929 846 244 00010</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">RCS</dt>
              <dd>929 846 244 R.C.S. Lyon</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">N° TVA intracommunautaire</dt>
              <dd>FR37929846244</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Code NAF / APE</dt>
              <dd>56.10A — Restauration traditionnelle</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Siège social</dt>
              <dd>37 RUE MARIETTON, 69009 LYON</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Dirigeant</dt>
              <dd>Temizer Helin, Président(e)</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Téléphone</dt>
              <dd>
                <a href="tel:+33478472426" className="text-[var(--color-primary)] hover:underline">
                  +33 4 78 47 24 26
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Email</dt>
              <dd>
                <a href="mailto:kebabdor@yahoo.fr" className="text-[var(--color-primary)] hover:underline">
                  kebabdor@yahoo.fr
                </a>
              </dd>
            </div>
          </dl>
        </section>

        {/* 2. Directeur de publication */}
        <section aria-labelledby="directeur">
          <h2 id="directeur" className="font-display text-xl font-bold text-[var(--color-ink)] mb-4">
            2. Directeur de la publication
          </h2>
          <p>Le directeur de la publication est <strong>Temizer Helin</strong>, en sa qualité de Président(e) de la société LAC DE VAN.</p>
        </section>

        {/* 3. Conception & réalisation */}
        <section aria-labelledby="conception">
          <h2 id="conception" className="font-display text-xl font-bold text-[var(--color-ink)] mb-4">
            3. Conception et réalisation du site
          </h2>
          <p>Ce site a été conçu et réalisé par :</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Raison sociale</dt>
              <dd>KAYZEN LYON</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Forme juridique</dt>
              <dd>SASU</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">SIREN</dt>
              <dd>999 418 346</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">SIRET</dt>
              <dd>999 418 346 000 14</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">RCS</dt>
              <dd>Lyon — 999 418 346</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">N° TVA intracommunautaire</dt>
              <dd>FR85 999 418 346</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Code APE</dt>
              <dd>4791B</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Siège social</dt>
              <dd>6, rue Pierre TERMIER, 69009 LYON</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Téléphone</dt>
              <dd>+33 (0)4 87 77 68 61</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Email</dt>
              <dd>
                <a href="mailto:contact@kayzen-lyon.fr" className="text-[var(--color-primary)] hover:underline">
                  contact@kayzen-lyon.fr
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Site web</dt>
              <dd>
                <a
                  href="https://internet.kayzen-lyon.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  https://internet.kayzen-lyon.fr
                </a>
              </dd>
            </div>
          </dl>
        </section>

        {/* 4. Hébergement */}
        <section aria-labelledby="hebergement">
          <h2 id="hebergement" className="font-display text-xl font-bold text-[var(--color-ink)] mb-4">
            4. Hébergement
          </h2>
          <p>Ce site est hébergé par :</p>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Société</dt>
              <dd>Vercel Inc.</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Adresse</dt>
              <dd>340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</dd>
            </div>
            <div className="grid grid-cols-[180px_1fr]">
              <dt className="font-semibold">Site web</dt>
              <dd>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">
                  vercel.com
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-sm">
            Vercel Inc. est certifié conforme au RGPD et au cadre EU-US Data Privacy Framework. Les données sont traitées dans des datacenters situés dans l&apos;Union Européenne dans la mesure du possible.
          </p>
        </section>

        {/* 5. Propriété intellectuelle */}
        <section aria-labelledby="propriete">
          <h2 id="propriete" className="font-display text-xl font-bold text-[var(--color-ink)] mb-4">
            5. Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, graphismes, logos, icônes, images, clips audio et vidéo, compilations de données et logiciels) est la propriété exclusive de LAC DE VAN ou de ses fournisseurs de contenu et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
          </p>
          <p className="mt-3">
            Toute reproduction totale ou partielle de ce site et de son contenu, par quelque procédé que ce soit, sans autorisation préalable et écrite de LAC DE VAN est interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
          </p>
          <p className="mt-3">
            Les photos utilisées sur ce site proviennent de banques d&apos;images sous licence (Unsplash, Pexels). Les crédits photographiques sont disponibles sur demande.
          </p>
        </section>

        {/* 6. Données personnelles */}
        <section aria-labelledby="donnees">
          <h2 id="donnees" className="font-display text-xl font-bold text-[var(--color-ink)] mb-4">
            6. Données personnelles
          </h2>
          <p>
            Les informations concernant la collecte et le traitement de vos données personnelles sont détaillées dans notre{" "}
            <a href="/confidentialite" className="text-[var(--color-primary)] underline hover:no-underline">
              Politique de confidentialité
            </a>
            .
          </p>
          <p className="mt-3">
            Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de portabilité de vos données, ainsi que d&apos;un droit d&apos;opposition et de limitation du traitement.
          </p>
          <p className="mt-3">
            Pour exercer ces droits, contactez : <a href="mailto:kebabdor@yahoo.fr" className="text-[var(--color-primary)] hover:underline">kebabdor@yahoo.fr</a>
          </p>
        </section>

        {/* 7. Cookies */}
        <section aria-labelledby="cookies">
          <h2 id="cookies" className="font-display text-xl font-bold text-[var(--color-ink)] mb-4">
            7. Cookies
          </h2>
          <p>
            Ce site utilise des cookies strictement nécessaires à son fonctionnement (session, panier). Aucun cookie de traçage publicitaire n&apos;est déposé sans votre consentement. Pour en savoir plus, consultez notre{" "}
            <a href="/confidentialite" className="text-[var(--color-primary)] underline hover:no-underline">
              Politique de confidentialité
            </a>
            .
          </p>
        </section>

        {/* 8. Accessibilité */}
        <section aria-labelledby="accessibilite">
          <h2 id="accessibilite" className="font-display text-xl font-bold text-[var(--color-ink)] mb-4">
            8. Accessibilité numérique
          </h2>
          <p>
            Ce site vise la conformité au Référentiel Général d&apos;Amélioration de l&apos;Accessibilité (RGAA 4.1) et aux normes WCAG 2.1 niveau AA, conformément à la directive européenne 2016/2102 et à l&apos;European Accessibility Act (EAA — directive 2019/882, transposée en droit français par la loi du 9 mai 2023).
          </p>
          <p className="mt-3">
            Si vous rencontrez un problème d&apos;accessibilité, merci de nous le signaler à{" "}
            <a href="mailto:contact@kayzen-lyon.fr" className="text-[var(--color-primary)] hover:underline">
              contact@kayzen-lyon.fr
            </a>{" "}
            ou au <a href="tel:+33487776861" className="text-[var(--color-primary)] hover:underline">+33 (0)4 87 77 68 61</a>.
            Nous nous engageons à traiter toute demande dans un délai de 2 jours ouvrés.
          </p>
          <p className="mt-3">
            En cas de non-réponse satisfaisante, vous pouvez saisir le{" "}
            <a href="https://www.defenseurdesdroits.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">
              Défenseur des droits
            </a>.
          </p>
        </section>

        {/* 9. Responsabilité */}
        <section aria-labelledby="responsabilite">
          <h2 id="responsabilite" className="font-display text-xl font-bold text-[var(--color-ink)] mb-4">
            9. Limitation de responsabilité
          </h2>
          <p>
            LAC DE VAN met tout en œuvre pour fournir des informations fiables sur ce site. Toutefois, des erreurs ou omissions peuvent survenir. Les prix et disponibilités des produits sont susceptibles d&apos;évoluer. LAC DE VAN ne saurait être tenu responsable de tout dommage direct ou indirect résultant de l&apos;utilisation de ce site.
          </p>
        </section>

        {/* 10. Droit applicable */}
        <section aria-labelledby="droit">
          <h2 id="droit" className="font-display text-xl font-bold text-[var(--color-ink)] mb-4">
            10. Droit applicable et juridiction compétente
          </h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents. Le tribunal compétent sera celui de Lyon.
          </p>
        </section>

        <p className="text-xs text-[var(--color-ink-subtle)] pt-6 border-t border-[var(--color-border)]">
          Dernière mise à jour : 21 avril 2026
        </p>
      </div>
    </main>
  );
}
