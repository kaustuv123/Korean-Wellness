"use client";

import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import { Menu, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { userService } from "@/utils/userService";

export function Navbar() {
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const data = await userService.getUserData();
        if (data.success) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
        }
      } catch (error) {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      } finally {
        setIsInitializing(false);
      }
    };
    // console.log("isLoggedIn", isLoggedIn);

    checkLoginStatus();

    const handleLoginStateChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("loginStateChange", handleLoginStateChange);

    return () => {
      window.removeEventListener("loginStateChange", handleLoginStateChange);
    };
  }, []);

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const data = await userService.logout();

      if (data.success) {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        toast.success("Logged out successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  // await new Promise((r) => setTimeout(r, 5000));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isMobileUserOpen, setIsMobileUserOpen] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);

  // Enhanced toggle functions with proper state management
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMobileShopOpen) setIsMobileShopOpen(false);
  };
  const toggleMobileShop = () => setIsMobileShopOpen(!isMobileShopOpen);
  const toggleMobileUser = () => setIsMobileUserOpen(!isMobileUserOpen);
  const [activeCategoryMenu, setActiveCategoryMenu] = useState<string | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null
  );

  const shopByConcern = [
    "Acne",
    "Pigmentation",
    "Dehydration",
    "UV Damage",
    "Underarm Darkness",
    "Oiliness",
    "Dullness",
    "Aging",
  ];

  const shopByIngredients = [
    "Vitamin C",
    "BHA / Salicylic Acid",
    "Retinoid / Retinol",
    "Niacinamide",
    "UV Filters",
    "Ceramide",
  ];

  const skinCare = [
    "Cleanse",
    "Tone",
    "Treat",
    "Moisturize",
    "SPF",
    "Under Eye",
  ];

  const bodyCare = ["Cleanse", "Roll On", "Lotion"];

  const categories = {
    "Shop by Concern": shopByConcern,
    "Shop by Ingredients": shopByIngredients,
    "Skin Care": skinCare,
    "Body Care": bodyCare,
  };

  type CategoryKey = keyof typeof categories;

  // New functions for category navigation
  const openCategoryMenu = () => {
    setActiveCategoryMenu("categories");
    setIsMobileShopOpen(false);
  };

  const openSubcategories = (category: CategoryKey) => {
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
    { id: 1, name: "Shampoo", image: "/image/kyren2.jpeg", slug: "shampoos" },
    {
      id: 2,
      name: "Treatment",
      image: "/image/kyren2.jpeg",
      slug: "treatments",
    },
    {
      id: 3,
      name: "Body Wash",
      image: "/image/kyren2.jpeg",
      slug: "bodywash",
    },
    {
      id: 4,
      name: "Body Lotion",
      image: "/image/kyren2.jpeg",
      slug: "bodylotions",
    },
    {
      id: 5,
      name: "Hand Wash",
      image: "/image/kyren2.jpeg",
      slug: "handwash",
    },
  ];

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  return (
    <nav className="relative">
      <div className="flex justify-around items-center p-4 sm:p-6">
        <Link href="/">
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
              <div>
                <p className="cursor-pointer pb-1 border-b-2 border-transparent hover:border-black">
                  Shop
                </p>
              </div>

              <div className="invisible group-hover:visible absolute -translate-x-1/2 z-50 pt-4">
                <div className="rounded-md shadow-lg bg-white">
                  <div className="flex px-10 py-10">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/category/${product.slug}`}
                        className="flex flex-col gap-5 items-center cursor-pointer group/product"
                      >
                        <div className="w-[200px] h-[200px] relative">
                          <Image
                            src={product.image}
                            width={200}
                            height={200}
                            alt={`${product.name} Image`}
                            className="w-auto h-[200px] object-cover group-hover/product:scale-105 transition duration-1000"
                          />
                        </div>
                        <div>
                          <p className="text-center border-b-2 border-transparent group-hover/product:border-black transition duration-300">
                            {product.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            <li className="group relative inline-block">
              <Link
                href="/products"
                className="cursor-pointer pb-1 border-b-2 border-transparent hover:border-black"
              >
                Products
              </Link>

              <div className="invisible group-hover:visible absolute left-0 z-50 pt-4 w-[800px] -translate-x-1/4">
                <div className="rounded-md shadow-lg bg-white">
                  <div className="grid grid-cols-4 gap-8 p-8">
                    {/* Shop by Concern Column */}
                    <div className="flex flex-col gap-3">
                      <h3 className="font-medium text-gray-900 mb-2 cursor-pointer">
                        Shop by Concern
                      </h3>
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
                      <h3 className="font-medium text-gray-900 mb-2 cursor-pointer">
                        Shop by Ingredients
                      </h3>
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
                      <h3 className="font-medium text-gray-900 mb-2 cursor-pointer">
                        Skin Care
                      </h3>
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
                        <h3 className="font-medium text-gray-900 mb-2 cursor-pointer">
                          Body Care
                        </h3>
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
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Desktop user controls */}
        <div className="hidden md:flex flex-row items-center gap-6">
          {isInitializing ? (
            <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-full"></div>
          ) : !isLoggedIn ? (
            <Link
              href="/auth/login"
              className="bg-eggPlant text-white py-2 px-6 sm:px-10 text-[18px] rounded-full transition-colors"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-8">
              <div className="relative group inline-block">
                <div className="inline-flex items-center">
                  <FaUser className="text-2xl cursor-pointer hover:text-gray-600 transition-colors" />
                </div>
                <div className="absolute z-10 w-auto min-w-[120px] pt-2 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <ul className="bg-white rounded-md shadow-lg border py-2 text-center text-[18px]">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={handleLogout}
                    >
                      {isLoading ? "Logging out..." : "Logout"}
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
                <Link
                  key={product.id}
                  href={`/category/${product.slug}`}
                  className="flex flex-col items-center gap-2"
                >
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
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Categories menu - Second level */}
        <div
          className={`fixed inset-0 bg-white transform transition-all duration-500 ease-in-out ${
            activeCategoryMenu === "categories"
              ? "translate-x-0"
              : "translate-x-full"
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
                  onClick={() => openSubcategories(category as CategoryKey)}
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
            {selectedCategory &&
              categories[selectedCategory].map((item: string) => (
                <li
                  key={item}
                  className="py-2 border-b hover:text-gray-600 transition-colors"
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>

        {/* Backdrop with fade transition */}
        {(isMenuOpen ||
          isMobileShopOpen ||
          activeCategoryMenu ||
          selectedCategory) && (
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

      {/* Cart Sidebar */}
      {/* <CartSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      /> */}
    </nav>
  );
}

export default Navbar;
