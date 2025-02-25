import { initiatePhonePePayment } from '@/src/lib/phonepe';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userId, transactionId, total, address } = await request.json();

    // Validate request

    if (!userId || !transactionId || !total) {
        return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
      }
    
    // Initiate payment
    const result = await initiatePhonePePayment({
      transactionId: transactionId,
      userId:userId,
      address:address,
      total: total,
    });
    console.log("result to generate paymentURL",result)
    
    if (result.success) {
      return NextResponse.json(result.paymentUrl);
    } else {
      return NextResponse.json({ success: false, message: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json({ success: false, message: 'Payment initiation failed' }, { status: 500 });
  }
}