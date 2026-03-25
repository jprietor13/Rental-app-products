import type { CartAction, CartState } from "../../models/cart";

export const initialState: CartState = {
  items: [],
};

export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
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
