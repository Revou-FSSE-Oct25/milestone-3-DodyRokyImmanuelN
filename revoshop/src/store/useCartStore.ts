import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, type: "plus" | "minus") => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const currentCart = get().cart;
        const isItemExist = currentCart.find((item) => item.id === product.id);

        if (isItemExist) {
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            cart: [...currentCart, { ...product, quantity: 1 }],
          });
        }
      },
      removeFromCart: (id) =>
        set({ cart: get().cart.filter((item) => item.id !== id) }),
      updateQuantity: (id, type) => {
        set({
          cart: get().cart.map((item) => {
            if (item.id === id) {
              const newQuantity =
                type === "plus" ? item.quantity + 1 : item.quantity - 1;
              return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
          }),
        });
      },
      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        const currentCart = get().cart;
        return currentCart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "shopping-cart-storage",
    },
  ),
);
