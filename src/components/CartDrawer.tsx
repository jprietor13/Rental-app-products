import { Drawer } from "@mui/material";
import { useCartDrawer } from "../hooks/useCartDrawer";
import { CartEmptyState } from "./CartDrawer/CartEmptyState";
import { CartFooter } from "./CartDrawer/CartFooter";
import { CartHeader } from "./CartDrawer/CartHeader";
import { CartItemList } from "./CartDrawer/CartItemList";
import { CartSelectAll } from "./CartDrawer/CartSelectAll";

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
          "glass-panel w-full max-w-md flex flex-col border-l border-slate-200 shadow-2xl transition-all duration-300",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="px-5 py-4 bg-white/85 shadow-sm">
          <CartHeader onClose={onClose} itemCount={state.items.length} />
        </div>

        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center px-5">
            <CartEmptyState />
          </div>
        ) : (
          <>
            <div className="border-b border-slate-200 bg-white/80 px-5 py-3">
              <CartSelectAll
                isChecked={isAllSelected}
                onChange={handleSelectAll}
              />
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
              <CartItemList
                items={state.items}
                selectedItems={selectedItems}
                onSelect={toggleSelect}
                onRemove={handleRemove}
              />
            </div>

            <div className="border-t border-slate-200 bg-white/85 px-5 py-4">
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
