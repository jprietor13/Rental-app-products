import { useCart } from "../context/useCart";
import { Button, Badge } from "@mui/material";

export const Header = ({ onToggleCart }: { onToggleCart: () => void }) => {
  const { state } = useCart();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-soft sticky top-0 z-50 transition-all duration-300">
      <h2 className="text-xl font-semibold text-gray-800 tracking-tight hover:text-brand-600 transition-colors duration-300 cursor-pointer">
        Rental APP
      </h2>

      <div className="transform transition-all duration-300 hover:scale-105">
        <Badge badgeContent={state.items.length} color="primary">
          <Button
            variant="contained"
            onClick={onToggleCart}
            className="!bg-brand-600 hover:!bg-brand-700 !text-white !font-medium !px-5 !py-2 !rounded-lg !shadow-soft hover:!shadow-lift transition-all duration-300"
          >
            Carrito
          </Button>
        </Badge>
      </div>
    </div>
  );
};
