import { useState } from "react";

export const useCart = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return {
    isCartOpen,
    toggleCart,
    setIsCartOpen,
  };
};
