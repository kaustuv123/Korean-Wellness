import { connect } from "../../../dbConfig/dbConfig";
import Product from "../../../models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connect();

    // Get slug from context
    await connect();

    const product = await Product.findOne({
      slug: decodeURIComponent(params.slug),
    }).lean();

    

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
