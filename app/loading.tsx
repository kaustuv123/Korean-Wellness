import React from 'react';

const LoadingPage = () => {
  // We'll create multiple skeleton cards to mimic the product grid layout
  const skeletonCards = Array(8).fill(0);

  return (
    <div className="p-4">
      {/* Loading header with animated gradient */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded" />
        <div className="h-8 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded" />
      </div>

      {/* Grid of skeleton cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skeletonCards.map((_, index) => (
          <div 
            key={index} 
            className="w-full bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* Image skeleton */}
            <div className="relative w-full h-[280px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
              {/* Discount badge skeleton */}
              <div className="absolute top-2 left-2 h-6 w-12 bg-gray-300 rounded animate-pulse" />
            </div>

            {/* Content skeleton */}
            <div className="p-4 space-y-4">
              {/* Title skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Category skeleton */}
              <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />

              {/* Rating skeleton */}
              <div className="flex gap-1">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>

              {/* Price skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Button skeleton */}
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;