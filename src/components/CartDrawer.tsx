import { Drawer } from "@mui/material";
import { useCartDrawer } from "../hooks/useCartDrawer";
import { CartHeader } from "./CartDrawer/CartHeader";
import { CartEmptyState } from "./CartDrawer/CartEmptyState";
import { CartSelectAll } from "./CartDrawer/CartSelectAll";
import { CartItemList } from "./CartDrawer/CartItemList";
import { CartFooter } from "./CartDrawer/CartFooter";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const {
    state,
    selectedItems,
    isEmpty,
    isAllSelected,
    total,
    toggleSelect,
    handleSelectAll,
    handleRemove,
    handleRemoveSelected,
    handleClearAll,
  } = useCartDrawer();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div>
        <CartHeader onClose={onClose} />

        {isEmpty ? (
          <CartEmptyState />
        ) : (
          <>
            <CartSelectAll
              isChecked={isAllSelected}
              onChange={handleSelectAll}
            />

            <CartItemList
              items={state.items}
              selectedItems={selectedItems}
              onSelect={toggleSelect}
              onRemove={handleRemove}
            />

            <CartFooter
              total={total}
              selectedCount={selectedItems.length}
              onRemoveSelected={handleRemoveSelected}
              onClearAll={handleClearAll}
            />
          </>
        )}
      </div>
    </Drawer>
  );
};
