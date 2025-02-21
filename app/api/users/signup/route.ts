import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";


// Utility function to generate OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// First endpoint to initiate signup and send OTP
export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { firstName, lastName, contactNo, email } = reqBody;

    console.log("req body ", reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user && user.isVerified) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    if (user) {
      // Update existing unverified user
      user.firstName = firstName;
      user.lastName = lastName;
      user.contactNo = contactNo;
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    } else {
      // Create new user with OTP
      const newUser = new User({
        firstName,
        lastName,
        contactNo,
        email,
        otp,
        otpExpiry,
        isVerified: false,
      });

      await newUser.save();
    }

    // TODO: Implement email sending logic
    await sendEmail({ email, otp });

        
    // In production, you should use a proper email service
    console.log("OTP for testing:", otp);

    return NextResponse.json({
      message: "OTP sent successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}
// Second endpoint to verify OTP and complete signup
export async function PUT(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { email, otp } = reqBody;

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

    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Mark user as verified
    user.isVerified = true;
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
      message: "Signup completed successfully",
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
    console.error("OTP verification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

