import React from 'react';

// Define interfaces for our skeleton arrays and any potential props
interface SkeletonArrays {
  products: number[];
  categories: number[];
  steps: number[];
  ratings: number[];
}

const CategoryPageLoading: React.FC = () => {
  // Initialize our skeleton arrays with proper typing
  const skeletonArrays: SkeletonArrays = {
    products: Array(8).fill(0), // Matching your current 8 products
    categories: Array(1).fill(0), // Matching your single category checkbox
    steps: Array(3).fill(0), // Matching your three step checkboxes
    ratings: Array(5).fill(0), // For star rating display
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <aside className="w-full md:w-64 flex-shrink-0">
          {/* Sort Dropdown Skeleton */}
          <div className="mb-8">
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-2" /> 
            <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Categories Section Skeleton */}
          <div className="mb-8">
            <div className="h-7 w-24 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="space-y-2">
              {skeletonArrays.categories.map((_, index) => (
                <div 
                  key={`category-${index}`} 
                  className="flex items-center space-x-2"
                >
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Step Filter Section Skeleton */}
          <div className="mb-8">
            <div className="h-7 w-16 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="space-y-2">
              {skeletonArrays.steps.map((_, index) => (
                <div 
                  key={`step-${index}`} 
                  className="flex items-center space-x-2"
                >
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Type of Product Section Skeleton */}
          <div>
            <div className="h-7 w-32 bg-gray-200 rounded animate-pulse mb-4" />
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <main className="flex-1">
          {/* "Showing X products" Skeleton */}
          <div className="mb-6">
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Product Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skeletonArrays.products.map((_, index) => (
              <div 
                key={`product-${index}`} 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Product Image Skeleton */}
                <div className="relative w-full h-[280px] bg-gray-200 animate-pulse">
                  {/* Discount Badge Skeleton */}
                  <div className="absolute top-2 left-2 h-6 w-12 bg-gray-300 rounded animate-pulse" />
                </div>

                {/* Product Content Skeleton */}
                <div className="p-4 space-y-4">
                  {/* Title Skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                  </div>

                  {/* Category Skeleton */}
                  <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />

                  {/* Rating Skeleton */}
                  <div className="flex gap-1">
                    {skeletonArrays.ratings.map((_, i) => (
                      <div 
                        key={`rating-${index}-${i}`}
                        className="h-4 w-4 bg-gray-200 rounded animate-pulse" 
                      />
                    ))}
                  </div>

                  {/* Price Skeleton */}
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>

                  {/* Button Skeleton */}
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPageLoading;