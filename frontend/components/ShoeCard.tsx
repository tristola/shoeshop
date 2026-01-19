"use client";

import Image from 'next/image';
import { useCart } from "@/context/CartContext";

interface ShoeCardProps {
  id: string;
  title: string;
  price: string;
  imageSrc: string;
  description: string;
}

export function ShoeCard({ id, title, price, imageSrc, description }: ShoeCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="glass-panel group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      
      <div className="p-6">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground">{title}</h3>
        <p className="mb-4 text-sm text-muted">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{price}</span>
          <button 
            onClick={() => addToCart({ id, title, price, imageSrc, quantity: 1 })}
            className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground cursor-pointer"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
