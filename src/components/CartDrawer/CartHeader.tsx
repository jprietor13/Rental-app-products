import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CartHeaderProps {
  onClose: () => void;
}

export const CartHeader = ({ onClose }: CartHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
      <Typography className="text-lg font-semibold text-slate-900">
        Carrito
      </Typography>

      <IconButton
        onClick={onClose}
        size="small"
        className="!rounded-full !text-slate-500 transition-all duration-200 hover:!bg-slate-100 hover:!text-slate-800"
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};
