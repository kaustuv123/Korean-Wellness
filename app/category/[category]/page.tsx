// app/category/[category]/page.tsx
"use client";
import { useEffect, useState, use } from "react"; // Add 'use' import
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Product } from "@/src/types/product";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>; // Update type to Promise
}) {
  const resolvedParams = use(params); // Unwrap params
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, [resolvedParams.category]); // Update dependency

  // Rest of your component code remains exactly the same
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
      <h1 className="text-3xl font-bold mb-8">
        {decodeURIComponent(resolvedParams.category)}
      </h1>
      <div className="space-y-6">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 relative aspect-square">
                <Link href={`/product/${product.slug}`}>
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
                  href={`/product/${product.slug}`}
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
                  <button
                    onClick={() =>
                      console.log("Add to cart:", product.productId)
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
