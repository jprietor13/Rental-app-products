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
        className: "rounded-2xl !p-2 shadow-lift transition-all duration-300",
      }}
    >
      <DialogTitle
        id="restore-cart-dialog-title"
        className="text-xl font-semibold text-gray-900"
      >
        Tienes un carrito guardado
      </DialogTitle>

      <DialogContent className="text-gray-700">
        ¿Deseas recuperarlo?
      </DialogContent>

      <DialogActions className="px-6 pb-4 flex justify-end gap-3">
        <Button
          onClick={dismissRestoreSavedCart}
          color="inherit"
          className="!text-gray-600 hover:!bg-gray-100 !rounded-lg !px-4 !py-2 transition-all duration-200"
        >
          No, descartarlo
        </Button>

        <Button
          onClick={confirmRestoreSavedCart}
          variant="contained"
          autoFocus
          className="!bg-brand-600 hover:!bg-brand-700 !text-white !font-semibold !px-5 !py-2 !rounded-lg !shadow-soft hover:!shadow-lift transition-all duration-300"
        >
          Sí, recuperarlo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
