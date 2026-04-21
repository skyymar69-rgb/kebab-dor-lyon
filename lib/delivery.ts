import deliveryZones from "@/data/delivery-zones.json";

export type DeliveryZone = (typeof deliveryZones.zones)[number];

export interface AddressCheckResult {
  eligible: boolean;
  zone: DeliveryZone | null;
  message: string;
}

export function checkDeliveryEligibility(postalCode: string): AddressCheckResult {
  const clean = postalCode.trim().replace(/\s/g, "");

  for (const zone of deliveryZones.zones) {
    if (zone.postalCodes.includes(clean)) {
      return {
        eligible: true,
        zone,
        message: `Livraison disponible — ${zone.label}`,
      };
    }
  }

  return {
    eligible: false,
    zone: null,
    message: deliveryZones.outsideZoneMessage,
  };
}

export function getDeliveryFee(postalCode: string): number {
  const result = checkDeliveryEligibility(postalCode);
  return result.zone?.deliveryFeeEur ?? 0;
}

export function getMinOrder(postalCode: string): number {
  const result = checkDeliveryEligibility(postalCode);
  return result.zone?.minOrderEur ?? 15;
}
