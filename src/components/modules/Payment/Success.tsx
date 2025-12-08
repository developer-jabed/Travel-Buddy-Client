"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get("paymentId");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-3xl font-bold text-green-600">
                Payment Successful 🎉
            </h1>

            <p className="mt-4 text-gray-700">
                Your payment has been processed successfully.
            </p>

            {paymentId && (
                <p className="mt-2 font-medium text-gray-900">
                    Payment ID:
                    <br />
                    <span className="font-mono">{paymentId}</span>
                </p>
            )}

            <Link
                href="/"
                className="mt-6 px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
                Go Back Home
            </Link>
        </div>
    );
}
