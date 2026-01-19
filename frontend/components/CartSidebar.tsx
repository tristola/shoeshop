"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export function CartSidebar() {
  const { isOpen, toggleCart, cart, removeFromCart, cartTotal } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform border-l border-white/10 bg-card p-6 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between pb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Your Bag</h2>
            <button
              onClick={toggleCart}
              className="rounded-full p-2 text-muted hover:bg-white/5 hover:text-foreground"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted">
                <p className="mb-4 text-lg">Your bag is empty</p>
                <button
                  onClick={toggleCart}
                  className="text-primary hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-white/10 bg-background/50">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-primary">{item.price}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted">Qty: {item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-white/10 pt-6">
              <div className="mb-4 flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="w-full rounded-full bg-primary py-4 font-bold text-primary-foreground transition-transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
