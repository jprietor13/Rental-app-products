import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useRental } from "../hooks/useRental";
import { useCart } from "../context/useCart";
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
  const { state: cartState } = useCart();

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

  const hasCartItems = cartState.items.length > 0;

  const isValidDates = Boolean(
    rental.startDate && rental.endDate && rental.days > 0,
  );

  const isValidQuantity = rental.quantity > 0;

  const canConfirm = hasCartItems && isValidDates && isValidQuantity;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 flex flex-col gap-6 transition-all duration-300 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
        {product.displayName}
      </h1>

      {product.mediaUrls.length > 0 && (
        <div className="w-full flex justify-center items-center bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={product.mediaUrls[0]}
            alt={product.displayName}
            className="h-64 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <p className="text-lg font-semibold text-gray-800">
        Precio por día:{" "}
        <span className="text-xl font-bold text-gray-900">
          ${product.prices?.[0]?.price || 0}
        </span>
      </p>

      <div className="bg-gray-50 rounded-xl p-4 shadow-inner transition-all duration-300">
        <AppTextField
          calendarEnabled={hasCartItems}
          startDate={rental.startDate}
          onStartDateChange={rental.setStartDate}
          endDate={rental.endDate}
          onEndDateChange={rental.setEndDate}
          quantity={rental.quantity}
          onQuantityChange={rental.setQuantity}
          today={today}
        />
      </div>

      {rental.total > 0 && (
        <p className="text-xl font-bold text-brand-600 animate-pulse">
          Total: ${rental.total}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <AppButton
          rental={rental}
          showMessage={showMessage}
          isValidDates={isValidDates}
          isValidQuantity={isValidQuantity}
          canConfirm={canConfirm}
          setOpenDialog={setOpenDialog}
        />
      </div>

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
