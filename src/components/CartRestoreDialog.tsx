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
          "glass-panel rounded-2xl border border-slate-200 !p-2 shadow-lift transition-all duration-300",
      }}
    >
      <DialogTitle
        id="restore-cart-dialog-title"
        className="text-xl font-semibold text-slate-900"
      >
        Tienes un carrito guardado
      </DialogTitle>

      <DialogContent className="text-slate-700">
        ¿Deseas recuperarlo?
      </DialogContent>

      <DialogActions className="px-6 pb-4 flex justify-end gap-3">
        <Button
          onClick={dismissRestoreSavedCart}
          color="inherit"
          className="!rounded-lg !px-4 !py-2 !text-gray-600 transition-all duration-200 hover:!bg-gray-100"
        >
          No, descartarlo
        </Button>

        <Button
          onClick={confirmRestoreSavedCart}
          variant="contained"
          autoFocus
          className="!rounded-lg !bg-brand-600 !px-5 !py-2 !font-semibold !text-white !shadow-soft transition-all duration-300 hover:!bg-brand-700 hover:!shadow-lift"
        >
          Sí, recuperarlo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
