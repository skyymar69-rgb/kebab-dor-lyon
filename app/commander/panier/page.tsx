import type { Metadata } from "next";
import { PanierClient } from "@/components/commerce/PanierClient";

export const metadata: Metadata = {
  title: "Mon panier",
  robots: { index: false },
};

export default function PanierPage() {
  return <PanierClient />;
}
