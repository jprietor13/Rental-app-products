import { createContext, useEffect, useReducer, useState } from "react";
import type { CartContextValue, CartItem } from "../../models/cart";
import { cartReducer, initialState } from "./cartReducer";
import { getStoredCart, saveCart, clearCart } from "./cartStorage";

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const [{ isRestoredCart, pendingStoredItems, persistenceEnabled }, setUi] =
    useState<{
      isRestoredCart: boolean;
      pendingStoredItems: CartItem[] | null;
      persistenceEnabled: boolean;
    }>(() => {
      const storedItems = getStoredCart();

      if (storedItems) {
        return {
          isRestoredCart: true,
          pendingStoredItems: storedItems,
          persistenceEnabled: false,
        };
      }

      return {
        isRestoredCart: false,
        pendingStoredItems: null,
        persistenceEnabled: true,
      };
    });

  useEffect(() => {
    if (!persistenceEnabled) return;
    saveCart(state.items);
  }, [state.items, persistenceEnabled]);

  const confirmRestoreSavedCart = () => {
    if (!pendingStoredItems) {
      setUi((prev) => ({
        ...prev,
        isRestoredCart: false,
        persistenceEnabled: true,
      }));
      return;
    }

    dispatch({ type: "SET_ITEMS", payload: pendingStoredItems });

    setUi((prev) => ({
      ...prev,
      pendingStoredItems: null,
      isRestoredCart: false,
      persistenceEnabled: true,
    }));
  };

  const dismissRestoreSavedCart = () => {
    clearCart();

    setUi((prev) => ({
      ...prev,
      pendingStoredItems: null,
      isRestoredCart: false,
      persistenceEnabled: true,
    }));
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        isRestoredCart,
        confirmRestoreSavedCart,
        dismissRestoreSavedCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
