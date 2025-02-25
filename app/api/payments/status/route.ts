import { checkPaymentStatus } from '@/src/lib/phonepe';
import { Console } from 'console';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const transactionId = searchParams.get('transactionId');
    
    if (!transactionId) {
      return NextResponse.json({ success: false, message: 'Missing order ID' }, { status: 400 });
    }
    
    const status = await checkPaymentStatus(transactionId);
    console.log("status check manually",status);
    
    if (status.status === 'PAYMENT_SUCCESS') {
        return NextResponse.json("success")
      } else if (status.status === 'PAYMENT_ERROR') {
        return NextResponse.json("failure")      
    }
        
    else{

        return NextResponse.json("pending")   
      }
  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json({ success: false, message: 'Payment status check failed' }, { status: 500 });
  }
}