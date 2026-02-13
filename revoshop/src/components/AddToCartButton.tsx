"use client";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const handleAdd = () => {
    addToCart(product);
    alert(`"${product.title}" Successfully added to cart!`);
  };
  return (
    <button
      onClick={handleAdd}
      className="w-full md:w-auto px-6 py-3 bg-black text-white rounded hover:opacity-90"
    >
      Add to Cart
    </button>
  );
}
