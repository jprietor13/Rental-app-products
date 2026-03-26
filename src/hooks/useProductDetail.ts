import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart/useCart";
import { useProducts } from "./useProducts";
import { useRental } from "./useRental";

export const useProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useProducts();
  const product = data?.find((p) => p.productId === id);

  const rental = useRental(product!);
  const { state: cartState } = useCart();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setOpenSnackbar(true);
  };

  const hasCartItems = cartState.items.length > 0;

  const isValidDates = Boolean(
    rental.startDate && rental.endDate && rental.days > 0,
  );

  const isValidQuantity = rental.quantity > 0;

  const canConfirm = hasCartItems && isValidDates && isValidQuantity;

  const today = new Date().toISOString().split("T")[0];

  return {
    product,
    loading,
    error,
    rental,
    navigate,
    openSnackbar,
    setOpenSnackbar,
    message,
    openDialog,
    setOpenDialog,
    showMessage,
    hasCartItems,
    isValidDates,
    isValidQuantity,
    canConfirm,
    today,
  };
};
