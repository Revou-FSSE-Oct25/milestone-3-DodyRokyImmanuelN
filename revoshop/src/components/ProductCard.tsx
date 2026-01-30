import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="flex h-full flex-col rounded-lg border bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        {/* Image */}
        <div className="mb-4 flex h-40 items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          <h2 className="mb-2 line-clamp-2 text-sm font-medium text-gray-800">
            {product.title}
          </h2>

          <p className="mt-auto text-base font-semibold text-gray-900">
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}
