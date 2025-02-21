import { getServerSession } from 'next-auth';
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { index: string } }
) {
  try {
    const session = await getServerSession(); // Retrieve the current user session
    if (!session?.user?.email) {
      // If no user is authenticated, return an unauthorized error
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connect(); // Connect to the database
    const index = parseInt(params.index); // Parse the address index from the URL parameters
    const body = await req.json(); // Parse the request body

    const user = await User.findOne({ email: session.user.email }); // Find the user by email
    if (!user) {
      // If the user is not found, return a not found error
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If setting as default, remove default from other addresses
    if (body.isDefault) {
      user.addresses.forEach((addr: any, i: number) => {
        if (i !== index) addr.isDefault = false; // Unset default for all other addresses
      });
    }

    user.addresses[index] = body; // Update the address at the specified index
    await user.save(); // Save the user document

    // Return the updated address
    return NextResponse.json(user.addresses[index]);
  } catch (error) {
    console.error('Error updating address:', error);
    // Return a generic internal server error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { index: string } }
) {
  try {
    const session = await getServerSession(); // Retrieve the current user session
    if (!session?.user?.email) {
      // If no user is authenticated, return an unauthorized error
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connect(); // Connect to the database
    const index = parseInt(params.index); // Parse the address index from the URL parameters

    const user = await User.findOne({ email: session.user.email }); // Find the user by email
    if (!user) {
      // If the user is not found, return a not found error
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const removedAddress = user.addresses.splice(index, 1)[0]; // Remove the address at the specified index

    // If removed address was default, set first remaining address as default
    if (removedAddress.isDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true; // Set the first address as default if it exists
    }

    await user.save(); // Save the user document

    // Return the removed address
    return NextResponse.json(removedAddress);
  } catch (error) {
    console.error('Error deleting address:', error);
    // Return a generic internal server error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}