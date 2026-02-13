"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function ProductList({
  initialData,
}: {
  initialData: Product[];
}) {
  const { products, setProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      setProducts(initialData);
    }
  }, [initialData, products.length, setProducts]);

  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
