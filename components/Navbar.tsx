"use client";

import { useState } from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { Menu, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  // await new Promise((r) => setTimeout(r, 5000));
  const [user, setUser] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isMobileUserOpen, setIsMobileUserOpen] = useState(false);

  // Enhanced toggle functions with proper state management
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMobileShopOpen) setIsMobileShopOpen(false);
  };
  const toggleMobileShop = () => setIsMobileShopOpen(!isMobileShopOpen);
  const toggleMobileUser = () => setIsMobileUserOpen(!isMobileUserOpen);
  const [activeCategoryMenu, setActiveCategoryMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const shopByConcern = [
    'Acne',
    'Pigmentation',
    'Dehydration',
    'UV Damage',
    'Underarm Darkness',
    'Oiliness',
    'Dullness',
    'Aging'
  ];

  const shopByIngredients = [
    'Vitamin C',
    'BHA / Salicylic Acid',
    'Retinoid / Retinol',
    'Niacinamide',
    'UV Filters',
    'Ceramide'
  ];

  const skinCare = [
    'Cleanse',
    'Tone',
    'Treat',
    'Moisturize',
    'SPF',
    'Under Eye'
  ];

  const bodyCare = [
    'Cleanse',
    'Roll On',
    'Lotion'
  ];

  const categories = {
    "Shop by Concern": shopByConcern,
    "Shop by Ingredients": shopByIngredients,
    "Skin Care": skinCare,
    "Body Care": bodyCare,
  };

  // New functions for category navigation
  const openCategoryMenu = () => {
    setActiveCategoryMenu('categories');
    setIsMobileShopOpen(false);
  };

  const openSubcategories = (category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else if (activeCategoryMenu) {
      setActiveCategoryMenu(null);
    }
  };


  const products = [
    { id: 1, name: "Product 1", image: "/image/download2.jpeg" },
    { id: 2, name: "Product 2", image: "/image/download2.jpeg" },
    { id: 3, name: "Product 3", image: "/image/download2.jpeg" },
    { id: 4, name: "Product 4", image: "/image/download2.jpeg" },
    { id: 5, name: "Product 5", image: "/image/download2.jpeg" },
  ];

  return (
    <nav className="relative">
      <div className="flex justify-around items-center p-4 sm:p-6">
        <Link href='/'>
          <strong className="text-2xl cursor-pointer items-center">
            Korean Wellness
          </strong>
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex justify-between gap-10 text-[20px]">
          <ul className="flex justify-between gap-10 ">
          <li className="group relative inline-block">
            <a className="cursor-pointer pb-1 border-b-2 border-transparent hover:border-black">
              Shop
            </a>

            <div className="invisible group-hover:visible absolute -translate-x-1/2 z-50 pt-4">
              <div className="rounded-md shadow-lg bg-white">
                <div className="flex px-10 py-10">
                  {products.map((product) => (
                    // Each product card becomes its own group for hover effects
                    <div key={product.id} className="flex flex-col gap-5 items-center cursor-pointer group/product">
                      <div className="w-[200px] h-[200px] relative">
                        <Image
                          src={product.image}
                          width={200}
                          height={200}
                          alt={`${product.name} Image`}
                          // Changed to group-hover with product modifier
                          className="w-auto h-[200px] object-cover group-hover/product:scale-105 transition duration-1000"
                        />
                      </div>
                      <div>
                        <p className="text-center border-b-2 border-transparent group-hover/product:border-black transition duration-300">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>

          <li className="group relative inline-block">
            <a className="cursor-pointer pb-1 border-b-2 border-transparent hover:border-black">
              Products
            </a>

            <div className="invisible group-hover:visible absolute left-0 z-50 pt-4 w-[800px] -translate-x-1/4">
              <div className="rounded-md shadow-lg bg-white">
                <div className="grid grid-cols-4 gap-8 p-8">
                  {/* Shop by Concern Column */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-medium text-gray-900 mb-2 cursor-pointer">Shop by Concern</h3>
                    {shopByConcern.map((concern, index) => (
                      <a
                        key={index}
                        className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                      >
                        {concern}
                      </a>
                    ))}
                  </div>

                  {/* Shop by Ingredients Column */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-medium text-gray-900 mb-2 cursor-pointer">Shop by Ingredients</h3>
                    {shopByIngredients.map((ingredient, index) => (
                      <a
                        key={index}
                        className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                      >
                        {ingredient}
                      </a>
                    ))}
                  </div>

                  {/* Skin Care Column */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-medium text-gray-900 mb-2 cursor-pointer">Skin Care</h3>
                    {skinCare.map((item, index) => (
                      <a
                        key={index}
                        className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                      >
                        {item}
                      </a>
                    ))}
                  </div>

                  {/* Body Care and Lip Care Column */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-medium text-gray-900 mb-2 cursor-pointer">Body Care</h3>
                      {bodyCare.map((item, index) => (
                        <a
                          key={index}
                          className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>


            <li className="cursor-pointer pb-1 border-b-2 border-transparent hover:border-black">
              Blog
            </li>
            <li className="cursor-pointer pb-1 border-b-2 border-transparent hover:border-black">
              About
            </li>
          </ul>
        </div>

        {/* Desktop user controls */}
        <div className="hidden md:flex flex-row items-center gap-6">
          {!user ? (
            <button className="bg-eggPlant text-white py-2 px-6 sm:px-10 text-[18px] rounded-full transition-colors">
              Login
            </button>
          ) : (
            <div className="flex items-center gap-8">
              <FaCartShopping className="text-2xl cursor-pointer hover:text-gray-600 transition-colors" />
              <div className="relative group inline-block">
                <div className="inline-flex items-center">
                  <FaUser className="text-2xl cursor-pointer hover:text-gray-600 transition-colors" />
                </div>
                <div className="absolute z-10 w-auto min-w-[120px] pt-2 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <ul className="bg-white rounded-md shadow-lg border py-2 text-center text-[18px]">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors">
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu system */}
      <div className="md:hidden">
        {/* Main mobile menu */}
        <div
          className={`fixed inset-0 bg-white transform transition-all duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0 delay-100" : "-translate-x-full"
          }`}
          style={{ zIndex: 50 }}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-lg font-medium">Menu</span>
            <button 
              onClick={toggleMenu} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="px-4 py-2">
            <li className="py-2 border-b">
              <button
                onClick={toggleMobileShop}
                className="flex items-center justify-between w-full hover:text-gray-600 transition-colors"
              >
                <span>Shop</span>
                {/* <ChevronDown size={20} /> */}
              </button>
            </li>
            <li className="py-2 border-b">
              <button
                onClick={openCategoryMenu}
                className="flex items-center justify-between w-full hover:text-gray-600 transition-colors"
              >
                <span>Products</span>
                <ChevronRight size={20} />
              </button>
            </li>
            <li className="py-2 border-b hover:text-gray-600 transition-colors">Blog</li>
            <li className="py-2 border-b hover:text-gray-600 transition-colors">About</li>
          </ul>

          {/* Mobile user controls */}
          <div className="px-4 py-4 border-t">
            {!user ? (
              <button className="w-full bg-eggPlant  py-2 px-6 text-sm rounded-full hover:bg-[#915063] transition-colors">
                Login
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-around">
                  <FaCartShopping className="text-2xl cursor-pointer hover:text-gray-600 transition-colors" />
                  <button
                    onClick={toggleMobileUser}
                    className="flex items-center gap-2 hover:text-gray-600 transition-colors"
                  >
                    <FaUser className="text-2xl" />
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${
                        isMobileUserOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isMobileUserOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="bg-gray-50 rounded-md p-2">
                    <li className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors text-center">
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shop submenu with enhanced transitions */}
        <div
          className={`fixed inset-0 bg-white transform transition-all duration-500 ease-in-out ${
            isMobileShopOpen ? "translate-x-0 delay-100" : "translate-x-full"
          }`}
          style={{ zIndex: 51 }}
        >
          <div className="sticky top-0 bg-white p-4 border-b z-10">
            <button
              onClick={toggleMobileShop}
              className="flex items-center text-lg hover:text-gray-600 transition-colors"
            >
              <ChevronLeft size={24} className="mr-2" />
              Back
            </button>
          </div>

          <div className="h-[calc(100vh-64px)] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 p-4">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col items-center gap-2">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                  <p className="text-center py-2 hover:text-gray-600 transition-colors">
                    {product.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories menu - Second level */}
        <div
          className={`fixed inset-0 bg-white transform transition-all duration-500 ease-in-out ${
            activeCategoryMenu === 'categories' ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ zIndex: 52 }}
        >
          <div className="sticky top-0 bg-white p-4 border-b z-10">
            <button
              onClick={handleBack}
              className="flex items-center text-lg hover:text-gray-600 transition-colors"
            >
              <ChevronLeft size={24} className="mr-2" />
              Back
            </button>
          </div>

          <ul className="px-4 py-2">
            {Object.keys(categories).map((category) => (
              <li key={category} className="py-2 border-b">
                <button
                  onClick={() => openSubcategories(category)}
                  className="flex items-center justify-between w-full hover:text-gray-600 transition-colors"
                >
                  <span>{category}</span>
                  <ChevronRight size={20} />
                </button>
              </li>
             ))}
             </ul>
           </div>
   
           {/* Subcategories menu - Third level */}
           <div
             className={`fixed inset-0 bg-white transform transition-all duration-500 ease-in-out ${
               selectedCategory ? "translate-x-0" : "translate-x-full"
             }`}
             style={{ zIndex: 53 }}
           >
             <div className="sticky top-0 bg-white p-4 border-b z-10">
               <button
                 onClick={handleBack}
                 className="flex items-center text-lg hover:text-gray-600 transition-colors"
               >
                 <ChevronLeft size={24} className="mr-2" />
                 Back
               </button>
               </div>

                <ul className="px-4 py-2">
                  {selectedCategory && categories[selectedCategory].map((item: string) => (
                    <li key={item} className="py-2 border-b hover:text-gray-600 transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
                </div>  

        {/* Backdrop with fade transition */}
        {(isMenuOpen || isMobileShopOpen || activeCategoryMenu || selectedCategory) && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            style={{ zIndex: 49 }}
            onClick={() => {
              setIsMenuOpen(false);
              setIsMobileShopOpen(false);
              setActiveCategoryMenu(null);
              setSelectedCategory(null);
            }}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;