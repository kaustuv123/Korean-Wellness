import { connect } from "../../dbConfig/dbConfig";
import Product from "../../models/productModel.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();

    // Fetch all unique categories with one product's image for display
    const categoriesWithImages = await Product.aggregate([
        {
          $group: {
            _id: "$category",
            image: { $first: { $arrayElemAt: ["$images", 0] } }
          }
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            image: 1
          }
        },
        {
          $sort: { name: 1 }
        }
      ]);
      return NextResponse.json(categoriesWithImages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
