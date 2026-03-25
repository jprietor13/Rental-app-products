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
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        className:
          "w-full max-w-md bg-gray-50 flex flex-col shadow-2xl transition-all duration-300",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="px-5 py-4 bg-white shadow-sm">
          <CartHeader onClose={onClose} />
        </div>

        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center px-5">
            <CartEmptyState />
          </div>
        ) : (
          <>
            <div className="px-5 py-3 bg-white border-b">
              <CartSelectAll
                isChecked={isAllSelected}
                onChange={handleSelectAll}
              />
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
              <CartItemList
                items={state.items}
                selectedItems={selectedItems}
                onSelect={toggleSelect}
                onRemove={handleRemove}
              />
            </div>

            <div className="px-5 py-4 bg-white border-t">
              <CartFooter
                total={total}
                selectedCount={selectedItems.length}
                onRemoveSelected={handleRemoveSelected}
                onClearAll={handleClearAll}
              />
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};
