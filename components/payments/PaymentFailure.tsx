import React from 'react';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentFailure({ orderId, reason, error }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Failed</h2>
          <p className="mt-2 text-gray-600">
            We were unable to process your payment.
          </p>
          {reason && (
            <p className="mt-2 text-sm text-red-600">
              Reason: {reason}
            </p>
          )}
          {error && (
            <p className="mt-2 text-sm text-red-600">
              Error: {error}
            </p>
          )}
        </div>

        <div className="mt-8">
          <div className="border-t border-gray-200 pt-6">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                <dd className="text-sm font-medium text-gray-900">{orderId || 'N/A'}</dd>
              </div>
              <div className="py-4 flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="text-sm font-medium text-red-600">Failed</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8 flex flex-col space-y-4">
          <Link href="/checkout" className="w-full py-3 px-4 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-center font-medium rounded-md transition duration-150">
            Try Again
          </Link>
          <Link href="/" className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium rounded-md transition duration-150">
            Return to Home
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            If you believe this is an error, please contact our customer support.
          </p>
        </div>
      </div>
    </div>
  );
}