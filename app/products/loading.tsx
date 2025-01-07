import React from 'react';

// Define interfaces for our skeleton arrays
interface SkeletonArrays {
  thumbnails: number[];
  stars: number[];
  faqs: number[];
}

const ProductDetailLoading: React.FC = () => {
  // Initialize skeleton arrays
  const skeletonArrays: SkeletonArrays = {
    thumbnails: Array(3).fill(0), // For the thumbnail gallery
    stars: Array(5).fill(0), // For the rating stars
    faqs: Array(4).fill(0), // For the FAQ section
  };

  return (
    <div className="max-w-6xl mx-auto bg-white mb-10 p-4 md:p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left side - Product Images */}
        <div className="w-full md:w-1/2">
          {/* Main Image Skeleton */}
          <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4 animate-pulse" />
          
          {/* Thumbnail Gallery Skeleton */}
          <div className="flex gap-2 overflow-x-auto">
            {skeletonArrays.thumbnails.map((_, index) => (
              <div
                key={`thumb-${index}`}
                className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Title Skeleton */}
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />

          {/* Reviews Skeleton */}
          <div className="flex items-center mb-4">
            <div className="flex items-center gap-1">
              {skeletonArrays.stars.map((_, index) => (
                <div
                  key={`star-${index}`}
                  className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
            <div className="ml-2 h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Subheading Skeleton */}
          <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse mb-4" />

          {/* Description Skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Price Section Skeleton */}
          <div className="flex items-center mb-4">
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse mr-2" /> {/* MRP text */}
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" /> {/* Price */}
          </div>

          {/* Add to Cart Button Skeleton */}
          <div className="w-[200px] md:w-full h-12 bg-gray-200 rounded animate-pulse mb-8" />

          {/* FAQ Section Skeleton */}
          <div className="max-w-2xl mx-auto">
            {skeletonArrays.faqs.map((_, index) => (
              <div 
                key={`faq-${index}`}
                className="border-b border-gray-200 py-4"
              >
                {/* FAQ Question Skeleton */}
                <div className="flex justify-between items-center">
                  <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                </div>
                
                {/* FAQ Answer Skeleton - Collapsed state */}
                {index === 0 && ( // Show only for the first FAQ to mimic open state
                  <div className="mt-4 space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailLoading;