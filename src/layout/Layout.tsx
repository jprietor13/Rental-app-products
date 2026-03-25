import { Header } from "./Header";
import { CartDrawer } from "../components/CartDrawer";
import { useCart } from "../hooks/useCart";
import type { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { isCartOpen, toggleCart, setIsCartOpen } = useCart();

  return (
    <>
      <div className="min-h-screen bg-gray-50 transition-colors duration-300">
        <Header onToggleCart={toggleCart} />

        <div className="relative">
          <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
          {children}
        </main>
      </div>
    </>
  );
};
