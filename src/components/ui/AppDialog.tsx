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
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      PaperProps={{
        className: "rounded-2xl !p-2 shadow-lift transition-all duration-300",
      }}
    >
      <DialogTitle className="text-xl font-semibold text-gray-900">
        Confirmar alquiler
      </DialogTitle>

      <DialogContent className="flex flex-col gap-3 text-gray-700">
        <p className="flex justify-between">
          <span className="font-medium">Días:</span>
          <span>{rental.days}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-medium">Cantidad:</span>
          <span>{rental.quantity}</span>
        </p>
        <p className="flex justify-between text-lg font-bold text-brand-600">
          <span>Total:</span>
          <span>${rental.total}</span>
        </p>
      </DialogContent>

      <DialogActions className="px-6 pb-4 flex justify-end gap-3">
        <Button
          onClick={() => setOpenDialog(false)}
          className="!text-gray-600 hover:!bg-gray-100 !rounded-lg !px-4 !py-2 transition-all duration-200"
        >
          Cancelar
        </Button>

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
          className="!bg-brand-600 hover:!bg-brand-700 !text-white !font-semibold !px-5 !py-2 !rounded-lg !shadow-soft hover:!shadow-lift transition-all duration-300"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
