import { connect } from "../../../dbConfig/dbConfig";
import User from "../../../models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { firstName, lastName, contactNo, email, password } = reqBody;

    console.log("req body ", reqBody);

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    console.log("user existence checked");
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      contactNo,
      email,
      password: hashedPassword,
    });

    console.log("new user ", newUser);

    try {
      const savedUser = await newUser.save();
      console.log("saved user ", savedUser);

      return NextResponse.json({
        message: "User created successfully",
        success: true,
        savedUser,
      });
    } catch (saveError: any) {
      console.error("Save error:", saveError);
      return NextResponse.json({ error: saveError.message }, { status: 500 });
    }

    //send verification email

    // await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
