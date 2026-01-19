"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
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
  checkoutUrl: string | null;
  refetch: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function MockCartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, key: uuidv4(), quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (key: string) => {
    setCart(prev => prev.filter(item => item.key !== key));
  };

  const toggleCart = () => setIsOpen(prev => !prev);
  
  const totalNum = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + (price * item.quantity);
  }, 0);
  
  const cartTotal = `$${totalNum.toFixed(2)}`;

  return (
    <CartContext.Provider value={{ cart, isOpen, addToCart, removeFromCart, toggleCart, cartTotal, checkoutUrl: null, refetch: () => {} }}>
      {children}
    </CartContext.Provider>
  );
}

export function RealCartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Queries & Mutations
  const { data, refetch, error }: any = useQuery(GET_CART, {
    fetchPolicy: 'network-only',
    ssr: false // Skip on server-side to avoid build issues with local WordPress
  });

  if (error) {
    console.error("Cart fetch failed", error);
  }
  
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

  const cartTotal = data?.cart?.total?.replace(/&nbsp;/g, ' ') || "$0.00";
  const wordPressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8080';
  const rawCheckoutUrl = data?.cart?.checkoutUrl || null;
  const checkoutUrl = rawCheckoutUrl?.startsWith('/') 
    ? `${wordPressUrl}${rawCheckoutUrl}`
    : rawCheckoutUrl || `${wordPressUrl}/checkout/`;

  const addToCart = async (item: CartItem) => {
    try {
        await addToCartMutation({
            variables: {
                productId: parseInt(item.id), 
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
                all: false, 
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
    <CartContext.Provider value={{ cart, isOpen, addToCart, removeFromCart, toggleCart, cartTotal, checkoutUrl, refetch }}>
      {children}
    </CartContext.Provider>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const isMockMode = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";
  
  if (isMockMode) {
    return <MockCartProvider>{children}</MockCartProvider>;
  }
  
  return <RealCartProvider>{children}</RealCartProvider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
