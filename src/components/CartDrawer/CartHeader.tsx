import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CartHeaderProps {
  onClose: () => void;
}

export const CartHeader = ({ onClose }: CartHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <Typography className="text-lg font-semibold text-gray-900">
        Carrito
      </Typography>

      <IconButton
        onClick={onClose}
        size="small"
        className="!text-gray-500 hover:!text-gray-800 hover:!bg-gray-100 !rounded-full transition-all duration-200"
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};
