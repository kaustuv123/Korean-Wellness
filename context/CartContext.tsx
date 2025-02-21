// context/CartContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/src/types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage:", err);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [items]);

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.productId === product.productId
      );

      if (existingItemIndex >= 0) {
        // Product already in cart, update quantity
        const updatedItems = [...prevItems];
        const newQuantity = Math.min(
          updatedItems[existingItemIndex].quantity + 1,
          product.stock
        );

        if (newQuantity <= 0) {
          // Remove item if new quantity is 0 or negative
          return updatedItems.filter((_, index) => index !== existingItemIndex);
        }

        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity,
        };
        return updatedItems;
      } else {
        // Add new product to cart
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.productId !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return prevItems.filter((item) => item.product.productId !== productId);
      }

      return prevItems.map((item) => {
        if (item.product.productId === productId) {
          // Ensure quantity doesn't exceed stock
          const newQuantity = Math.min(quantity, item.product.stock);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };


  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const discountedPrice = 
        item.product.price - (item.product.price * (item.product.discount || 0) / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};