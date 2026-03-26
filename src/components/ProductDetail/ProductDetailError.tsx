interface ProductDetailErrorProps {
  message: string;
}

export const ProductDetailError = ({ message }: ProductDetailErrorProps) => {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 shadow-soft">
      {message}
    </div>
  );
};
