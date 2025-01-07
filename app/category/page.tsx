import ProductCard from '@/components/ProductCard';
import React from 'react';

interface Product {
    id: number;
    name: string;
    category: string;
    rating: number;
    originalPrice: number;
    discountedPrice: number;
    image: string;
    discount: number;
  }
  
//   interface ProductShowcaseProps {
//     className?: string;
//   }
  
  // Sample product data with proper typing
  const products: Product[] = [
    {
      id: 1,
      name: 'Salicylic Acid + LHA 2% Cleanser',
      category: 'Acne, Breakouts & Oiliness',
      rating: 4,
      originalPrice: 299,
      discountedPrice: 284,
      image: "/image/download2.jpeg",
      discount: 5
    },
    {
      id: 2,
      name: 'SPF 50 Sunscreen',
      category: 'Sun protection, UV exposure / damage',
      rating: 4,
      originalPrice: 399,
      discountedPrice: 379,
      image: "/image/download2.jpeg",
      discount: 5
    },
    {
      id: 3,
      name: 'Salicylic Acid 2% Face Serum',
      category: 'Acne, Oily Skin, Blackheads & Irritation',
      rating: 4,
      originalPrice: 549,
      discountedPrice: 521,
      image: "/image/download2.jpeg",
      discount: 5
    },
    {
      id: 4,
      name: 'Salicylic Acid 2% Face Serum',
      category: 'Acne, Oily Skin, Blackheads & Irritation',
      rating: 4,
      originalPrice: 549,
      discountedPrice: 521,
      image: "/image/download2.jpeg",
      discount: 5
    },
    {
      id: 5,
      name: 'Salicylic Acid 2% Face Serum',
      category: 'Acne, Oily Skin, Blackheads & Irritation',
      rating: 4,
      originalPrice: 549,
      discountedPrice: 521,
      image: "/image/download2.jpeg",
      discount: 5
    },
    {
      id: 6,
      name: 'Salicylic Acid 2% Face Serum',
      category: 'Acne, Oily Skin, Blackheads & Irritation',
      rating: 4,
      originalPrice: 549,
      discountedPrice: 521,
      image: "/image/download2.jpeg",
      discount: 5
    },
    {
      id: 7,
      name: 'Salicylic Acid 2% Face Serum',
      category: 'Acne, Oily Skin, Blackheads & Irritation',
      rating: 4,
      originalPrice: 549,
      discountedPrice: 521,
      image: "/image/download2.jpeg",
      discount: 5
    },
    {
      id: 8,
      name: 'Vitamin C 10% Face Serum',
      category: 'Dullness, Spots & Loss of Elasticity',
      rating: 4,
      originalPrice: 699,
      discountedPrice: 664,
      image: "/image/download2.jpeg",
      discount: 5
    }
  ];

const ProductPage = async () => {

    // const renderRating = (rating: number) => {
    //     return Array(5).fill(0).map((_, index) => (
    //       <span key={index} className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
    //         ★
    //       </span>
    //     ));
    //   };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          {/* Sort Dropdown */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by:
            </label>
            <select className="w-full border border-gray-300 rounded-md py-2 px-3">
              <option>Best selling</option>
              <option>Features</option>
              <option>Price, Low to High</option>
              <option>Price, High to Low</option>
              <option>Alphabetically, A-Z</option>
              <option>Alphabetically, Z-A</option>
              <option>Date, Old to New</option>
              <option>Date, New to Old</option>
            </select>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Category</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Hair (11)</span>
              </label>
            </div>
          </div>

          {/* Step Filter */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Step</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Cleanse (1)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Treat (5)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Nourish (1)</span>
              </label>
            </div>
          </div>

          {/* Type of Product Filter */}
          <div>
            <h2 className="text-lg font-medium mb-4">Type of Product</h2>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-6">
            <p className="text-gray-600">Showing {products.length} products</p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;