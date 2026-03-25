import type { CartItem } from "../../models/cart";

const CART_KEY = "cart";

export const getStoredCart = (): CartItem[] | null => {
  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as CartItem[];
    return parsed.length ? parsed : null;
  } catch {
    localStorage.removeItem(CART_KEY);
    return null;
  }
};

export const saveCart = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
