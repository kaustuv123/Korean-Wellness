import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken"; // Import the helper function

export async function PUT(
  req: NextRequest,
  { params }: { params: { index: string } }
) {
  try {
    // Use the helper function to get the user ID from the token
    const userId = getUserFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connect();
    const index = parseInt(params.index);
    const body = await req.json();

    // Find the user by ID instead of email
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (body.isDefault) {
      user.addresses.forEach((addr: any, i: number) => {
        if (i !== index) addr.isDefault = false;
      });
    }

    user.addresses[index] = body;
    await user.save();

    return NextResponse.json(user.addresses[index]);
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { index: string } }
) {
  try {
    // Use the helper function to get the user ID from the token
    const userId = getUserFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connect();
    const index = parseInt(params.index);

    // Find the user by ID instead of email
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const removedAddress = user.addresses.splice(index, 1)[0];

    if (removedAddress.isDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    return NextResponse.json(removedAddress);
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}