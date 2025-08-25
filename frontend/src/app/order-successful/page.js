"use client"
import Link from "next/link"
const OrderSuccessful = () => {
    return (
        <div className="text-center py-20">
            {/* Success tick animation */}
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full">
                <svg
                    className="h-20 w-20"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Circle animation */}
                    <circle
                        cx="60"
                        cy="60"
                        r="48"
                        stroke="#10B981"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            strokeDasharray: 302,
                            strokeDashoffset: 302,
                            animation: 'circleDraw 700ms ease-out forwards',
                        }}
                    />
                    {/* Tick animation */}
                    <path
                        d="M38 62 L54 78 L84 46"
                        stroke="#059669"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        style={{
                            strokeDasharray: 100,
                            strokeDashoffset: 100,
                            animation: 'tickDraw 500ms 650ms ease forwards',
                        }}
                    />
                </svg>
            </div>

            {/* Order text */}
            <h1 className="font-goodTime text-[32px] text-gray-700">Thank you for your purchase</h1>
            <p className="text-gray-500">We received your order and will ship in 5-7 business days.</p>
            <p className="text-gray-500 mb-10">Your order number is #1245</p>
            <Link href="/" className="cursor-pointer transition text-gray-500 hover:bg-primary-500 hover:text-gray-100 rounded-[8px] mt-5 py-2 px-4 bg-gray-100">
                Back to Home
            </Link>

            {/* Keyframe animations */}
            <style>{`
                @keyframes circleDraw {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes tickDraw {
                    to { stroke-dashoffset: 0; }
                }
            `}</style>
        </div>
    );
};

export default OrderSuccessful;
