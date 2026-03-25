import { useNavigate } from "react-router-dom";
import type { Product } from "../models/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.productId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex cursor-pointer flex-col gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
    >
      <span className="absolute right-3 top-3 rounded-md bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand-700">
        Destacado
      </span>

      {product.mediaUrls.length > 0 && (
        <div className="flex h-44 w-full justify-center overflow-hidden rounded-xl bg-slate-100">
          <img
            src={product.mediaUrls[0]}
            alt={product.displayName}
            className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <h2 className="line-clamp-2 text-base font-semibold text-slate-800 transition-colors duration-300 group-hover:text-brand-700">
        {product.displayName}
      </h2>

      <p className="text-xl font-bold text-slate-900">
        ${product.prices[0].price}
        <span className="ml-1 text-xs font-medium text-slate-500">/ dia</span>
      </p>

      <button
        type="button"
        className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-brand-700"
      >
        Ver detalle
      </button>
    </div>
  );
};
