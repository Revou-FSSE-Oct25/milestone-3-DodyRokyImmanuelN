"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useProductStore } from "@/store/useProductStore";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { updateProduct, products } = useProductStore();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  useEffect(() => {
    const loadProduct = async () => {
      const foundLocal = products.find((p) => p.id.toString() === id);

      if (foundLocal) {
        setFormData({
          title: foundLocal.title,
          price: foundLocal.price.toString(),
          description: foundLocal.description,
          category: foundLocal.category,
          image: foundLocal.image,
        });
        setLoading(false);
      } else {
        try {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (res.ok) {
            const data = await res.json();
            setFormData({
              title: data.title,
              price: data.price.toString(),
              description: data.description,
              category: data.category,
              image: data.image,
            });
          }
        } catch (err) {
          console.error("Gagal ambil data API", err);
        } finally {
          setLoading(false);
        }
      }
    };
    loadProduct();
  }, [id, products]);
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    updateProduct(Number(id), {
      ...formData,
      price: parseFloat(formData.price),
    });

    alert("Product updated successfully in Global State!");
    router.push("/admin");
    setSaving(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
        <div className="flex items-center gap-3 font-bold text-gray-400 animate-pulse">
          Fetching product data...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#1A1C1E] py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-all mb-4 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Return to Inventory
            </Link>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              Edit{" "}
            </h1>
          </div>
        </div>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {/*FORM DATA */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.03)]">
              <div className="space-y-6">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-3">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    required
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-black transition-all outline-none font-bold text-lg"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-3">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    required
                    rows={6}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-black transition-all outline-none font-medium leading-relaxed resize-none"
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.03)] grid grid-cols-2 gap-8">
              <div>
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-3">
                  Price (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-300">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    required
                    className="w-full pl-10 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-black transition-all outline-none font-black text-xl"
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-3">
                  Category Tag
                </label>
                <select
                  value={formData.category}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-black transition-all outline-none font-bold appearance-none cursor-pointer"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                </select>
              </div>
            </div>
          </div>

          {/*PREVIEW & ACTION */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.03)]">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-4 text-center">
                Visual Identity
              </label>

              <div className="aspect-square w-full rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden mb-6">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-contain p-6 mix-blend-multiply"
                  />
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon
                      className="mx-auto text-gray-200 mb-2"
                      size={48}
                    />
                    <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest">
                      No Asset Loaded
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <input
                  type="url"
                  value={formData.image}
                  required
                  className="w-full px-4 py-3 text-xs bg-gray-50 border border-gray-100 rounded-lg focus:ring-1 focus:ring-black outline-none font-mono"
                  placeholder="Image URL source..."
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#1A1C1E] text-white py-5 rounded-2xl font-black text-sm hover:bg-black transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 group border-b-4 border-gray-900"
              >
                {saving ? "Processing..." : <>Save Changes </>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
