import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { CartProvider } from "../../context/cart/cartContext";

export const renderWithCart = <T,>(hook: () => T) => {
  return renderHook(hook, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    ),
  });
};
