// app/product/[slug]/page.tsx
"use client";
import { useEffect, useState, use } from "react";
import Image from "next/image";
import axios from "axios";
import { Product } from "@/src/types/product";

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

  const addToCart = () => {
    // Implement your add to cart logic here
    console.log("Adding to cart:", product.productId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
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

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${
                product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}