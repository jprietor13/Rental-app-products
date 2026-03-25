import { ProductCard } from "../layout/ProductCard";
import { useProducts } from "../hooks/useProducts";

export const Home = () => {
  const { data, loading, error } = useProducts();
  if (loading)
    return (
      <div className="flex flex-col gap-6 animate-fade-in">
        <section className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 p-6 text-white shadow-lift">
          <div className="skeleton h-7 w-44 rounded-md bg-white/25" />
          <div className="mt-3 skeleton h-4 w-72 rounded-md bg-white/20" />
        </section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft"
            >
              <div className="skeleton h-40 w-full rounded-xl" />
              <div className="mt-3 skeleton h-4 w-5/6 rounded-md" />
              <div className="mt-2 skeleton h-4 w-2/3 rounded-md" />
              <div className="mt-4 skeleton h-7 w-1/3 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  if (error)
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 shadow-soft">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <section className="rounded-2xl bg-gradient-to-r from-brand-800 to-brand-600 px-6 py-7 text-white shadow-lift">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">
          ecommerce de alquiler
        </p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Productos destacados para tus proyectos
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-50/95 sm:text-base">
          Equipos confiables, entrega rapida y control total desde tu carrito.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};
