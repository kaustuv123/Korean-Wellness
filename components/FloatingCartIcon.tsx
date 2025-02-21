import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

// Define the props type
interface FloatingCartIconProps {
  onClick: () => void;
  isSidebarOpen: boolean;
}

const FloatingCartIcon: React.FC<FloatingCartIconProps> = React.memo(({ onClick, isSidebarOpen }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div
      className={`fixed bottom-4 right-4 bg-eggPlant p-4 rounded-full shadow-lg cursor-pointer transition-opacity duration-300 ${
        isSidebarOpen ? "opacity-0" : "opacity-100"
      }`}
      onClick={onClick}
      style={{ zIndex: 100 }}
    >
      <FaCartShopping className="text-white text-3xl" />
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
        >
          {totalItems}
        </motion.span>
      )}
    </div>
  );
});

export default FloatingCartIcon; 