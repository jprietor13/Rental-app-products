import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useRental } from "../hooks/useRental";
import { useState } from "react";

import { AppTextField } from "../components/ui/AppTextField";
import { AppButton } from "../components/ui/AppButton";
import { AppSnackbar } from "../components/ui/AppSnackbar";
import { AppDialog } from "../components/ui/AppDialog";

export const ProductDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useProducts();
  const product = data?.find((p) => p.productId === id);

  const rental = useRental(product!);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setOpenSnackbar(true);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  const isValidDates = rental.startDate && rental.endDate && rental.days > 0;

  const isValidQuantity = rental.quantity > 0;

  const canConfirm = isValidDates && isValidQuantity;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h1>{product.displayName}</h1>

      {product.mediaUrls.length > 0 && (
        <img src={product.mediaUrls[0]} alt={product.displayName} />
      )}

      <p>Precio por día: ${product.prices?.[0]?.price || 0}</p>

      <AppTextField
        startDate={rental.startDate}
        onStartDateChange={rental.setStartDate}
        endDate={rental.endDate}
        onEndDateChange={rental.setEndDate}
        quantity={rental.quantity}
        onQuantityChange={rental.setQuantity}
        today={today}
      />

      {rental.total > 0 && <p>Total: ${rental.total}</p>}

      <AppButton
        rental={rental}
        showMessage={showMessage}
        isValidDates={isValidDates}
        isValidQuantity={isValidQuantity}
        canConfirm={canConfirm}
        setOpenDialog={setOpenDialog}
      />

      <AppSnackbar
        openSnackbar={openSnackbar}
        message={message}
        setOpenSnackbar={setOpenSnackbar}
      />

      <AppDialog
        openDialog={openDialog}
        rental={rental}
        showMessage={showMessage}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};
