"use client";

import { useCart } from "@/context/CartContext";

export function Navbar() {
  const { toggleCart, cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="text-2xl font-bold tracking-tighter text-foreground">
          Shoe<span className="text-primary">Shop</span>
        </div>
        
        <button
          onClick={toggleCart}
          className="group relative flex items-center justify-center rounded-full bg-card p-3 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
