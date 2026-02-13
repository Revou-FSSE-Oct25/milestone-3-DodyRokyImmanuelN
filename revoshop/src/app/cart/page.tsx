"use client";

import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ChevronLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } =
    useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="bg-gray-50 p-8 rounded-full mb-6">
          <ShoppingBag size={64} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 mt-2 mb-8 text-lg">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/"
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all font-medium flex items-center gap-2"
        >
          <ChevronLeft size={20} /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-black pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-10 text-gray-900">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* List Items */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-6 transition-all hover:shadow-md"
              >
                {/* Image Wrapper */}
                <div className="w-full sm:w-32 h-32 bg-white rounded-xl flex items-center justify-center p-2 border border-gray-50 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Unit Price: ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold text-xl text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, "minus")}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors text-gray-600 shadow-sm disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, "plus")}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors text-gray-600 shadow-sm"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1.5 text-red-500 hover:text-red-600 font-medium text-sm transition-colors p-2 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl sticky top-8">
              <h2 className="text-2xl font-bold mb-8 text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500">
                  <span>
                    Subtotal (
                    {cart.reduce((acc, item) => acc + item.quantity, 0)} items)
                  </span>
                  <span className="text-gray-900 font-medium">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold uppercase text-xs tracking-wider">
                    Free
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-black text-gray-900">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-gray-200">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
