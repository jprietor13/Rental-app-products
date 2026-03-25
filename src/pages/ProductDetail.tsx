import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export const ProductDetail = () => {
  const { id } = useParams();
  const { data } = useProducts();

  const product = data?.find((p) => p.productId === id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <h1>{product.displayName}</h1>
      {product.mediaUrls.length > 0 && (
        <img
          src={product.mediaUrls[0]}
          alt={product.displayName}
          style={{ width: "100%", height: "auto" }}
        />
      )}
      <p>Precio: ${product.prices[0].price}</p>
    </div>
  );
};
