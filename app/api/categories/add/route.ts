import { NextResponse } from "next/server";
import Category from "@/models/categoryModel";
import { connect } from "@/dbConfig/dbConfig";

const categories = [
    {
      name: "Shampoos",
      //categoryId: "shamp_001",
      attributes: [
        { name: "size", type: "text", required: true },
        { name: "purpose", type: "text", required: true },
        { name: "hairType", type: "text", required: true }
      ]
    },
    {
      name: "Body Wash",
      //categoryId: "bw_001",
      attributes: [
        { name: "size", type: "text", required: true },
        { name: "skinType", type: "text", required: true },
        { name: "fragrance", type: "text", required: false }
      ]
    },
    {
      name: "Treatments",
      //categoryId: "treat_001",
      attributes: [
        { name: "size", type: "text", required: true },
        { name: "treatmentType", type: "text", required: true },
        { name: "duration", type: "text", required: true }
      ]
    },
    {
      name: "Body Lotions",
      //categoryId: "bl_001",
      attributes: [
        { name: "size", type: "text", required: true },
        { name: "skinType", type: "text", required: true },
        { name: "moistureLevel", type: "text", required: true }
      ]
    },
    {
      name: "Hand Wash",
      //categoryId: "hw_001",
      attributes: [
        { name: "size", type: "text", required: true },
        { name: "fragrance", type: "text", required: true },
        { name: "antibacterial", type: "text", required: false }
      ]
    }
  ];

export async function POST() {
  try {
    await connect();
    await Category.insertMany(categories);
    return NextResponse.json({ message: "Categories added successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add categories" }, { status: 500 });
  }
} 