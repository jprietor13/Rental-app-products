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
    <div className="flex flex-col gap-4 bg-transparent pt-1">
      <Typography className="rounded-xl bg-brand-50 px-4 py-3 text-lg font-bold text-brand-800">
        Total seleccionado: ${total}
      </Typography>

      <div className="flex flex-col gap-3">
        <Button
          variant="contained"
          color="error"
          disabled={isDisabled || selectedCount === 0}
          onClick={onRemoveSelected}
          fullWidth
          className="!rounded-xl !bg-red-600 !py-2.5 !font-semibold !text-white !shadow-soft transition-all duration-300 hover:!bg-red-700 hover:!shadow-lift disabled:!bg-gray-300 disabled:!text-gray-500 disabled:!shadow-none"
        >
          Eliminar seleccionados ({selectedCount})
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={onClearAll}
          fullWidth
          className="!rounded-xl !border-red-500 !py-2.5 !font-medium !text-red-600 transition-all duration-300 hover:!bg-red-50"
        >
          Vaciar carrito
        </Button>
      </div>
    </div>
  );
};
