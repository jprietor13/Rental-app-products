import { Button, Checkbox } from "@mui/material";

interface CartItemProps {
  id: string | number;
  name: string;
  price: number;
  image: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

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
    <div className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-soft hover:shadow-lift transition-all duration-300">
      <div>
        <Checkbox
          checked={isSelected}
          onChange={() => onSelect(String(id))}
          size="small"
          className="!text-brand-600"
        />
      </div>

      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <p className="text-sm font-medium text-gray-800 line-clamp-2">{name}</p>
        <p className="text-base font-bold text-gray-900">${price}</p>
      </div>

      <Button
        color="error"
        onClick={() => onRemove(String(id))}
        variant="outlined"
        size="small"
        fullWidth
        className="!border-red-500 !text-red-600 hover:!bg-red-50 !rounded-lg !px-3 !py-1.5 transition-all duration-200"
      >
        Eliminar
      </Button>
    </div>
  );
};
