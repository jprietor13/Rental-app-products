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
        className="!bg-brand-600 hover:!bg-brand-700 !text-white !font-semibold !px-6 !py-2.5 !rounded-lg !shadow-soft hover:!shadow-lift transition-all duration-300 hover:scale-[1.02]"
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
        className="!bg-green-600 hover:!bg-green-700 !text-white !font-semibold !px-6 !py-2.5 !rounded-lg !shadow-soft hover:!shadow-lift transition-all duration-300 hover:scale-[1.02] disabled:!bg-gray-300 disabled:!text-gray-500 disabled:!shadow-none disabled:hover:scale-100"
      >
        Confirmar alquiler
      </Button>
    </>
  );
};
