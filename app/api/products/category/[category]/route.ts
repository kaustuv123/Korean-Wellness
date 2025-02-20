import { connect } from "../../../../dbConfig/dbConfig";
import Product from "../../../../models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { category: string } }) {
  try {
    await connect();
    
    const products = await Product.find({
      category: decodeURIComponent(params.category)
    }).lean();
  

    if (!products.length) {
      return NextResponse.json({ error: "No products found in this category" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
