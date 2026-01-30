"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Empty Bucket</h1>
        <Link href="/" className="text-blue-500 underline mt-4 block">
          Back to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex gap-4 border-b pb-4 items-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1">
              <h2 className="font-bold">{item.title}</h2>
              <p>${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
