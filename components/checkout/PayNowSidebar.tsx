import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';
import { Address } from '@/src/types/address';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface PayNowSidebarProps {
  selectedAddress: number | null;
  addresses: Address[];
}

export default function PayNowSidebar({ selectedAddress, addresses }: PayNowSidebarProps) {
  const { items, getTotalPrice, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleCouponApply = async () => {
    try {
      const response = await fetch('/api/validateCoupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode }),
      });

      const data = await response.json();
      if (data.valid) {
        setDiscount(10);
        setCouponError('');
      } else {
        setDiscount(0);
        setCouponError('Invalid coupon code');
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      setCouponError('Error applying coupon');
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("/api/users/userData");
        setUserId(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserId();
  }, []);

  const handlePayment = async () => {
    if (!selectedAddress || selectedAddress === null) {
      return;
    }

    try {
      setProcessing(true);

      // Get the selected address object from the addresses array
      const addressData = addresses[selectedAddress];
      
      // Create order products array from cart items
      const orderProducts = items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity
      }));

      // Generate a unique transaction ID
      const transactionId = `TXN_${uuidv4()}`;
      
      // Calculate final amount
      const subtotal = getTotalPrice();
      const discountAmount = (subtotal * discount) / 100;
      const total = subtotal - discountAmount;

      // First, create the order with status 'payment_pending'
      const orderResponse = await axios.post("/api/orders/create", {
        userId: userId,
        products: orderProducts,
        amount: total,
        address: addressData,
        merchantTransactionId: transactionId,
        status: "payment_pending" // Initial status
      });

      if (!orderResponse.data.success) {
        throw new Error("Failed to create order");
      }

      const orderId = orderResponse.data.orderId; // Assuming the API returns the created order ID

      // Prepare the payment request data
      const paymentData = {
        userId: userId,
        transactionId: orderId,
        total: total,
        address: addressData,
        // orderId: orderId // Pass the orderId to link payment with order
      };

      // Call the payment initiation API
      const paymentResponse = await axios.post("/api/payments/initiate", paymentData);
      
      // If successful, redirect to the payment URL
      if (paymentResponse.data) {
        // Set up a timeout to delete the order if not updated to 'pending' within 5 minutes
        // This will run only if the user doesn't navigate away from the page
        // A more robust solution would use a server-side scheduled job
        setTimeout(async () => {
          try {
            // Check the order status
            const checkOrderResponse = await axios.get(`/api/orders/status/${orderId}`);
            if (checkOrderResponse.data.status === "payment_pending") {
              // If still in payment_pending status after 5 minutes, delete the order
              await axios.delete(`/api/orders/delete/${orderId}`);
              console.log(`Order ${orderId} deleted due to payment timeout`);
            }
          } catch (error) {
            console.error("Error checking/deleting timed-out order:", error);
          }
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
        
        // Redirect to the payment gateway URL
        window.location.href = paymentResponse.data;
        
        // Clear the cart after successful redirection
        clearCart();
      } else {
        // If payment initialization fails, delete the order
        await axios.delete(`/api/orders/delete/${orderId}`);
        throw new Error("Failed to get payment URL");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      setProcessing(false);
      // Handle error (you might want to show an error message to the user)
    }
  };

  const subtotal = getTotalPrice();
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <ShoppingBag className="mr-2 h-5 w-5" /> Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.product._id} className="flex justify-between">
            <div className="flex-1">
              <p className="font-medium">{item.product.name}</p>
              <p className="text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          {couponError && (
            <p className="text-red-500 text-sm">{couponError}</p>
          )}
          <button
            onClick={handleCouponApply}
            className="w-full py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            Apply Coupon
          </button>
        </div>
      </div>

      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discount}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={selectedAddress === null || processing}
        className={`w-full mt-6 py-3 rounded-lg font-semibold text-white ${
          selectedAddress !== null && !processing
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {processing 
          ? 'Processing...' 
          : selectedAddress !== null 
            ? 'Pay Now' 
            : 'Select Address to Continue'}
      </button>
    </div>
  );
}