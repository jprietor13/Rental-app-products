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
        className="!w-full !rounded-xl !bg-brand-600 !px-6 !py-3 !font-semibold !text-white !shadow-soft transition-all duration-300 hover:!bg-brand-700 hover:!shadow-lift hover:scale-[1.01]"
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
        className="!w-full !rounded-xl !bg-green-600 !px-6 !py-3 !font-semibold !text-white !shadow-soft transition-all duration-300 hover:!bg-green-700 hover:!shadow-lift hover:scale-[1.01] disabled:!bg-gray-300 disabled:!text-gray-500 disabled:!shadow-none disabled:hover:scale-100"
      >
        Confirmar alquiler
      </Button>
    </>
  );
};
