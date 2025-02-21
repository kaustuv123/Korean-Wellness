import { getServerSession } from 'next-auth';
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      const session = await getServerSession();
      if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      await connect();
      const user = await User.findOne({ email: session.user.email });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json({ addresses: user.addresses });
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  
  export async function POST(req: Request) {
    try {
      const session = await getServerSession();
      if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      await connect();
      const body = await req.json();
  
      const user = await User.findOne({ email: session.user.email });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      const isFirstAddress = user.addresses.length === 0;
      const newAddress = {
        ...body,
        isDefault: isFirstAddress ? true : body.isDefault || false,
      };
  
      if (newAddress.isDefault) {
        user.addresses.forEach((addr: any) => {
          addr.isDefault = false;
        });
      }
  
      user.addresses.push(newAddress);
      await user.save();
  
      return NextResponse.json(newAddress);
    } catch (error) {
      console.error('Error adding address:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }