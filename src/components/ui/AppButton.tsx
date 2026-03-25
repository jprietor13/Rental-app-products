import { Button } from "@mui/material";
import type { useRental } from "../../hooks/useRental";

type AppButtonProps = {
  rental: ReturnType<typeof useRental>;
  showMessage: (msg: string) => void;
  isValidDates: boolean;
  isValidQuantity: boolean;
  canConfirm: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppButton = ({
  rental,
  showMessage,
  isValidDates,
  isValidQuantity,
  canConfirm,
  setOpenDialog,
}: AppButtonProps) => {
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          rental.addToCart();
          showMessage("Producto cargado de manera exitosa");
        }}
      >
        Agregar producto
      </Button>

      <Button
        variant="contained"
        color="success"
        disabled={!canConfirm}
        onClick={() => {
          if (!isValidDates) {
            showMessage("Fechas inválidas");
            return;
          }

          if (!isValidQuantity) {
            showMessage("Cantidad debe ser mayor a 0");
            return;
          }

          setOpenDialog(true);
        }}
      >
        Confirmar alquiler
      </Button>
    </>
  );
};
