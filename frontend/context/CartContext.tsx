"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useMutation } from "@apollo/client/react";
import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART } from "@/lib/queries";
import { v4 as uuidv4 } from 'uuid';
import { FALLBACK_IMAGES } from '@/lib/constants';

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
  cartTotal: string;
  refetch: () => void;
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
  const cart: CartItem[] = data?.cart?.contents?.nodes.map((item: any) => {
    
    return {
      id: item.product.node.id, // Store Product ID (Global ID)
      key: item.key, // Store Cart Key for removal
      title: item.product.node.name,
      price: item.product.node.price?.replace(/&nbsp;/g, ' '),
      imageSrc: item.product.node.image?.sourceUrl || FALLBACK_IMAGES[item.product.node.name] || "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=1000&auto=format&fit=crop",
      quantity: item.quantity
    };
  }) || [];

  // Use the formatted total string directly from the server to avoid locale/parsing issues
  const cartTotal = data?.cart?.total?.replace(/&nbsp;/g, ' ') || "$0.00";

  const addToCart = async (item: CartItem) => {
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
                all: false, // Remove specific keys
                clientMutationId: uuidv4()
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
      value={{ cart, isOpen, addToCart, removeFromCart, toggleCart, cartTotal, refetch }}
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
