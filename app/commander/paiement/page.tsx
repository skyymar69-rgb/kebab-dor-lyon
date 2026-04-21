import type { Metadata } from "next";
import { PaiementClient } from "@/components/commerce/PaiementClient";

export const metadata: Metadata = {
  title: "Paiement",
  robots: { index: false },
};

export default function PaiementPage() {
  return <PaiementClient />;
}
