import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import type { useRental } from "../../hooks/useRental";

type AppDialogProps = {
  openDialog: boolean;
  rental: ReturnType<typeof useRental>;
  showMessage: (msg: string) => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppDialog = ({
  openDialog,
  rental,
  showMessage,
  setOpenDialog,
}: AppDialogProps) => {
  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Confirmar alquiler</DialogTitle>

      <DialogContent>
        <p>Días: {rental.days}</p>
        <p>Cantidad: {rental.quantity}</p>
        <p>Total: ${rental.total}</p>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>

        <Button
          variant="contained"
          onClick={() => {
            const res = rental.confirmRental();

            if (res?.error) {
              showMessage(res.error);
              return;
            }

            showMessage("El proceso de alquiler culminó de manera correcta");
            setOpenDialog(false);
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
