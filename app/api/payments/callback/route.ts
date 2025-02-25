import { checkPaymentStatus } from '@/src/lib/phonepe';
import { NextResponse } from 'next/server';
import Order from '@/models/orderModel'; // Import the Mongoose Order model
import {connect} from '@/dbConfig/dbConfig'; // Assuming you have a MongoDB connection utility

const REDIRECT_BASE_URL = isProd 
  ? 'https://korean-wellness.in'
  : 'http://localhost:3000';

export async function GET(request) {
  try {
    // Connect to the database
    await connect();
    
    // Extract query parameters from the request URL
    const searchParams = request.nextUrl.searchParams;
    const transactionId = searchParams.get('transactionId');
    
    if (!transactionId) {
      return NextResponse.json({ success: false, message: 'Transaction ID is required' }, { status: 400 });
    }
    
    // For security reasons, verify the payment status with PhonePe
    const paymentStatus = await checkPaymentStatus(transactionId);
    
    // Update database based on payment status
    if (paymentStatus.status === 'PAYMENT_SUCCESS') {
      // Update order status from payment_pending to pending
      await Order.findOneAndUpdate(
        { merchantTransactionId: transactionId },
        { status: 'pending' }
      );
      
      return NextResponse.redirect(`${REDIRECT_BASE_URL}/payment/success?orderId=${transactionId}`);
    } else {
      // If payment was not successful, delete the order from database
      await Order.findOneAndDelete({ merchantTransactionId: transactionId });
      
      return NextResponse.redirect(`${REDIRECT_BASE_URL}/payment/failure?orderId=${transactionId}&reason=${paymentStatus.error || 'Payment failed'}`);
    }
  } catch (error) {
    console.error('Payment status processing error:', error);
    return NextResponse.json({ success: false, message: 'Failed to process payment status' }, { status: 500 });
  }
}