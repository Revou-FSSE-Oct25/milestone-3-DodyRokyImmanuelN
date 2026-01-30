import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="border-b bg-black text-white shadow-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            {/* Brand */}
            <Link
              href="/"
              className="text-xl font-bold tracking-tight hover:text-gray-300"
            >
              RevoShop
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-gray-300 text-gray-200">
                Store
              </Link>

              <Link href="/faq" className="hover:text-gray-300 text-gray-200">
                FAQ
              </Link>

              <Link href="/cart" className="hover:text-gray-300 text-gray-200">
                Cart
              </Link>
              <Link
                href="/login"
                className="rounded-md border border-gray-600 px-3 py-1.5 text-sm hover:bg-gray-800 transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
