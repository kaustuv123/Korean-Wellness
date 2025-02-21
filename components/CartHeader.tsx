// src/components/CartHeader.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import CartSidebar from "./CartSidebar";
import { motion } from "framer-motion";

const CartHeader: React.FC = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Your Store
          </Link>
          
          <button 
            onClick={toggleSidebar}
            className="relative flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label={`Open cart with ${totalItems} items`}
          >
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>
      </div>
      
      <CartSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
};

export default CartHeader;