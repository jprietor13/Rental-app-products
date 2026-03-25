import { useState } from "react";
import { useCart } from "../context/cart/useCart";

export const useCartDrawer = () => {
  const { state, dispatch } = useCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === state.items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(state.items.map((item) => item.id));
    }
  };

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE", payload: id });
    setSelectedItems((prev) => prev.filter((i) => i !== id));
  };

  const handleRemoveSelected = () => {
    dispatch({ type: "REMOVE_MANY", payload: selectedItems });
    setSelectedItems([]);
  };

  const handleClearAll = () => {
    dispatch({ type: "CLEAR" });
    setSelectedItems([]);
  };

  const calculateTotal = () => {
    return state.items.reduce((acc: number, item) => {
      const raw = String(item.price);
      return acc + (Number(raw.replace(/\./g, "").replace(",", ".")) || 0);
    }, 0);
  };

  const isAllSelected =
    selectedItems.length === state.items.length && state.items.length > 0;
  const hasSelectedItems = selectedItems.length > 0;
  const isEmpty = state.items.length === 0;

  return {
    state,
    selectedItems,
    isEmpty,
    isAllSelected,
    hasSelectedItems,
    total: calculateTotal(),
    toggleSelect,
    handleSelectAll,
    handleRemove,
    handleRemoveSelected,
    handleClearAll,
  };
};
