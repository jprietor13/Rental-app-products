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

export interface CartEmptyStateProps {
  message?: string;
}

export interface CartFooterProps {
  total: number;
  selectedCount: number;
  onRemoveSelected: () => void;
  onClearAll: () => void;
  isDisabled?: boolean;
}

export interface CartHeaderProps {
  onClose: () => void;
  itemCount: number;
}

export interface CartItemProps {
  id: string | number;
  name: string;
  price: number;
  image: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export interface CartItemListProps {
  items: CartItem[];
  selectedItems: string[];
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export interface CartSelectAllProps {
  isChecked: boolean;
  onChange: () => void;
}
