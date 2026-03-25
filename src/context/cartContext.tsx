import { createContext, useEffect, useReducer, useState } from "react";
import type { CartAction, CartItem, CartState } from "../models/cart";

export type CartContextValue = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  isRestoredCart: boolean;
  confirmRestoreSavedCart: () => void;
  dismissRestoreSavedCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const initialState: CartState = {
  items: [],
};

const reducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.some((item) => item.id === action.payload.id);

      if (exists) return state;

      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "REMOVE_MANY":
      return {
        ...state,
        items: state.items.filter((item) => !action.payload.includes(item.id)),
      };

    case "CLEAR":
      return { ...state, items: [] };

    case "SET_ITEMS":
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [{ isRestoredCart, pendingStoredItems, persistenceEnabled }, setUi] =
    useState<{
      isRestoredCart: boolean;
      pendingStoredItems: CartItem[] | null;
      persistenceEnabled: boolean;
    }>(() => {
      const stored = localStorage.getItem("cart");
      if (!stored) {
        return {
          isRestoredCart: false,
          pendingStoredItems: null,
          persistenceEnabled: true,
        };
      }

      try {
        const storedItems = JSON.parse(stored) as CartItem[];
        if (storedItems.length > 0) {
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
      } catch {
        localStorage.removeItem("cart");
        return {
          isRestoredCart: false,
          pendingStoredItems: null,
          persistenceEnabled: true,
        };
      }
    });

  useEffect(() => {
    if (!persistenceEnabled) return;
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [persistenceEnabled, state.items]);

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
    localStorage.removeItem("cart");
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
