"use client";

import { Product } from "@/types/product";
import { addToCart } from "@/lib/cart";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full md:w-auto px-6 py-3 bg-black text-white rounded hover:opacity-90"
    >
      Add to Cart
    </button>
  );
}
