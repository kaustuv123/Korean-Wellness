// import Image from "next/image";

import BestSeller from "@/components/BestSeller";
import Carousel from "@/components/Carousel";
import NewLaunches from "@/components/NewLaunches";
import ReviewCarousel from "@/components/ReviewCarousel";
import ShopByCategory from "@/components/ShopByCategory";
import ShopByConcern from "@/components/ShopByConcerns";


export default async function Home() {
  // await new Promise((r) => setTimeout(r, 5000));
  return (
    <div className="min-h-screen">
      <Carousel/>
      <BestSeller/>
      <ShopByCategory/>
      <ShopByConcern/>
      <NewLaunches/>
      <ReviewCarousel/>
    </div>
  );
}
