import { useState, useEffect, useContext, createContext, type ReactNode } from "react";
import type { Bottle } from "../data/bottles";

interface CartContextValue {
  items: Bottle[];
  addItem: (item: Bottle) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "new_cart_v1";

const CartContext = createContext<CartContextValue | null>(null);

function loadIntialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItem] = useState(loadIntialCart);

  useEffect(() => {
    if (!items) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      return;
    }
  }, [items]);

  const addItem = (item: Bottle) => {
    setItem((t: Bottle[]) => t.push(item));
  };

  const value = {
    items,
    addItem,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a CartProvder");
  }

  return ctx;
}
