import { CartItem } from "./CartItem";
import type { CartItem as CartModelItem } from "../../models/cart";

interface CartItemListProps {
  items: CartModelItem[];
  selectedItems: string[];
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CartItemList = ({
  items,
  selectedItems,
  onSelect,
  onRemove,
}: CartItemListProps) => {
  return (
    <div>
      {items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          image={item.image}
          isSelected={selectedItems.includes(String(item.id))}
          onSelect={onSelect}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};
