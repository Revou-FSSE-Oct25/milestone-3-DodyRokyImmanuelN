"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Plus, LogOut, Loader2, Package } from "lucide-react";
import Cookies from "js-cookie";

export default function AdminDashboard() {
  const router = useRouter();
  const { products, setProducts, deleteProduct, loading, setLoading } =
    useProductStore();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const loadInitialData = async () => {
      if (products.length > 0) return;

      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Delete this product?")) {
      deleteProduct(id);
      alert("Deleted.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400 font-mono">
        LOADING_DATABASE...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <div className="flex justify-between items-center mb-8 border-b-2 border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Package size={24} /> INVENTORY
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Logged in as Administrator
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/add">
              <button className="bg-slate-900 text-white px-5 py-2.5 rounded-md text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition shadow-sm">
                <Plus size={16} /> ADD NEW ITEM
              </button>
            </Link>
          </div>
        </div>

        {/* Table*/}
        <div className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Product Details
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded border border-slate-200 p-1">
                        <img
                          src={product.image}
                          className="w-full h-full object-contain"
                          alt=""
                        />
                      </div>
                      <span className="font-semibold text-sm text-slate-700 line-clamp-1 truncate max-w-xs">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">
                    <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/edit/${product.id}`}>
                        <button className="p-2 text-slate-400 hover:text-blue-600 border border-transparent hover:border-blue-100 hover:bg-blue-50 rounded transition">
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-slate-400 hover:text-red-600 border border-transparent hover:border-red-100 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="py-20 text-center text-slate-300 font-mono text-xs">
              NO RECORDS FOUND
            </div>
          )}
        </div>

        <div className="mt-4 text-[10px] text-slate-400 font-mono text-right">
          TOTAL ITEMS: {products.length}
        </div>
      </div>
    </div>
  );
}
