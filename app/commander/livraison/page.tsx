import type { Metadata } from "next";
import { LivraisonClient } from "@/components/commerce/LivraisonClient";

export const metadata: Metadata = {
  title: "Livraison",
  robots: { index: false },
};

export default function LivraisonPage() {
  return <LivraisonClient />;
}
