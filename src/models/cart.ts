export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: string }
  | { type: "REMOVE_MANY"; payload: string[] }
  | { type: "CLEAR" }
  | { type: "SET_ITEMS"; payload: CartItem[] };
