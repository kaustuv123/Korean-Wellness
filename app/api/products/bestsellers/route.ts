// app/api/products/bestsellers/route.ts
import { NextResponse } from "next/server";
import Product from "@/models/productModel.js";
import { connect } from "@/dbConfig/dbConfig";

export async function GET() {
  try {
    await connect();
    
    // Get 7 random products using MongoDB's aggregation pipeline
    const bestsellerProducts = await Product.aggregate([
      { $sample: { size: 7 } },  // Randomly select 7 documents
      { $project: {
        productId: 1,
        name: 1,
        slug: 1,
        price: 1,
        images: 1,
        stock: 1,
        discount: 1
      }}
    ]);
    
    return NextResponse.json({ 
      success: true, 
      data: bestsellerProducts 
    });
  } catch (error) {
    console.error("Failed to fetch bestseller products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bestseller products" },
      { status: 500 }
    );
  }
}