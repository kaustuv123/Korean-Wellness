import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess({ orderId, orderDetails }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
          <p className="mt-2 text-gray-600">
            Thank you for your order. We have received your payment and are processing your order.
          </p>
        </div>

        {orderDetails ? (
          <div className="mt-8">
            <div className="border-t border-gray-200 pt-6">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                  <dd className="text-sm font-medium text-gray-900">{orderId}</dd>
                </div>
                <div className="py-4 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {orderDetails.createdAt ? formatDate(orderDetails.createdAt) : 'N/A'}
                  </dd>
                </div>
                <div className="py-4 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Amount</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatCurrency(orderDetails.amount)}
                  </dd>
                </div>
                <div className="py-4 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="text-sm font-medium text-green-600">Confirmed</dd>
                </div>
              </dl>
            </div>

            {orderDetails.products && orderDetails.products.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
                <ul className="mt-3 divide-y divide-gray-200">
                  {orderDetails.products.map((item, index) => (
                    <li key={index} className="py-3 flex justify-between">
                      <div className="flex items-center">
                        <span className="ml-2 text-sm text-gray-900">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.quantity} {item.quantity > 1 ? 'items' : 'item'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Order details are not available.</p>
          </div>
        )}

        <div className="mt-8 flex flex-col space-y-4">
          <Link href="/orders" className="w-full py-3 px-4 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-center font-medium rounded-md transition duration-150">
            View My Orders
          </Link>
          <Link href="/" className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium rounded-md transition duration-150">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}