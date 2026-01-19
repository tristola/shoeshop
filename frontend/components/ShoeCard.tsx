"use client";

import Image from 'next/image';
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

interface ShoeCardProps {
  id: string;
  title: string;
  price: string;
  imageSrc: string;
  description: string;
}

export function ShoeCard({ id, title, price, imageSrc, description }: ShoeCardProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/20">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
            <p className="mt-1 text-sm text-gray-400 line-clamp-2">{description}</p>
          </div>
          <p className="text-lg font-bold text-primary">{price}</p>
        </div>

        <button 
          onClick={() => addToCart({ id, title, price, imageSrc, quantity: 1 })}
          className="w-full overflow-hidden rounded-xl bg-primary py-3 font-bold text-primary-foreground transition-transform active:scale-95 hover:bg-accent"
        >
          <span className="relative z-10">{t('cart.add')}</span>
        </button>
      </div>
    </div>
  );
}
