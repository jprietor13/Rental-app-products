interface CartEmptyStateProps {
  message?: string;
}

export const CartEmptyState = ({
  message = "Carrito vacio",
}: CartEmptyStateProps) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};
