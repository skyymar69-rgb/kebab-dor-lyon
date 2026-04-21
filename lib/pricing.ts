export const VAT_RATE = 0.1; // TVA 10% restauration à emporter

export function computeVat(subtotal: number): number {
  return Math.round(subtotal * VAT_RATE * 100) / 100;
}

export function computeTotal(subtotal: number, deliveryFee: number): number {
  return Math.round((subtotal + deliveryFee) * 100) / 100;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function centsToEuros(cents: number): number {
  return Math.round(cents) / 100;
}

export function eurosToCents(euros: number): number {
  return Math.round(euros * 100);
}
