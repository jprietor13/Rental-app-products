import type { ReactNode } from "react";
import { CartDrawer } from "../components/CartDrawer";
import { useCart } from "../hooks/useCart";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { isCartOpen, toggleCart, setIsCartOpen } = useCart();

  return (
    <div className="flex min-h-screen flex-col transition-colors duration-300">
      <Header onToggleCart={toggleCart} />

      <div className="relative">
        <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-24 z-0">
        <div className="mx-auto h-28 w-[92%] rounded-full bg-brand-300/15 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 animate-fade-in">
        {children}
      </main>

      <Footer />
    </div>
  );
};
