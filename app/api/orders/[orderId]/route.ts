// API route to fetch order details
// app/api/orders/[orderId]/route.js
import { NextResponse } from 'next/server';
import {connect} from '@/dbConfig/dbConfig';
import Order from '@/models/orderModel';

export async function GET(request, { params }) {
  try {
    await connect();
    
    const { orderId } = params;
    
    // Try to find the order by merchantTransactionId first (which is used in payment routes)
    let order = await Order.findOne({ merchantTransactionId: orderId }).populate('user', 'name email');
    
    // If not found, try to find by _id (MongoDB ObjectId)
    if (!order) {
      order = await Order.findById(orderId).populate('user', 'name email');
    }
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    return NextResponse.json({ error: 'Failed to fetch order details' }, { status: 500 });
  }
}