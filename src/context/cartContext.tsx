import { createContext, useEffect, useReducer } from "react";
import type { CartAction, CartItem, CartState } from "../models/cart";

export type CartContextValue = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
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

  useEffect(() => {
    const stored = localStorage.getItem("cart");

    if (stored) {
      const shouldRestore = window.confirm(
        "Tienes un carrito guardado ¿Deseas recuperarlo?",
      );

      if (shouldRestore) {
        const storedItems = JSON.parse(stored) as CartItem[];
        dispatch({ type: "SET_ITEMS", payload: storedItems });
      } else {
        localStorage.removeItem("cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
