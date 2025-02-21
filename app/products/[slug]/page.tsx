// app/product/[slug]/page.tsx
"use client";
import { useEffect, useState, use } from "react";
import Image from "next/image";
import axios from "axios";
import { Product } from "@/src/types/product";
import { useCart } from "@/context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, updateQuantity, items } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${resolvedParams.slug}`);
        setProduct(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch product");
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams.slug]);

  // Check if product is already in cart
  const isInCart = product && items.some(item => item.product.productId === product.productId);
  const itemInCart = product ? items.find(item => item.product.productId === product.productId) : null;
  const cartQuantity = itemInCart?.quantity || 0;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse bg-white rounded-lg shadow-lg p-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
            </div>
            <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-24 bg-gray-200 rounded mb-6"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
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

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleIncreaseQuantity = () => {
    if (product && cartQuantity < product.stock) {
      updateQuantity(product.productId, cartQuantity + 1);
      toast.success(`Added another ${product.name} to cart`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleDecreaseQuantity = () => {
    if (product && cartQuantity > 0) {
      updateQuantity(product.productId, cartQuantity - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image Slider */}
          <div className="md:w-1/2 relative">
            <div className="aspect-square relative">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentImageIndex === index
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
            {/* Thumbnail Navigation */}
            <div className="mt-4 flex gap-2 px-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden ${
                    currentImageIndex === index ? "ring-2 ring-blue-600" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="mb-6">
              <span className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="ml-2 text-red-500">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Stock Status */}
            <div className="mb-6">
              <p
                className={`font-semibold ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </p>
            </div>

            {/* Attributes */}
            {Object.entries(product.attributes).length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Specifications</h2>
                <dl className="grid grid-cols-1 gap-2">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div key={key} className="flex">
                      <dt className="font-medium text-gray-600 w-1/3">
                        {key}:
                      </dt>
                      <dd className="text-gray-800">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Cart Controls */}
            {product.stock > 0 && (
              <div className="mb-6">
                {!isInCart ? (
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 px-6 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={handleDecreaseQuantity}
                      className="px-4 py-3 border border-gray-300 rounded-l-lg bg-gray-100 hover:bg-gray-200 text-xl font-bold"
                    >
                      -
                    </button>
                    <span className="px-8 py-3 border-t border-b border-gray-300 bg-white font-semibold text-lg">
                      {cartQuantity}
                    </span>
                    <button 
                      onClick={handleIncreaseQuantity}
                      disabled={cartQuantity >= product.stock}
                      className={`px-4 py-3 border border-gray-300 rounded-r-lg text-xl font-bold ${
                        cartQuantity >= product.stock 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                        : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Out of Stock Button */}
            {product.stock === 0 && (
              <button
                disabled
                className="w-full py-3 px-6 rounded-lg text-white font-semibold bg-gray-400 cursor-not-allowed"
              >
                Out of Stock
              </button>
            )}

            {/* Show current cart status for this item */}
            {isInCart && (
              <p className="mt-3 text-sm text-gray-600 text-center">
                {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'} in your cart
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}