import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";

export async function POST(request: NextRequest) {
  try {
    await connect();
    
    // Get user ID from token
    const userId = await getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Parse request body
    const { 
      products, 
      amount, 
      address, 
      merchantTransactionId, 
      status = "payment_pending"  // Default status
    } = await request.json();

    // Validate required fields
    if (!products || !amount || !address || !merchantTransactionId) {
      return NextResponse.json({ 
        success: false, 
        message: "Missing required fields" 
      }, { status: 400 });
    }

    // Create new order
    const newOrder = new Order({
      user: userId,
      products,
      amount,
      address,
      merchantTransactionId,
      status: status,
      createdAt: new Date()
    });

    // Save order to database
    const savedOrder = await newOrder.save();

    // Return success response with order ID
    return NextResponse.json({ 
      success: true, 
      message: "Order created successfully", 
      orderId: savedOrder._id 
    }, { status: 201 });
    
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to create order", 
      error: error.message 
    }, { status: 500 });
  }
}