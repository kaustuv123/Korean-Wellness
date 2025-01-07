'use client'

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

// Define interface for the product data structure
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

interface ProductShowcaseProps {
  className?: string;
}

// Sample product data with proper typing
const products: Product[] = [
  {
    id: 1,
    name: 'Salicylic Acid + LHA 2% Cleanser',
    category: 'Acne, Breakouts & Oiliness',
    rating: 4,
    originalPrice: 299,
    discountedPrice: 284,
    image: "/image/download.jpeg",
    discount: 5
  },
  {
    id: 2,
    name: 'SPF 50 Sunscreen',
    category: 'Sun protection, UV exposure / damage',
    rating: 4,
    originalPrice: 399,
    discountedPrice: 379,
    image: "/image/download.jpeg",
    discount: 5
  },
  {
    id: 3,
    name: 'Salicylic Acid 2% Face Serum',
    category: 'Acne, Oily Skin, Blackheads & Irritation',
    rating: 4,
    originalPrice: 549,
    discountedPrice: 521,
    image: "/image/download.jpeg",
    discount: 5
  },
  {
    id: 4,
    name: 'Salicylic Acid 2% Face Serum',
    category: 'Acne, Oily Skin, Blackheads & Irritation',
    rating: 4,
    originalPrice: 549,
    discountedPrice: 521,
    image: "/image/download.jpeg",
    discount: 5
  },
  {
    id: 5,
    name: 'Salicylic Acid 2% Face Serum',
    category: 'Acne, Oily Skin, Blackheads & Irritation',
    rating: 4,
    originalPrice: 549,
    discountedPrice: 521,
    image: "/image/download.jpeg",
    discount: 5
  },
  {
    id: 6,
    name: 'Salicylic Acid 2% Face Serum',
    category: 'Acne, Oily Skin, Blackheads & Irritation',
    rating: 4,
    originalPrice: 549,
    discountedPrice: 521,
    image: "/image/download.jpeg",
    discount: 5
  },
  {
    id: 7,
    name: 'Salicylic Acid 2% Face Serum',
    category: 'Acne, Oily Skin, Blackheads & Irritation',
    rating: 4,
    originalPrice: 549,
    discountedPrice: 521,
    image: "/image/download.jpeg",
    discount: 5
  },
  {
    id: 8,
    name: 'Vitamin C 10% Face Serum',
    category: 'Dullness, Spots & Loss of Elasticity',
    rating: 4,
    originalPrice: 699,
    discountedPrice: 664,
    image: "/image/download.jpeg",
    discount: 5
  }
];

const NewLaunches: React.FC<ProductShowcaseProps> = ({ className }) => {
    // Refs and state management
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [scrollLeft, setScrollLeft] = useState<number>(0);
    const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
    const [showRightButton, setShowRightButton] = useState<boolean>(true);
  
    // Handle scroll position and update navigation button visibility
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    };
  
    // Set up scroll event listener
    useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
        handleScroll();
      }
      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleScroll);
        }
      };
    }, []);
  
    // Handle navigation button clicks
    const scroll = (direction: 'left' | 'right') => {
      if (!scrollContainerRef.current) return;
  
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
  
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    };
  
    // Handle drag/swipe interactions
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
      setIsDragging(true);
      const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
      
      if (scrollContainerRef.current) {
        setStartX(pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
      }
    };
  
    const handleDragMove = (e: React.MouseEvent | React.TouchEvent): void => {
      if (!isDragging || !scrollContainerRef.current) return;
      e.preventDefault();
      
      const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
      const x = pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };
  
    const handleDragEnd = (): void => {
      setIsDragging(false);
    };
  
    // Render star rating
    // const renderStars = (rating: number): JSX.Element[] => {
    //   const stars: JSX.Element[] = [];
    //   for (let i = 0; i < 5; i++) {
    //     if (i < Math.floor(rating)) {
    //       stars.push(<Star key={i} className="w-4 h-4 fill-current text-yellow-400" />);
    //     } else if (i === Math.floor(rating) && rating % 1 !== 0) {
    //       stars.push(<StarHalf key={i} className="w-4 h-4 fill-current text-yellow-400" />);
    //     } else {
    //       stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
    //     }
    //   }
    //   return stars;
    // };
  
    return (
        <div className={`relative w-full max-w-[1400px] mx-auto px-4 md:px-6 ${className || ''} pb-`}>
          <div className='text-2xl font-bold mb-6 my-16'>
              New Launches
          </div>
          {/* Navigation buttons remain the same... */}
          {showLeftButton && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
  
          {showRightButton && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
              aria-label="Next items"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
  
          {/* Product Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-20"
            style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="flex-none w-[280px] min-w-[280px] snap-start bg-white rounded-lg"
              >
                <ProductCard key={product.id} product={product} />
              </div>
            ))}
          </div>
        </div>
      );
  };
  
  export default NewLaunches;