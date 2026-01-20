"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { toggleCart, cart } = useCart();
  const { t } = useLanguage();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-foreground">
            <Image 
              src="/icon.png" 
              alt="ShoeShop Logo" 
              width={40} 
              height={40} 
              className="rounded-lg object-contain"
              priority
            />
            <span>SHOE<span className="text-primary">SHOP</span></span>
          </a>
          <div className="hidden md:flex md:gap-6">
            <Link href="/posts" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.news')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            onClick={toggleCart}
            aria-label={t('nav.cart')}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10 min-h-[44px]"
          >
            <span>{t('nav.cart')}</span>
            <div className="relative">
              <svg
                className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
