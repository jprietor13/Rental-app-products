import { createContext, useReducer, useContext, useEffect } from "react";
import type { CartState } from "../models/cart";

const CartContext = createContext(null);

const initialState: CartState = {
  items: [],
};

const reducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case "ADD":
      return { ...state, items: [...state.items, action.payload] };
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
        dispatch({ type: "SET_ITEMS", payload: JSON.parse(stored) });
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
