"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      document.cookie = "is_admin=true; path=/; max-age=86400; SameSite=Strict";
      router.push("/admin");
    } else {
      setError("Password salah. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 selection:bg-zinc-900 selection:text-white">
      <div className="w-full max-w-[400px]">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 space-y-8"
        >
          {/* Header Section */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 text-white mb-2 shadow-xl shadow-zinc-200">
              <LockKeyhole size={28} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed">
              input security key
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 ml-1">
                Security Key
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 px-5 py-3.5 text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-900 focus:bg-white transition-all duration-300"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                <p className="text-xs font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-2xl bg-zinc-900 px-6 py-4 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:bg-zinc-800 active:scale-[0.98]"
            >
              <span className="relative z-10">Masuk ke Dashboard</span>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Footer Card */}
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
            Secure Encryption Active
          </p>
        </form>
      </div>
    </div>
  );
}
