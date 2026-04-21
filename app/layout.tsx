import type { Metadata } from "next";
import { inter, fraunces } from "@/lib/fonts";
import { CookieBanner } from "@/components/marketing/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kebab d'Or – La Mer Égée | Commandez en ligne | Lyon Vaise",
    template: "%s | Kebab d'Or Lyon Vaise",
  },
  description:
    "Kebab halal à Lyon Vaise (9e) — viande grillée, portions généreuses, personnalisation totale. Commandez en click & collect ou livraison sur 37 rue Marietton. Pas de commission Deliveroo.",
  keywords: [
    "kebab Lyon 9",
    "kebab halal Vaise",
    "kebab Marietton",
    "commander kebab Lyon livraison",
    "kebab ouvert tard Lyon",
    "restaurant turc Lyon Vaise",
    "kebab halal Lyon",
    "grillades méditerranéennes Lyon",
  ],
  authors: [{ name: "Kebab d'Or – La Mer Égée" }],
  creator: "Kayzen Web",
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_APP_URL"] ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    siteName: "Kebab d'Or – La Mer Égée",
    title: "Kebab d'Or – La Mer Égée | Kebab halal Lyon Vaise",
    description:
      "Le goût du vrai kebab halal à Vaise. Commandez en ligne, click & collect ou livraison. 37 rue Marietton, Lyon 9e.",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kebab d'Or – La Mer Égée | Lyon Vaise",
    description: "Kebab halal, portions généreuses, commande en ligne. Lyon Vaise.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
