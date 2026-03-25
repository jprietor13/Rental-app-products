import { Typography, Button } from "@mui/material";

interface CartFooterProps {
  total: number;
  selectedCount: number;
  onRemoveSelected: () => void;
  onClearAll: () => void;
  isDisabled?: boolean;
}

export const CartFooter = ({
  total,
  selectedCount,
  onRemoveSelected,
  onClearAll,
  isDisabled = false,
}: CartFooterProps) => {
  return (
    <div className="border-t pt-4 flex flex-col gap-4 bg-white">
      <Typography className="text-lg font-bold text-gray-900">
        Total: ${total}
      </Typography>

      <div className="flex flex-col gap-3">
        <Button
          variant="contained"
          color="error"
          disabled={isDisabled || selectedCount === 0}
          onClick={onRemoveSelected}
          fullWidth
          className="!bg-red-600 hover:!bg-red-700 !text-white !font-semibold !py-2.5 !rounded-lg !shadow-soft hover:!shadow-lift transition-all duration-300 disabled:!bg-gray-300 disabled:!text-gray-500 disabled:!shadow-none"
        >
          Eliminar seleccionados ({selectedCount})
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={onClearAll}
          fullWidth
          className="!border-red-500 !text-red-600 hover:!bg-red-50 !font-medium !py-2.5 !rounded-lg transition-all duration-300"
        >
          Vaciar carrito
        </Button>
      </div>
    </div>
  );
};
