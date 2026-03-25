import { useCart } from "../context/useCart";
import { Button, Badge } from "@mui/material";

export const Header = ({ onToggleCart }: { onToggleCart: () => void }) => {
  const { state } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 glass-panel shadow-soft transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <h2 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
              Rental Store
            </h2>
            <p className="text-xs text-slate-500">Herramientas y productos</p>
          </div>
        </div>
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <Badge badgeContent={state.items.length} color="primary" showZero>
            <Button
              variant="contained"
              onClick={onToggleCart}
              className="!rounded-xl !bg-brand-600 !px-5 !py-2 !font-semibold !text-white !shadow-soft transition-all duration-300 hover:!bg-brand-700 hover:!shadow-lift"
            >
              Carrito
            </Button>
          </Badge>
        </div>
      </div>
    </header>
  );
};
