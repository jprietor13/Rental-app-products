import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import type { CartEmptyStateProps } from "../../models/cart";

export const CartEmptyState = ({
  message = "Carrito vacio",
}: CartEmptyStateProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
      <ShoppingCartOutlinedIcon className="text-5xl! text-slate-400! animate-bounce" />

      <p className="text-lg font-medium text-slate-700">{message}</p>

      <span className="text-sm text-slate-500">
        Agrega productos para comenzar tu alquiler
      </span>
    </div>
  );
};
