import { useState } from "react";
import { useCart } from "../context/cart/useCart";
import type { Product } from "../models/products";
import { downloadJSON, generateRentalJSON } from "../utils/jsonUtils";
import { calculateDays, calculateTotal } from "../utils/rentalUtils";

export const useRental = (product: Product) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [prevItemsLength, setPrevItemsLength] = useState(0);

  const { dispatch, state } = useCart();

  const rawPrice = String(product?.prices?.[0]?.price ?? 0);
  const price = Number(rawPrice.replace(/\./g, "").replace(",", ".")) || 0;

  if (state.items.length !== prevItemsLength) {
    if (prevItemsLength > 0 && state.items.length === 0) {
      setStartDate("");
      setEndDate("");
      setQuantity(0);
    }
    setPrevItemsLength(state.items.length);
  }

  const cartPriceSum = state.items.reduce((acc, item) => {
    const raw = String(item.price);
    return acc + (Number(raw.replace(/\./g, "").replace(",", ".")) || 0);
  }, 0);

  const days = startDate && endDate ? calculateDays(startDate, endDate) : 0;

  const total =
    days && quantity ? calculateTotal(days, quantity, cartPriceSum) : 0;

  const addToCart = () => {
    dispatch({
      type: "ADD",
      payload: {
        id: product.productId,
        image: product.mediaUrls[0] || "",
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

    const json = generateRentalJSON(
      state.items,
      startDate,
      endDate,
      days,
      quantity,
    );

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
