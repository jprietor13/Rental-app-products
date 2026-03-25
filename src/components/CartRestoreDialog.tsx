import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useCart } from "../context/useCart";

export function CartRestoreDialog() {
  const { isRestoredCart, confirmRestoreSavedCart, dismissRestoreSavedCart } =
    useCart();

  return (
    <Dialog
      open={isRestoredCart}
      onClose={dismissRestoreSavedCart}
      aria-labelledby="restore-cart-dialog-title"
    >
      <DialogTitle id="restore-cart-dialog-title">
        Tienes un carrito guardado
      </DialogTitle>
      <DialogContent>¿Deseas recuperarlo?</DialogContent>
      <DialogActions>
        <Button onClick={dismissRestoreSavedCart} color="inherit">
          No, descartarlo
        </Button>
        <Button onClick={confirmRestoreSavedCart} variant="contained" autoFocus>
          Sí, recuperarlo
        </Button>
      </DialogActions>
    </Dialog>
  );
}

