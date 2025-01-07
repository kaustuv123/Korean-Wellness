'use client'

import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface ProductCardProps {
  title: string;
  subheading: string;
  description: string;
  price: number;
  reviews: number;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title = "Retinal 0.1% Face Serum",
  subheading = "Mild-Strength Retinal to visibly reduce signs of aging",
  description = "A specialized Vitamin-A derivative (Retinal) along with Bakuchiol, Olive Squalane to reduce fine visible signs of aging. One of the most effective retinal vitamin-A facial skin care, working as quickly as 4 hours at improving elasticity and texture. By encouraging cell turnover, this serum promotes a more youthful, radiant complexion.",
  price = 799,
  reviews = 28,
  rating = 4.8
}) => {
  // Sample product images - in real app these would come from props
  const productImages: ProductImage[] = [
    { id: 1, url: "/image/download.jpeg", alt: "Product main view" },
    { id: 2, url: "/image/download2.jpeg", alt: "Product angle view" },
    { id: 3, url: "/image/download.jpeg", alt: "Product detail view" },
  ];

  const [selectedImage, setSelectedImage] = useState<ProductImage>(productImages[0]);
  const [quantity, setQuantity] = useState<number>(0);
  const [showQuantity, setShowQuantity] = useState<boolean>(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleAddToCart = () => {
    setQuantity(1);
    setShowQuantity(true);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity === 0) {
      setShowQuantity(false);
    }
    setQuantity(Math.max(0, newQuantity));
  };

  const faqs = [
    {
      question: "What Makes It Potent?",
      answer: "Our formula combines clinically proven ingredients at optimal concentrations. The key active ingredients work synergistically to deliver maximum efficacy while maintaining skin tolerance."
    },
    {
      question: "Ideal For",
      answer: "This product is perfect for those dealing with acne concerns, oily skin types, and anyone looking to improve skin texture. It's particularly effective for:• Acne-prone skin\n• Oily skin\n• Combination skin\n• Textural irregularities"
    },
    {
      question: "Clinical Results",
      answer: "In clinical trials, users experienced:\n• 42% reduction in acne lesions after 8 weeks\n• 38% improvement in skin texture\n• 45% reduction in excess oil production"
    },
    {
      question: "How to Use",
      answer: "Apply on cleansed face after your water-based serums, and before moisturizer. Use of sunscreen is highly recommended the next day of using this product.\n\nUse in PM routine only. Start with every alternate day and after 2 weeks of usage, use it everyday."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white mb-10 p-4 md:p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left side - Product Images */}
        <div className="w-full md:w-1/2">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
            <Image 
              src={selectedImage.url}
              alt={selectedImage.alt}
              height={200}
              width={200}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto">
            {productImages.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage.id === image.id ? 'border-black' : 'border-transparent'
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  height={200}
                  width={200}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-semibold mb-2">{title}</h1>

          {/* Reviews */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{rating} • {reviews} Reviews</span>
          </div>

          {/* Subheading */}
          <p className="text-gray-600 mb-4">{subheading}</p>

          {/* Description */}
          <p className="text-gray-700 mb-6">{description}</p>

          {/* Price */}
          {/* <div className="mt-auto"> */}
            <div className="flex items-center mb-4">
              <span className="text-sm text-gray-500">MRP</span>
              <span className="ml-2 text-2xl font-bold">₹{price}</span>
            </div>

            {/* Add to Cart / Quantity Selector */}
            {!showQuantity ? (
              <button
                onClick={handleAddToCart}
                className="w-[200px] items-center md:w-full bg-black text-white py-3  hover:bg-gray-800 transition-colors"
              >
                ADD TO CART
              </button>
            ) : (
              <div className="w-[200px] flex items-center justify-between md:w-full bg-gray-100 p-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <Minus size={20} />
                </button>
                <span className="font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <Plus size={20} />
                </button>
              </div>
            )}

        <div className="max-w-2xl mx-auto my-auto">
            {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200">
                <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full py-4 flex justify-between items-center text-left"
                >
                    <span className="font-medium text-sm md:text-base">{faq.question}</span>
                    {openFAQ === index ? (
                    <Minus className="w-4 h-4 text-gray-600" />
                    ) : (
                    <Plus className="w-4 h-4 text-gray-600" />
                    )}
                </button>

                {/* Answer container */}
                <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96' : 'max-h-0'
                    }`}
                >
                    <div className="pb-4 text-sm text-gray-600 whitespace-pre-line">
                    {faq.answer}
                    </div>
                </div>
                </div>
            ))}
            </div>    
          
        </div>
      </div>
    </div>
  );
};

export default ProductCard;