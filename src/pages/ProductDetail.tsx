import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useRental } from "../hooks/useRental";

export const ProductDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useProducts();
  const product = data?.find((p) => p.productId === id);
  const rental = useRental(product!);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <h1>{product.displayName}</h1>

      {product.mediaUrls.length > 0 && (
        <img src={product.mediaUrls[0]} alt={product.displayName} />
      )}

      <p>Precio por día: ${product.prices?.[0]?.price || 0}</p>

      <input
        type="date"
        onChange={(e) => rental.setStartDate(e.target.value)}
      />

      <input type="date" onChange={(e) => rental.setEndDate(e.target.value)} />

      {rental.startDate && rental.endDate && (
        <input
          type="number"
          min={1}
          onChange={(e) => rental.setQuantity(Number(e.target.value))}
        />
      )}

      {rental.total > 0 && <p>Total: ${rental.total}</p>}

      <button
        onClick={() => {
          rental.addToCart();
          alert("Producto agregado al carrito");
        }}
      >
        Agregar al carrito
      </button>

      <button
        onClick={() => {
          const res = rental.confirmRental();
          if (res?.error) return alert(res.error);
          alert("Alquiler completado correctamente");
        }}
      >
        Confirmar alquiler
      </button>
    </div>
  );
};
