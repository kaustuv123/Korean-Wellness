import { useState} from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';
import { Address } from '@/src/types/address';

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

  const handlePayment = async () => {
    if (selectedAddress === null || processing) return;

    setProcessing(true);
    try {
      const selectedAddressData = addresses[selectedAddress];
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          address: selectedAddressData,
          totalAmount: total,
          discount,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Redirect to success page
        window.location.href = `/order/success/${data.orderId}`;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Payment error:', error);
      // Handle payment error (show error message to user)
    } finally {
      setProcessing(false);
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