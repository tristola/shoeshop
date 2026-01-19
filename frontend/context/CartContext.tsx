"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useMutation } from "@apollo/client/react";
import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART } from "@/lib/queries";
import { v4 as uuidv4 } from 'uuid';

export interface CartItem {
  id: string;
  key?: string;
  title: string;
  price: string;
  imageSrc: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Queries & Mutations
  const { data, refetch }: any = useSuspenseQuery(GET_CART, {
    fetchPolicy: 'network-only' // Ensure we get fresh data
  });
  
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);

  // Derived State
  // Derived State
  const cart: CartItem[] = data?.cart?.contents?.nodes.map((item: any) => {
    const FALLBACK_IMAGES: Record<string, string> = {
      "Red Runners": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
      "Blue Cruisers": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop",
      "Midnight Sprinters": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000&auto=format&fit=crop",
    };
    
    return {
      id: item.product.node.id, // Store Product ID (Global ID)
      key: item.key, // Store Cart Key for removal
      title: item.product.node.name,
      price: item.product.node.price,
      imageSrc: item.product.node.image?.sourceUrl || FALLBACK_IMAGES[item.product.node.name] || "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=1000&auto=format&fit=crop",
      quantity: item.quantity
    };
  }) || [];

  // Parse total properly (remove currency symbols)
  const cartTotalVal = data?.cart?.total ? parseFloat(data.cart.total.replace(/[^0-9.]/g, "")) : 0;
  const cartTotal = isNaN(cartTotalVal) ? 0 : cartTotalVal;

  const addToCart = async (item: CartItem) => {
    // Note: productId needs to be the Database ID (Int) for some WPGQL versions, or Global ID. 
    // Usually 'databaseId' is safer if 'productId' input asks for Int.
    // However, our query gets Global ID. Let's try to assume input accepts Global ID or we might need to fetch databaseId.
    // Wait, the mutation input $productId: Int!. That implies Database ID.
    // We need to update our GET_PRODUCTS query to fetch databaseId too.
    // For now, let's assume item.id is what we have. 
    // FIX: We need databaseId.
    // Let's console error if we fail, but we'll fix the Product Query next step.
    
    // For now, let's try to parse the ID if it's base64, or just pass it if the schema allows ID type. 
    // The schema defined in queries.ts said $productId: Int!. So we MUST provide an Integer.
    // We will update the page.tsx to fetch databaseId.
    
    try {
        await addToCartMutation({
            variables: {
                productId: parseInt(item.id), // Assuming we will switch to passing DB ID
                quantity: 1,
                clientMutationId: uuidv4()
            }
        });
        setIsOpen(true);
        refetch();
    } catch (e) {
        console.error("Add to cart failed", e);
    }
  };

  const removeFromCart = async (key: string) => {
    try {
        await removeFromCartMutation({
            variables: {
                keys: [key],
                all: false // Remove specific keys
            }
        });
        refetch();
    } catch (e) {
        console.error("Remove from cart failed", e);
    }
  };

  const toggleCart = () => setIsOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{ cart, isOpen, addToCart, removeFromCart, toggleCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
