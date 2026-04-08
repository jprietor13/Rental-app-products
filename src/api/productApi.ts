import { isAxiosError } from "axios";
import { productsMock } from "../mocks/productsMock";
import type { Product } from "../models/products";

export const fetchDataProducts = async (
  signal?: AbortSignal,
): Promise<Product[]> => {
  try {
    void signal;
    return productsMock;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error("Error to get data" + err);
    }

    throw err;
  }
};
