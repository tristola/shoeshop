import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import { ShoeCard } from "@/components/ShoeCard";
import Image from "next/image";

// GraphQL Query
const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 10) {
      nodes {
        id
        databaseId
        name
        shortDescription
        image {
          sourceUrl
        }
        ... on SimpleProduct {
          price
        }
      }
    }
  }
`;

export const dynamic = "force-dynamic";

export default async function Home() {
  let products = [];
  try {
    const client = getClient();
    const { data } = await client.query({ query: GET_PRODUCTS });
    products = data?.products?.nodes || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Fallback or empty state handled below
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex h-[70vh] items-center justify-center overflow-hidden">
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
          <h1 className="mb-6 bg-gradient-to-r from-primary via-accent to-purple-400 bg-clip-text text-6xl font-extrabold text-transparent sm:text-8xl">
            STEP INTO THE FUTURE
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-300 sm:text-2xl">
            Experience the ultimate collection of premium running shoes designed for performance and style.
          </p>
          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-accent hover:shadow-[0_0_40px_-10px_rgba(244,114,182,0.5)]">
            <span className="relative z-10">Shop Collection</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Latest Drops</h2>
              <p className="mt-2 text-muted">Fresh styles for your daily run.</p>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product: any) => {
                const FALLBACK_IMAGES: Record<string, string> = {
                  "Red Runners": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
                  "Blue Cruisers": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop",
                  "Midnight Sprinters": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000&auto=format&fit=crop",
                };

                const imageSrc = product.image?.sourceUrl || FALLBACK_IMAGES[product.name] || "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=1000&auto=format&fit=crop";

                return (
                <ShoeCard
                  key={product.id}
                  id={product.databaseId.toString()}
                  title={product.name}
                  price={product.price || "Sold Out"}
                  imageSrc={imageSrc}
                  description={product.shortDescription ? product.shortDescription.replace(/<[^>]*>?/gm, "") : "Premium footwear"}
                />
              )})}
            </div>
          ) : (
            <div className="glass-panel flex min-h-[300px] flex-col items-center justify-center rounded-2xl p-8 text-center">
              <h3 className="mb-2 text-xl font-semibold">No Products Found</h3>
              <p className="text-muted">
                Wait for the database to seed or check back later!
              </p>
              <p className="mt-4 text-xs text-gray-500">
                (Is WordPress running and seeded? Run ./setup.sh)
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
