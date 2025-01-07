import React from 'react';
import Image from 'next/image';

// Define our Product interface
interface Product {
  id: number;
  name: string;
  category: string;
  rating: number;
  originalPrice: number;
  discount: number;
  image: string;
}

// Props interface for our component
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Add a safety check at the beginning of the component
  if (!product) {
    return null; // Return early if no product data is available
  }

  // Destructure the product properties with default values
  const {
    name = '',
    category = '',
    rating = 0,
    originalPrice = 0,
    discount = 0,
    image = ''
  } = product;

  // Calculate the discounted price with safety checks
  const calculateDiscountedPrice = (price: number, discountPercent: number) => {
    if (!price || !discountPercent) return price;
    const discountAmount = (price * discountPercent) / 100;
    return Math.round(price - discountAmount);
  };

  // Calculate the final price
  const finalPrice = calculateDiscountedPrice(originalPrice, discount);

  // Render stars with error handling
  const renderStars = (starRating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <span 
        key={index} 
        className={`text-sm ${index < starRating ? 'text-yellow-400' : 'text-gray-200'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="w-[280px] bg-white rounded-lg shadow-sm">
      {/* Image container with error handling */}
      <div className="relative w-full h-[280px] bg-gray-50">
        {/* {discount > 0 && (
          <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            -{discount}%
          </div>
        )} */}
        <Image
          src={image || '/placeholder.jpg'} // Fallback image path
          alt={name || 'Product image'}
          fill
          className="object-contain p-4"
        />
      </div>

      {/* Content container */}
      <div className="p-4">
        {/* Product name with fallback */}
        <h3 className="font-medium text-sm md:text-base mb-1 line-clamp-2">
          {name || 'Product Name'}
        </h3>
        
        {/* Category with fallback */}
        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
          {category || 'Category'}
        </p>
        
        {/* Rating stars */}
        <div className="flex items-center mb-3">
          {renderStars(rating)}
        </div>
        
        {/* Price section */}
        <div className="flex items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">
              ₹{finalPrice}
            </span>
            {originalPrice > 0 && (
              <span className="text-gray-500 line-through text-sm">
                ₹{originalPrice}
              </span>
            )}
            {discount > 0 && (
              <span className="text-green-600 text-sm">
                {discount}% off
              </span>
            )}
          </div>
        </div>
        
        {/* Add to cart button */}
        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors text-sm">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;