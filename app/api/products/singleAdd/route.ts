import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect(); // Connect to MongoDB

    const { product } = await request.json(); // Parse request body

    // Validate request body
    if (!product || typeof product !== "object") {
      return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
    }

    const { productId, slug } = product;

    // Check if a product with the same ID or slug exists
    const existingProduct = await Product.findOne({ $or: [{ productId }, { slug }] });

    if (existingProduct) {
      // Delete the existing product before inserting a new one
      await Product.deleteOne({ _id: existingProduct._id });
      console.log(`Deleted existing product: ${existingProduct.name}`);
    }

    // Insert the new product
    const newProduct = await Product.create(product);

    return NextResponse.json({
      success: true,
      message: "Product replaced successfully",
      data: newProduct,
    });
  } catch (error: any) {
    console.error("Error replacing product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
