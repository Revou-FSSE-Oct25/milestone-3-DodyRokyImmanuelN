import { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12">
      <div className="bg-gray-50 rounded-lg flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-96 object-contain"
        />
      </div>

      <div>
        <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>

        <p className="text-2xl font-bold mb-6">${product.price}</p>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
