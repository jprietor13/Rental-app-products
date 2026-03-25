import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useCart } from "../context/useCart";

export const Header = ({ onToggleCart }: { onToggleCart: () => void }) => {
  const { state } = useCart();
  const count = state.items.length;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 glass-panel shadow-soft transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <StorefrontIcon className="!text-brand-600" />
          <div className="leading-tight">
            <h2 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
              Rental Store
            </h2>
            <p className="text-xs text-slate-500">Herramientas y productos</p>
          </div>
        </div>

        <button
          onClick={onToggleCart}
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-brand-700 active:scale-95"
        >
          <ShoppingCartOutlinedIcon className="!text-[26px]" />
          <span
            className={`absolute -right-0.5 -top-0.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-[11px] font-bold leading-none text-white shadow-md transition-transform duration-200 ${count > 0 ? "scale-100" : "scale-0"}`}
          >
            {count}
          </span>
        </button>
      </div>
    </header>
  );
};
