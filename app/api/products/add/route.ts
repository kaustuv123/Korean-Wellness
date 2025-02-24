import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect(); // Connect to MongoDB

    // Parse request body
    const { products } = await request.json();

    // Validate request body
    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty product data" },
        { status: 400 }
      );
    }

    // Delete all existing products
    await Product.deleteMany({});
    console.log("Deleted all existing products before inserting new ones");

    // Insert new products
    const insertedProducts = await Product.insertMany(products);

    return NextResponse.json({
      success: true,
      message: `Replaced all products with ${insertedProducts.length} new ones.`,
      data: insertedProducts,
    });
  } catch (error: any) {
    console.error("Error replacing products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
