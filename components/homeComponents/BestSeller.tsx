// components/BestsellerProducts.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/src/types/product";

export default function BestsellerProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, updateQuantity, items } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/products/bestsellers");
        setProducts(response.data.data || []);
      } catch (err: any) {
        setError(
          err.response?.data?.error || "Failed to load bestseller products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  const checkScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons();
      return () =>
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
    }
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth / 2;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const getProductCartCount = (productId: string) => {
    const item = items.find((item) => item.product.productId === productId);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Bestsellers</h2>
        <div className="flex space-x-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-none w-[280px]">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-[280px] rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Bestsellers</h2>

      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {products.map((product) => {
            const cartCount = getProductCartCount(product.productId);

            return (
              <div
                key={product.productId}
                className="flex-none w-[280px] bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="relative h-[280px]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-lg font-semibold hover:text-blue-600 line-clamp-1"
                  >
                    {product.name}
                  </Link>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-lg font-bold">
                      ${product.price.toFixed(2)}
                      {product.discount > 0 && (
                        <span className="ml-2 text-sm text-red-500">
                          -{product.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    {cartCount === 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className={`w-full ${
                          product.stock > 0
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                        } text-white px-4 py-2 rounded text-sm`}
                      >
                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                      </button>
                    ) : (
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            updateQuantity(product.productId, cartCount - 1)
                          }
                          className="px-3 py-2 border border-gray-300 rounded-l bg-gray-100 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 border-t border-b border-gray-300 bg-white">
                          {cartCount}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.productId, cartCount + 1)
                          }
                          disabled={cartCount >= product.stock}
                          className={`px-3 py-2 border border-gray-300 rounded-r ${
                            cartCount >= product.stock
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
