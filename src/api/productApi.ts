import axios, { isAxiosError } from "axios";

const API_URL = "https://apim-dev-proxy.sodhc.co/test-jasson/api/category";

export const fetchDataProducts = async (signal?: AbortSignal) => {
  try {
    const response = await axios.get(API_URL, { signal });
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error("Error to get data" + err);
    }

    throw err;
  }
};
