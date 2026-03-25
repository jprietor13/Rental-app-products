import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton, Typography } from "@mui/material";
import type { CartHeaderProps } from "../../models/cart";

export const CartHeader = ({ onClose, itemCount }: CartHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
      <div className="flex items-center gap-2">
        <ShoppingCartIcon fontSize="small" className="text-brand-600!" />
        <Typography className="text-lg font-semibold text-slate-900">
          Carrito
        </Typography>
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-brand-100 px-1.5 text-xs font-bold text-brand-700">
          {itemCount}
        </span>
      </div>

      <IconButton
        onClick={onClose}
        size="small"
        className="rounded-full! text-slate-500! transition-all duration-200 hover:bg-slate-100! hover:text-slate-800!"
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};
