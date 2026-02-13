import { Product } from "@/types/product";
import ProductList from "@/components/ProductList";

async function getProducts(): Promise<Product[]> {
  // ISR: Revalidate setiap 60 detik
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Gagal mengambil data");
  return res.json();
}

export default async function Home() {
  const initialProducts = await getProducts();

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <section className="mb-10 border-b-2 border-slate-100 pb-8">
        <p className="mt-2 text-slate-500 font-medium uppercase text-[10px] tracking-[0.2em]">
          Industrial Grade Quality
        </p>
      </section>
      <ProductList initialData={initialProducts} />
    </div>
  );
}
