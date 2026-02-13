"use client"; // Kita ubah ke Client Component agar bisa akses Zustand
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useProductStore } from "@/store/useProductStore"; // Store CRUD kamu
import { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const localProduct = products.find((p) => String(p.id) === String(id));

      if (localProduct) {
        setProduct(localProduct);
        setLoading(false);
      } else {
        try {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (res.ok) {
            const apiData = await res.json();
            setProduct(apiData);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDetail();
  }, [id, products]);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">
        LOADING_SYSTEM_DATA...
      </div>
    );
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* IMAGE SECTION*/}
          <div className="bg-white rounded-[2rem] p-12 aspect-square flex items-center justify-center group shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* INFO SECTION */}
          <div className="flex flex-col space-y-8 pt-4">
            <div className="space-y-2">
              <span className="text-white text-xs font-bold uppercase tracking-[0.3em] opacity-50">
                {product.category}
              </span>
              <h1 className="text-5xl font-black text-white tracking-tighter leading-[0.9]">
                {product.title}
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-5xl font-light text-white tracking-tighter">
                ${product.price}
              </span>
              <div className="h-10 w-[1px] bg-zinc-800" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                  In Stock
                </span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                  Free Worldwide Shipping
                </span>
              </div>
            </div>

            <div className="space-y-4 border-t border-zinc-900 pt-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                Description
              </h3>
              <p className="text-zinc-500 leading-relaxed text-sm max-w-md italic">
                "{product.description}"
              </p>
            </div>

            {/* ACTION */}
            <div className="pt-6">
              <AddToCartButton product={product} />
            </div>

            {/*FOOTER */}
            <div className="pt-12 flex items-center justify-between border-t border-zinc-900">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest">
                  Product ID: {product.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
