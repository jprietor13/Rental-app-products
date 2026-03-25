import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CartHeaderProps {
  onClose: () => void;
}

export const CartHeader = ({ onClose }: CartHeaderProps) => {
  return (
    <div style={{ display: "flex" }}>
      <Typography variant="h6">Carrito</Typography>
      <IconButton onClick={onClose} size="small">
        <CloseIcon />
      </IconButton>
    </div>
  );
};
