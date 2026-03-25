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
    <div>
      <Typography variant="h6">Total: ${total}</Typography>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="contained"
          color="error"
          disabled={isDisabled || selectedCount === 0}
          onClick={onRemoveSelected}
          fullWidth
        >
          Eliminar seleccionados ({selectedCount})
        </Button>

        <Button variant="outlined" color="error" onClick={onClearAll} fullWidth>
          Vaciar carrito
        </Button>
      </div>
    </div>
  );
};
