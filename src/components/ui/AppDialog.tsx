import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
        className:
          "glass-panel rounded-2xl border border-slate-200 !p-2 shadow-lift transition-all duration-300",
      }}
    >
      <DialogTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
        <ReceiptLongIcon className="!text-brand-600" />
        Confirmar alquiler
      </DialogTitle>

      <DialogContent className="flex flex-col gap-3 text-slate-700">
        <p className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
          <span className="font-medium">Días:</span>
          <span>{rental.days}</span>
        </p>
        <p className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
          <span className="font-medium">Cantidad:</span>
          <span>{rental.quantity}</span>
        </p>
        <p className="flex justify-between rounded-lg bg-brand-50 px-3 py-2 text-lg font-bold text-brand-700">
          <span>Total:</span>
          <span>${rental.total}</span>
        </p>
      </DialogContent>

      <DialogActions className="px-6 pb-4 flex justify-end gap-3">
        <Button
          onClick={() => setOpenDialog(false)}
          className="!rounded-lg !px-4 !py-2 !text-gray-600 transition-all duration-200 hover:!bg-gray-100"
        >
          <CloseIcon fontSize="small" className="mr-1" />
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
          className="!rounded-lg !bg-brand-600 !px-5 !py-2 !font-semibold !text-white !shadow-soft transition-all duration-300 hover:!bg-brand-700 hover:!shadow-lift"
        >
          <CheckCircleIcon fontSize="small" className="mr-1" />
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
