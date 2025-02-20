'use client'

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface CategoryItem {
  id: number;
  title: string;
  image: string;
  link: string;
}

const ShopByCategory = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const categories: CategoryItem[] = [
    {
      id: 1,
      title: "Skin",
      image: "/image/skin.jpeg",
      link: "/category/skin"
    },
    {
      id: 2,
      title: "Hair",
      image: "/image/hair.jpeg",
      link: "/category/hair"
    },
    {
      id: 3,
      title: "Bath & Body",
      image: "/image/body.jpeg",
      link: "/category/body"
    },
    {
      id: 4,
      title: "Lip",
      image: "/image/lip.jpeg",
      link: "/category/lip"
    },
    {
      id: 5,
      title: "Eye",
      image: "/image/eye.jpeg",
      link: "/category/eye"
    },
  ];

  return (
    <div className="w-full px-4 py-8 md:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      
      {/* Container with scroll buttons */}
      <div className="relative group">
        {/* Left scroll button */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 hidden group-hover:block bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-none w-64 md:w-72 snap-start"
            >
              <a 
                href={category.link}
                className="block group/item"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-black/40 z-10">
                    <h3 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold group-hover/item:underline">
                      {category.title} Care
                    </h3>
                  </div>
                  <Image
                    src={category.image}
                    width={200}
                    height={200}
                    alt={`${category.title} category`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
                  />
                </div>
                <p className="mt-2 text-center font-medium group-hover/item:underline">
                  {category.title}
                </p>
              </a>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 hidden group-hover:block bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ShopByCategory;