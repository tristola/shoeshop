"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";

export function CartSidebar() {
  const { isOpen, toggleCart, cart, removeFromCart, cartTotal } = useCart();
  const { t } = useLanguage();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-background/80 shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <h2 className="text-xl font-bold uppercase tracking-widest">{t('cart.title')}</h2>
          <button
            onClick={toggleCart}
            aria-label={t('cart.close')}
            className="rounded-full p-3 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-white/5 p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-10 w-10 text-muted-foreground"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium text-muted-foreground">{t('cart.empty')}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.key} className="flex gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    {item.imageSrc && (
                       <Image
                       src={item.imageSrc}
                       alt={item.title}
                       fill
                       className="object-cover"
                     />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-primary">{item.price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-lg bg-white/5 px-2 py-1">
                        <span className="text-xs font-medium text-muted-foreground">Qty: {item.quantity}</span>
                      </div>
                      <button
                        onClick={() => item.key && removeFromCart(item.key)}
                        className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors px-2 py-2 -mr-2"
                        aria-label={`${t('cart.remove')} ${item.title}`}
                      >
                        {t('cart.remove')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between text-lg font-bold">
              <span>{t('cart.total')}</span>
              <span>{cartTotal}</span>
            </div>
            <Link 
              href="/checkout" 
              onClick={toggleCart}
              className="block w-full rounded-xl bg-primary py-4 text-center font-bold text-primary-foreground transition-transform hover:scale-[1.02] hover:bg-accent hover:shadow-lg active:scale-95"
            >
              {t('cart.checkout')}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
