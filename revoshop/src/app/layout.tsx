import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
