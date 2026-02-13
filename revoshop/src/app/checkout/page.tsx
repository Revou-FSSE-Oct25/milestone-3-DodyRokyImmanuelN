"use client";

import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleConfirmOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
    }, 1000);
  };
  if (!isClient) return null;

  if (isOrdered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <div className="bg-green-100 p-6 rounded-full mb-6">
          <CheckCircle2 size={80} className="text-green-600" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 max-w-md mb-8 text-lg">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>
        <div className="flex">
          <Link href="/">
            <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition font-bold">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>
          No items to checkout.{" "}
          <Link href="/" className="underline text-blue-600">
            Go back
          </Link>
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition w-fit font-medium"
        >
          <ArrowLeft size={18} /> Back to Cart
        </Link>

        {/* RECEIPT CARD */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-black p-8 text-white text-center">
            <h1 className="text-2xl font-bold tracking-widest uppercase">
              Invoice / Receipt
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Order ID: #INV-{Math.floor(Math.random() * 100000)}
            </p>
          </div>

          <div className="p-8 sm:p-12">
            <div className="mb-10">
              <h2 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-4">
                Items Summary
              </h2>
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain border rounded-lg p-2"
                        />
                        <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 line-clamp-1 max-w-[200px] sm:max-w-sm">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-400">
                          Unit: ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-8 space-y-3">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping Fee</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xl font-bold text-gray-900">
                  Total Amount
                </span>
                <span className="text-3xl font-black text-black">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="w-full bg-black text-white mt-12 py-5 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all active:scale-[0.98] shadow-xl"
            >
              CONFIRM ORDER
            </button>
            <p className="text-center text-gray-400 text-xs mt-6 italic">
              By clicking confirm, your order will be recorded in our system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
