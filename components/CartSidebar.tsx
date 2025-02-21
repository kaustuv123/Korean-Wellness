// src/components/CartSidebar.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Control visibility with a slight delay for smoother animations
  useEffect(() => {
    if (isOpen) {
      // Show the backdrop immediately
      setIsVisible(true);
    } else {
      // Delay hiding the backdrop until after sidebar slide animation completes
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match this to the transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close the sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0"
      } ${isVisible ? "visible" : "invisible"}`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ willChange: "transform", zIndex: 200 }}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" /> Your Cart
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4 overscroll-contain">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="divide-y">
                {items.map((item) => {
                  const { product, quantity } = item;
                  const discountedPrice =
                    product.price -
                    (product.price * (product.discount || 0)) / 100;

                  return (
                    <li key={product.productId} className="py-4">
                      <div className="flex items-start">
                        <div className="relative h-16 w-16 mr-4 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{product.name}</h3>
                            <button
                              onClick={() => removeFromCart(product.productId)}
                              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                              aria-label={`Remove ${product.name} from cart`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <p className="text-sm text-gray-500 mb-2">
                            ${discountedPrice.toFixed(2)}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border rounded">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product.productId,
                                    quantity - 1
                                  )
                                }
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-150"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="px-2 py-1 border-x min-w-8 text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    product.productId,
                                    quantity + 1
                                  )
                                }
                                className={`px-2 py-1 text-gray-600 transition-colors duration-150 ${
                                  quantity >= product.stock
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-100"
                                }`}
                                disabled={quantity >= product.stock}
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-medium">
                              ${(discountedPrice * quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
              </div>
{/* 
              <button
                onClick={() => clearCart()}
                className="w-full mb-2 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Clear Cart
              </button> */}

              <Link
                href="/checkout"
                className="block w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors duration-200"
                onClick={onClose}
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
