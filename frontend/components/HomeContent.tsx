"use client";

import Image from "next/image";
import { ShoeCard } from "@/components/ShoeCard";
import { useLanguage } from "@/context/LanguageContext";

import { useState } from "react";
import { FALLBACK_IMAGES } from "@/lib/constants";

export function HomeContent({ products }: { products: any[] }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'New Arrivals'|'Men' | 'Women' | 'all'>('New Arrivals');

  const filteredProducts = products.filter(product => {
    if (activeCategory === 'all') return true;
    return product.productCategories?.nodes?.some((cat: any) => cat.name === activeCategory);
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden py-20">
        {/* ... (Hero Content) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2670&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover opacity-40 brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <h1 className="animate-text-shine mb-4 bg-gradient-to-r from-[#38bdf8] via-[#a855f7] via-[#f472b6] via-white via-[#f472b6] via-[#a855f7] to-[#38bdf8] bg-clip-text text-6xl font-black tracking-tighter text-transparent sm:text-8xl md:text-9xl leading-[1.1]">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl md:text-2xl px-4">
            {t('hero.subtitle')}
          </p>
          <button 
            onClick={() => {
              setActiveCategory('all');
              document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-10 py-4 font-bold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-accent hover:shadow-[0_0_40px_-10px_rgba(244,114,182,0.5)] active:scale-95"
          >
            <span className="relative z-10">{t('hero.cta')}</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products-section" className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                {activeCategory === 'all' ? t('products.titles.all') :
                 activeCategory === 'New Arrivals' ? t('products.titles.new') :
                 activeCategory === 'Men' ? t('products.titles.men') :
                 t('products.titles.women')}
              </h2>
              <p className="mt-4 text-base text-muted md:text-lg">{t('products.subtitle')}</p>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="flex w-full space-x-2 overflow-x-auto rounded-2xl bg-white/5 p-1.5 backdrop-blur-sm scrollbar-hide md:w-auto">
                {[
                  { id: 'New Arrivals', label: t('products.categories.new') },
                  { id: 'Men', label: t('products.categories.men') },
                  { id: 'Women', label: t('products.categories.women') },
                  { id: 'all', label: t('products.categories.all') },
                ].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id as any)}
                    className={`whitespace-nowrap rounded-xl px-6 py-3 text-sm font-bold transition-all min-h-[44px] flex items-center justify-center flex-1 md:flex-none ${
                      activeCategory === category.id
                        ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20"
                        : "text-muted hover:bg-white/10 hover:text-foreground"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const imageSrc = product.image?.sourceUrl || FALLBACK_IMAGES[product.name] || "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=1000&auto=format&fit=crop";

                return (
                <ShoeCard
                  key={product.id}
                  id={product.databaseId.toString()}
                  title={product.name}
                  price={product.price?.replace(/&nbsp;/g, ' ') || t('products.sold_out')}
                  imageSrc={imageSrc}
                  description={product.shortDescription ? product.shortDescription.replace(/<[^>]*>?/gm, "") : "Premium footwear"}
                />
              )})}
            </div>
          ) : (
            <div className="glass-panel flex min-h-[300px] flex-col items-center justify-center rounded-2xl p-8 text-center">
              <h3 className="mb-2 text-xl font-semibold">{t('products.empty_title')}</h3>
              <p className="text-muted">
                {t('products.empty_desc')}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
