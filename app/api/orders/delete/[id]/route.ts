import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";

export async function DELETE(
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

    // Find the order first to check ownership
    const order = await Order.findById(orderId);
    
    // Check if order exists
    if (!order) {
      return NextResponse.json({ 
        success: false, 
        message: "Order not found" 
      }, { status: 404 });
    }
    
    // Verify that the order belongs to the current user
    // For admin operations, you might want to add a check for admin role as well
    if (order.user.toString() !== userId.toString()) {
      return NextResponse.json({ 
        success: false, 
        message: "You are not authorized to delete this order" 
      }, { status: 403 });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: "Order deleted successfully" 
    });
    
  } catch (error: any) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to delete order", 
      error: error.message 
    }, { status: 500 });
  }
}

// Optional: Add GET method for retrieving a single order(currently not in frontend)
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

    // Find order by ID and populate related data
    const order = await Order.findById(orderId)
      .populate('user', 'firstName lastName email contactNo')
      .populate('products.product', 'name price images');

    // Check if order exists
    if (!order) {
      return NextResponse.json({ 
        success: false, 
        message: "Order not found" 
      }, { status: 404 });
    }

    // Verify that the order belongs to the current user
    if (order.user._id.toString() !== userId.toString()) {
      return NextResponse.json({ 
        success: false, 
        message: "You are not authorized to view this order" 
      }, { status: 403 });
    }

    // Return order
    return NextResponse.json({ 
      success: true, 
      data: order 
    });
    
  } catch (error: any) {
    console.error("Error getting order:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to get order", 
      error: error.message 
    }, { status: 500 });
  }
}