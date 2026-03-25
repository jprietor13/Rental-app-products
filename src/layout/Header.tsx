import { useCart } from "../context/cartContext";
import { Button, Badge } from "@mui/material";

export const Header = ({ onToggleCart }: { onToggleCart: () => void }) => {
  const { state } = useCart();

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h2>Rental APP</h2>
      <Badge badgeContent={state.items.length} color="primary">
        <Button variant="contained" onClick={onToggleCart}>
          Carrito
        </Button>
      </Badge>
    </div>
  );
};
