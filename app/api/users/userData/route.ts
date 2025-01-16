// app/api/users/userData/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel.js";
import { getUserFromToken } from "@/helpers/getUserFromToken";

export async function GET(request: NextRequest) {
  try {
    await connect();
    const userId = await getUserFromToken(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
