
import axios from 'axios';
import crypto from 'crypto';

const isProd = process.env.NODE_ENV === 'production';
    // console.log(`Running in ${isProd ? 'production' : 'development'} mode`);
    const APP_URL = isProd ? 'https://koreanwellness.in' : 'http://localhost:3000';
    const PHONEPE_API_URL = isProd 
  ? 'https://api.phonepe.com/apis/hermes'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

  const MERCHANT_ID = process.env.MERCHANT_ID;
  const SALT_INDEX = process.env.SALT_INDEX;
  const SALT_KEY = process.env.SALT_KEY;

export async function initiatePhonePePayment(orderData) {
  try {
    const { userId,transactionId,total,address } = orderData;

    // Create payload for PhonePe
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: transactionId,
      amount: total * 100, // Amount in paise
    //   merchantUserId: customerPhone,
      redirectUrl: `${APP_URL}/api/phonepe/status/${transactionId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `${APP_URL}/api/phonepe/status/${transactionId}`,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
    const base64EncodedPayload = bufferObj.toString("base64");

    const string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
    
    const sha256_val = crypto.createHash('sha256').update(string).digest('hex');
    const xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

    console.log("Making PhonePe API request...");
    
    // Make request to PhonePe
    
    const response = await axios.post(
        `${PHONEPE_API_URL}/pg/v1/pay`,
        {
          request: base64EncodedPayload,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": xVerifyChecksum,
            accept: "application/json",
          },
        }
      );

      if (!response.data?.data?.instrumentResponse?.redirectInfo?.url) {
        throw new Error('Invalid response from PhonePe');
      }  
      return {
        success: true,
        paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
        merchantTransactionId: transactionId
      }
    
  } catch (error) {
    console.error('PhonePe payment initiation error:', error);
    return {
      success: false,
      error: error.message || 'Payment initiation failed'
    };
  }
}

export async function checkPaymentStatus(merchantTransactionId) {
  try {
    // Create the URL with merchantId and transactionId
    const statusUrl = isProd
    ? `https://api.phonepe.com/apis/hermes/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`
    : `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;


    // generate X-VERIFY
    const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + SALT_KEY;
    const sha256_val = crypto.createHash('sha256').update(string).digest('hex');
    const xVerifyChecksum = sha256_val + "###" + process.env.PHONEPE_SALT_KEY;
    
    // Make request to PhonePe
    const response = await axios.get(statusUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          "X-MERCHANT-ID": MERCHANT_ID,
          accept: "application/json",
        },
      });
    
    console.log("response pf payment status url",response)

    if (response.data) {
      return {
        status: response.data.code,
        paymentDetails: response.data
      };
    } else {
      throw new Error('Payment status check failed');
    }
  } catch (error) {
    console.error('PhonePe payment status check error:', error);
    return {
      success: false,
      error: error.message || 'Payment status check failed'
    };
  }
}