"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Image as ImageIcon, Sparkles } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addProduct } = useProductStore();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.image) {
      alert("Please fill in all required fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          price: parseFloat(formData.price),
          description: formData.description,
          image: formData.image,
          category: formData.category,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        const productToSave = {
          ...formData,
          id: Date.now(),
          price: parseFloat(formData.price),
          rating: { rate: 0, count: 0 },
        };
        addProduct(productToSave);

        alert("Success! Product added.");
        router.refresh();
        router.push("/admin");
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#1A1C1E] py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section*/}
        <div className="mb-10 flex items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-all mb-4 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Inventory
            </Link>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              New Product <Sparkles className="text-yellow-500" size={28} />
            </h1>
          </div>
          <p className="text-sm text-gray-400 font-medium hidden md:block">
            Fill in the details to list a new item.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-xl border-2 border-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 block mb-2">
                    Official Product Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-lg focus:bg-white focus:border-black transition-all outline-none font-medium placeholder:text-gray-300"
                    placeholder="e.g. Vintage Overcoat 1990s"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 block mb-2">
                    Detailed Description
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-lg focus:bg-white focus:border-black transition-all outline-none font-medium resize-none placeholder:text-gray-300"
                    placeholder="Describe the materials, fit, and condition..."
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] grid grid-cols-2 gap-6">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 block mb-2">
                  Price (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-lg focus:bg-white focus:border-black transition-all outline-none font-bold"
                    placeholder="0.00"
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 block mb-2">
                  Category
                </label>
                <select
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-lg focus:bg-white focus:border-black transition-all outline-none font-bold appearance-none cursor-pointer"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                </select>
              </div>
            </div>
          </div>

          {/*Media & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 block mb-4">
                Product Image
              </label>

              <div className="aspect-square w-full rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden relative group">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon
                      className="mx-auto text-gray-300 mb-2"
                      size={40}
                    />
                    <p className="text-xs text-gray-400 font-medium">
                      Preview will appear here
                    </p>
                  </div>
                )}
              </div>

              <input
                type="url"
                required
                className="w-full mt-4 px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-black outline-none"
                placeholder="Paste Image URL..."
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A1C1E] text-white py-4 rounded-xl font-bold text-sm hover:bg-black transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 group"
            >
              {loading ? (
                "Publishing..."
              ) : (
                <>
                  Publish Product
                  <Plus
                    size={18}
                    className="group-hover:rotate-90 transition-transform"
                  />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-gray-400 leading-relaxed px-4">
              By publishing, this product will be immediately visible in the
              public storefront.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
