export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD"; payload: CartItem }
  | { type: "CLEAR" }
  | { type: "SET_ITEMS"; payload: CartItem[] };
