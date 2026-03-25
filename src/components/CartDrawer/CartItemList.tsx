import { CartItem } from "./CartItem";
import type { CartItemListProps } from "../../models/cart";

export const CartItemList = ({
  items,
  selectedItems,
  onSelect,
  onRemove,
}: CartItemListProps) => {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto pr-1">
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
