"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/login");
    } else {
      // Fetch products if authorized
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setIsLoading(false);
        });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  };

  if (isLoading)
    return (
      <div className="p-10 text-center text-gray-500">Loading Dashboard...</div>
    );

  return (
    <main className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-800 underline"
          >
            Logout
          </button>
          <button className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
            + Add Product
          </button>
        </div>
      </div>

      <div className="overflow-hidden border rounded-xl bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={product.image}
                    className="w-10 h-10 object-contain rounded"
                    alt=""
                  />
                  <span className="font-medium text-gray-900 truncate max-w-[200px]">
                    {product.title}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-mono">
                  ${product.price}
                </td>
                <td className="px-6 py-4 space-x-4 text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
