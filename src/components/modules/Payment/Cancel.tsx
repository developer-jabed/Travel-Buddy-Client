"use client";

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled ❗</h1>

      <p className="mt-4 text-gray-700">
        Your payment was cancelled or failed.  
        You can try again anytime.
      </p>

      <Link
        href="/"
        className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
