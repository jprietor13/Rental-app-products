import { ProductCard } from "../layout/ProductCard";
import { useProducts } from "../hooks/useProducts";

export const Home = () => {
  const { data, loading, error } = useProducts();
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Productos</h1>

      <div>
        {data.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};
