import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useProductDetail } from "../hooks/useProductDetail";

import { ProductDetailError } from "../components/ProductDetail/ProductDetailError";
import { ProductDetailNotFound } from "../components/ProductDetail/ProductDetailNotFound";
import { ProductDetailSkeleton } from "../components/ProductDetail/ProductDetailSkeleton";
import { AppButton } from "../components/ui/AppButton";
import { AppDialog } from "../components/ui/AppDialog";
import { AppImageCarousel } from "../components/ui/AppImageCarousel";
import { AppSnackbar } from "../components/ui/AppSnackbar";
import { AppTextField } from "../components/ui/AppTextField";

export const ProductDetail = () => {
  const {
    product,
    loading,
    error,
    rental,
    navigate,
    openSnackbar,
    setOpenSnackbar,
    message,
    openDialog,
    setOpenDialog,
    showMessage,
    hasCartItems,
    isValidDates,
    isValidQuantity,
    canConfirm,
    today,
  } = useProductDetail();

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <ProductDetailError message={error} />;
  if (!product) return <ProductDetailNotFound />;

  return (
    <div className="flex flex-col gap-6 animate-slide-up">
      <button
        onClick={() => navigate("/")}
        className="flex w-fit items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-brand-700"
      >
        <ArrowBackIcon fontSize="small" />
        Volver a productos
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft md:p-6">
          <div className="mb-4 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            Producto premium
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {product.displayName}
          </h1>

          <AppImageCarousel
            images={product.mediaUrls}
            alt={product.displayName}
          />
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
              Total estimado: ${rental.total.toLocaleString()}
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
