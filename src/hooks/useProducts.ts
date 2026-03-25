import { useEffect, useState } from "react";
import { fetchDataProducts } from "../api/productApi";
import type { Products } from "../models/products";

export const useProducts = () => {
  const [data, setData] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const products = await fetchDataProducts();
      setData(products);
    } catch (err) {
      setError("Error al cargar los productos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return { data, loading, error };
};
