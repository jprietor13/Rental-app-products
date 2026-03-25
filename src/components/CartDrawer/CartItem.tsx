import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, Checkbox } from "@mui/material";
import type { CartItemProps } from "../../models/cart";

export const CartItem = ({
  id,
  name,
  price,
  image,
  isSelected,
  onSelect,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-soft transition-all duration-300 hover:-translate-y-px hover:shadow-lift">
      <div>
        <Checkbox
          checked={isSelected}
          onChange={() => onSelect(String(id))}
          size="small"
          className="text-brand-600!"
        />
      </div>

      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
        <img
          src={image}
          alt={name}
          className="h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <p className="line-clamp-2 text-sm font-medium text-slate-800">
          {name}
        </p>
        <p className="text-base font-bold text-slate-900">
          ${Number(price).toLocaleString()}
        </p>
      </div>

      <Button
        color="error"
        onClick={() => onRemove(String(id))}
        variant="outlined"
        size="small"
        fullWidth
        className="rounded-lg! border-red-500! px-3! py-1.5! text-red-600! transition-all duration-200 hover:bg-red-50!"
      >
        <DeleteOutlineIcon fontSize="small" className="mr-1" />
        Eliminar
      </Button>
    </div>
  );
};
