import axios, { isAxiosError } from "axios";
import type { Product } from "../models/products";

const API_URL = "https://apim-dev-proxy.sodhc.co/test-jasson/api/category";

export const fetchDataProducts = async (
  signal?: AbortSignal,
): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL, { signal });
    const products: Product[] = response.data?.data?.results ?? [];
    return products;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error("Error to get data" + err);
    }

    throw err;
  }
};
