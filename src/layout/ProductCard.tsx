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
      className="cursor-pointer bg-white rounded-xl shadow-soft hover:shadow-lift transition-all duration-300 p-4 flex flex-col gap-3 group hover:-translate-y-1"
    >
      <h2 className="text-base font-semibold text-gray-800 group-hover:text-brand-600 transition-colors duration-300 line-clamp-2">
        {product.displayName}
      </h2>

      {product.mediaUrls.length > 0 && (
        <div className="w-full flex justify-center overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.mediaUrls[0]}
            alt={product.displayName}
            className="h-40 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <p className="text-lg font-bold text-gray-900">
        ${product.prices[0].price}
      </p>
    </div>
  );
};
