import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useProducts } from "../hooks/useProducts";
import { useRental } from "../hooks/useRental";

import { AppImageCarousel } from "../components/ui/AppImageCarousel";
import { AppButton } from "../components/ui/AppButton";
import { AppDialog } from "../components/ui/AppDialog";
import { AppSnackbar } from "../components/ui/AppSnackbar";
import { AppTextField } from "../components/ui/AppTextField";

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

  if (loading) {
    return (
      <div className="grid animate-fade-in gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="skeleton h-72 w-full rounded-xl" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="skeleton h-7 w-2/3 rounded-md" />
          <div className="mt-3 skeleton h-5 w-1/3 rounded-md" />
          <div className="mt-6 space-y-3">
            <div className="skeleton h-12 w-full rounded-lg" />
            <div className="skeleton h-12 w-full rounded-lg" />
            <div className="skeleton h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 shadow-soft">
        {error}
      </div>
    );
  }
  if (!product) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-700 shadow-soft">
        Producto no encontrado
      </div>
    );
  }

  const hasCartItems = cartState.items.length > 0;

  const isValidDates = Boolean(
    rental.startDate && rental.endDate && rental.days > 0,
  );

  const isValidQuantity = rental.quantity > 0;

  const canConfirm = hasCartItems && isValidDates && isValidQuantity;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="grid animate-slide-up gap-6 lg:grid-cols-[1.1fr_1fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft md:p-6">
        <div className="mb-4 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          Producto premium
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          {product.displayName}
        </h1>

        <AppImageCarousel images={product.mediaUrls} alt={product.displayName} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft md:p-6">
        <p className="text-sm text-slate-500">Precio por dia</p>
        <p className="mt-1 text-3xl font-bold text-slate-900">
          ${product.prices?.[0]?.price || 0}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          IVA incluido. Disponibilidad sujeta a stock.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300">
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
          <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-xl font-bold text-brand-700">
            Total estimado: ${rental.total}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-3">
          <AppButton
            rental={rental}
            showMessage={showMessage}
            isValidDates={isValidDates}
            isValidQuantity={isValidQuantity}
            canConfirm={canConfirm}
            setOpenDialog={setOpenDialog}
          />
        </div>
      </section>

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
