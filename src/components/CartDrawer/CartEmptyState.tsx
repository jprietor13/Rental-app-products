interface CartEmptyStateProps {
  message?: string;
}

export const CartEmptyState = ({
  message = "Carrito vacio",
}: CartEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-10">
      <div className="text-5xl opacity-60">🛒</div>

      <p className="text-lg font-medium text-gray-700">{message}</p>

      <span className="text-sm text-gray-500">
        Agrega productos para comenzar tu alquiler
      </span>
    </div>
  );
};
