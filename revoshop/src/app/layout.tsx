"use client"
import Link from "next/link";
import "./globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import Cookies from "js-cookie"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() =>{
    const total = cart.reduce((sum, item) => sum + item.quantity, 0 );
    setCartCount(total);
  }, [cart]);

  const checkLoginStatus = () => {
    const adminCookie = Cookies.get("is_admin");
    setIsLoggedIn(!!adminCookie);
  };

  useEffect(() => {
    checkLoginStatus();
    const interval = setInterval(() => {
      checkLoginStatus();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    Cookies.remove("is_admin", { path: '/' });
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
  };

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="border-b bg-black text-white shadow-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-gray-300">
              RevoShop
            </Link>

            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-gray-300 text-gray-200">Store</Link>
              <Link href="/faq" className="hover:text-gray-300 text-gray-200">FAQ</Link>
              <Link href="/cart" className="relative hover:text-gray-300 text-gray-200 group">
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-3 -right-4 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-black animate-in zoom-in transition-transform group-hover:scale-110">
                    {cartCount}
                  </span>
                )}
              </Link>
              {/* Render Tombol */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="rounded-md border border-gray-600 px-3 py-1.5 text-sm hover:bg-gray-800 transition-colors text-gray-200"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}