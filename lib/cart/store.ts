import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemOption {
  viande?: string;
  accompagnement?: string;
  sauces?: string[];
  boisson?: string;
  supplements?: string[];
  notes?: string;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  basePrice: number;
  supplementsTotal: number;
  quantity: number;
  options: CartItemOption;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.menuItemId === item.menuItemId &&
              JSON.stringify(i.options) === JSON.stringify(item.options)
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === existing.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) =>
                  i.id === id ? { ...i, quantity } : i
                ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "kebab-dor-cart",
    }
  )
);

export function computeCartSubtotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + (item.basePrice + item.supplementsTotal) * item.quantity,
    0
  );
}
