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
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <h2>{product.displayName}</h2>
      {product.mediaUrls.length > 0 && (
        <img
          src={product.mediaUrls[0]}
          alt={product.displayName}
          style={{ width: "50", height: "auto" }}
        />
      )}
      <p>Precio: ${product.prices[0].price}</p>
    </div>
  );
};
