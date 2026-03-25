import { Header } from "./Header";
import { CartDrawer } from "../components/CartDrawer";
import { useCart } from "../hooks/useCart";
import type { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { isCartOpen, toggleCart, setIsCartOpen } = useCart();

  return (
    <>
      <Header onToggleCart={toggleCart} />
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {children}
    </>
  );
};
