import { connect } from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Utility function to generate OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// First endpoint to initiate login and send OTP
export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log("Login request:", reqBody);

    // Check if user exists and is verified
    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist or is not verified" },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    // Save OTP to user
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // TODO: Implement email sending logic
    // In production, you should use a proper email service
    console.log("Login OTP for testing:", otp);

    return NextResponse.json({
      message: "OTP sent successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Second endpoint to verify OTP and complete login
export async function PUT(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { email, otp } = reqBody;

    // Find user with valid OTP
    const user = await User.findOne({
      email,
      otpExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found or OTP expired" },
        { status: 400 }
      );
    }

    // Verify OTP
    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Clear OTP data
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // Create response with token in cookie
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNo: user.contactNo,
      },
    });

    response.cookies.set("jsonToken", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.error("Login verification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
