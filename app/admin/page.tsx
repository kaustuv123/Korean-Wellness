import ProductAddition from "@/components/ProductAddition";
import SingleAddition from "@/components/SingleAddition";
import React from "react";

export default function admin() {
  return (
    <div className="h-full flex flex-col gap-4">
      <ProductAddition />
      <SingleAddition />
    </div>
  );
}
