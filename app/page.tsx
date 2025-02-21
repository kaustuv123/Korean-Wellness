// import Image from "next/image";

import BestSeller from "@/components/homeComponents/BestSeller";
import Carousel from "@/components/homeComponents/Carousel";
import CategorySection from "@/components/homeComponents/CategorySection";
import NewLaunches from "@/components/homeComponents/NewLaunches";
import ReviewCarousel from "@/components/homeComponents/ReviewCarousel";
// import ShopByCategory from "@/components/homeComponents/ShopByCategory";
import ShopByConcern from "@/components/homeComponents/ShopByConcerns";

export default async function Home() {
  // await new Promise((r) => setTimeout(r, 5000));
  return (
    <div className="min-h-screen">
      <Carousel />
      <BestSeller />
      <CategorySection />
      <ShopByConcern />
      <NewLaunches />
      <ReviewCarousel />
    </div>
  );
}
