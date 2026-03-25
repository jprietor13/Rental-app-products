import { useState } from "react";
import { useCart } from "../context/cartContext";
import { calculateDays, calculateTotal } from "../utils/rentalUtils";
import { generateRentalJSON, downloadJSON } from "../utils/jsonUtils";
import type { Product } from "../models/products";

export const useRental = (product: Product) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(0);

  const { dispatch, state } = useCart();

  const price = product?.prices?.[0]?.price || 0;

  const days = startDate && endDate ? calculateDays(startDate, endDate) : 0;

  const total = days && quantity ? calculateTotal(days, quantity, price) : 0;

  const addToCart = () => {
    dispatch({
      type: "ADD",
      payload: {
        id: product.productId,
        name: product.displayName,
        price,
      },
    });
  };

  const confirmRental = () => {
    if (!startDate || !endDate || quantity <= 0) {
      return { error: "Completa todos los campos correctamente" };
    }

    if (days <= 0) {
      return { error: "Las fechas no son válidas" };
    }

    if (state.items.length === 0) {
      return { error: "El carrito está vacío" };
    }

    const json = generateRentalJSON(state.items, startDate, endDate, days);

    downloadJSON(json);
    dispatch({ type: "CLEAR" });

    return { success: true };
  };

  return {
    startDate,
    endDate,
    quantity,
    setStartDate,
    setEndDate,
    setQuantity,
    days,
    total,
    addToCart,
    confirmRental,
  };
};
