import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
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
    
    // Get order ID from params
    const { orderId } = params;

    if (!orderId) {
      return NextResponse.json({ 
        success: false, 
        message: "Order ID is required" 
      }, { status: 400 });
    }

    // Find order by ID
    const order = await Order.findById(orderId);

    // Check if order exists
    if (!order) {
      return NextResponse.json({ 
        success: false, 
        message: "Order not found" 
      }, { status: 404 });
    }

    // Verify that the order belongs to the current user
    if (order.user.toString() !== userId.toString()) {
      return NextResponse.json({ 
        success: false, 
        message: "You are not authorized to view this order" 
      }, { status: 403 });
    }

    // Return order status
    return NextResponse.json({ 
      success: true, 
      status: order.status,
      orderId: order._id,
      amount: order.amount,
      createdAt: order.createdAt
    });
    
  } catch (error: any) {
    console.error("Error checking order status:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to check order status", 
      error: error.message 
    }, { status: 500 });
  }
}