// app/api/products/recent/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel.js";

export async function GET() {
  try {
    await connect();
    
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })  // Sort by creation date, newest first
      .limit(10)                // Limit to 10 products
      .select('productId name slug price images stock discount');  // Select only needed fields
    
    return NextResponse.json({ 
      success: true, 
      data: recentProducts 
    });
  } catch (error) {
    console.error("Failed to fetch recent products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch recent products" },
      { status: 500 }
    );
  }
}