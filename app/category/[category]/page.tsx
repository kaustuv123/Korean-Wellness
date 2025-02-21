// app/category/[category]/page.tsx
"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Product } from "@/src/types/product";
import { useCart } from "@/context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, updateQuantity, items } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/products/category/${resolvedParams.category}`
        );
        setProducts(response.data.data || []);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [resolvedParams.category]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  // Get product count in cart for a specific product
  const getProductCartCount = (productId: string) => {
    const item = items.find((item) => item.product.productId === productId);
    return item ? item.quantity : 0;
  };

  const handleIncreaseQuantity = (
    productId: string,
    currentQuantity: number,
    maxStock: number
  ) => {
    if (currentQuantity < maxStock) {
      updateQuantity(productId, currentQuantity + 1);
    }
  };

  const handleDecreaseQuantity = (
    productId: string,
    currentQuantity: number
  ) => {
    if (currentQuantity > 0) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 h-48 rounded-lg" />
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

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8">
        {decodeURIComponent(resolvedParams.category)}
      </h1>
      <div className="space-y-6">
        {products.map((product) => {
          const cartCount = getProductCartCount(product.productId);

          return (
            <div
              key={product.productId}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 relative aspect-square">
                  <Link href={`/products/${product.slug}`}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                </div>
                <div className="md:w-3/4 p-6">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-xl font-semibold hover:text-blue-600"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-bold">
                      ${product.price.toFixed(2)}
                      {product.discount > 0 && (
                        <span className="ml-2 text-sm text-red-500">
                          -{product.discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Cart Controls */}
                    <div className="flex items-center">
                      {cartCount === 0 ? (
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className={`${
                            product.stock > 0
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-400 cursor-not-allowed"
                          } text-white px-4 py-2 rounded`}
                        >
                          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        </button>
                      ) : (
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleDecreaseQuantity(
                                product.productId,
                                cartCount
                              )
                            }
                            className="px-3 py-2 border border-gray-300 rounded-l bg-gray-100 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 border-t border-b border-gray-300 bg-white font-medium">
                            {cartCount}
                          </span>
                          <button
                            onClick={() =>
                              handleIncreaseQuantity(
                                product.productId,
                                cartCount,
                                product.stock
                              )
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
