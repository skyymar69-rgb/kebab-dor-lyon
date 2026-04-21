import restaurantData from "@/data/restaurant.json";

export interface OpeningHourSlot {
  dayOfWeek: number;
  closed: boolean;
  openTime: string | null;
  closeTime: string | null;
}

const DAYS_FR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export function getTodayStatus(): {
  isOpen: boolean;
  todayLabel: string;
  nextOpenLabel: string | null;
} {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todayHours = restaurantData.openingHours.find(
    (h) => h.dayOfWeek === dayOfWeek
  );

  if (!todayHours || todayHours.closed || !todayHours.openTime || !todayHours.closeTime) {
    const nextOpen = getNextOpenDay(dayOfWeek);
    return {
      isOpen: false,
      todayLabel: `Fermé aujourd'hui`,
      nextOpenLabel: nextOpen,
    };
  }

  const [openH = 0, openM = 0] = todayHours.openTime.split(":").map(Number);
  const [closeH = 0, closeM = 0] = todayHours.closeTime.split(":").map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return {
      isOpen: true,
      todayLabel: `Ouvert jusqu'à ${todayHours.closeTime}`,
      nextOpenLabel: null,
    };
  }

  if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      todayLabel: `Fermé — ouvre aujourd'hui à ${todayHours.openTime}`,
      nextOpenLabel: null,
    };
  }

  const nextOpen = getNextOpenDay(dayOfWeek);
  return {
    isOpen: false,
    todayLabel: "Fermé",
    nextOpenLabel: nextOpen,
  };
}

function getNextOpenDay(fromDay: number): string | null {
  for (let i = 1; i <= 7; i++) {
    const day = (fromDay + i) % 7;
    const hours = restaurantData.openingHours.find((h) => h.dayOfWeek === day);
    if (hours && !hours.closed && hours.openTime) {
      const dayName = i === 1 ? "demain" : DAYS_FR[day];
      return `Ouvre ${dayName} à ${hours.openTime}`;
    }
  }
  return null;
}
