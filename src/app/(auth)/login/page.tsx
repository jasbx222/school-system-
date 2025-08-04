"use client";

import { FormEvent, useState } from "react";
import { LogIn } from "lucide-react";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import useLogin from "./useLogin";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = { email, password };
  const { login, loading } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(`${process.env.NEXT_PUBLIC_BASE_URL}login`, data);
  };

  return (
    <div className="min-h-screen  from-[#617bbd] via-[#0b1e42] to-[#0a1322] flex items-center justify-center px-4 py-10">
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-2xl bg-white/10 bg-gradient-to-br from-[#0F1A35] via-[#142B56] to-[#3B82F6] backdrop-blur-md border border-white/20 shadow-2xl rounded-xl p-6 sm:p-10 text-white space-y-6 transition-all">

        {/* Logo & Heading */}
        <div className="flex flex-col items-center text-center">
          <Image
            src={logo}
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full border-4 border-yellow-400 shadow-md animate-pulse"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mt-4">
            نظام إدارة المدارس
          </h2>
          <p className="text-sm sm:text-base text-yellow-200">
            تسجيل الدخول إلى النظام
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm sm:text-base">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm sm:text-base">كلمة المرور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 px-4 py-3 rounded-xl font-bold text-base sm:text-lg transition
              ${loading ? "bg-yellow-300 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-300"}
              text-[#0F1A35]`}
          >
            <LogIn size={20} />
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-yellow-200 mt-4">
          © BandTech-Company
        </p>
      </div>
    </div>
  );
}
