import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HistoryIcon from "@mui/icons-material/History";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useCart } from "../context/useCart";

export function CartRestoreDialog() {
  const { isRestoredCart, confirmRestoreSavedCart, dismissRestoreSavedCart } =
    useCart();

  return (
    <Dialog
      open={isRestoredCart}
      onClose={dismissRestoreSavedCart}
      aria-labelledby="restore-cart-dialog-title"
      PaperProps={{
        className:
          "glass-panel rounded-2xl border border-slate-200 p-2! shadow-lift transition-all duration-300",
      }}
    >
      <DialogTitle
        id="restore-cart-dialog-title"
        className="text-xl font-semibold text-slate-900 flex items-center gap-2"
      >
        <HistoryIcon className="text-brand-600!" />
        Tienes un carrito guardado
      </DialogTitle>

      <DialogContent className="text-slate-700">
        ¿Deseas recuperarlo?
      </DialogContent>

      <DialogActions className="px-6 pb-4 flex justify-end gap-3">
        <Button
          onClick={dismissRestoreSavedCart}
          color="inherit"
          className="rounded-lg! px-4! py-2! text-gray-600! transition-all duration-200 hover:bg-gray-100!"
        >
          <DeleteForeverIcon fontSize="small" className="mr-1" />
          No, descartarlo
        </Button>

        <Button
          onClick={confirmRestoreSavedCart}
          variant="contained"
          autoFocus
          className="rounded-lg! bg-brand-600! px-5! py-2! font-semibold! text-white! shadow-soft! transition-all duration-300 hover:bg-brand-700! hover:shadow-lift!"
        >
          <RestoreIcon fontSize="small" className="mr-1" />
          Sí, recuperarlo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
