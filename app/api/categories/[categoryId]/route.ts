import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/productModel";

export async function GET(request: NextRequest, context: { params: { categoryId: string } }) {
  try {
    await connect();
    const { categoryId } = context.params;
    console.log(categoryId,"yeh hai categoryid");

    if (!categoryId) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 }
      );
    }

    const category = await Category.findOne({ categoryId });
    console.log(category, "or yeh hai category");

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
