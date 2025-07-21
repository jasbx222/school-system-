"use client";

import { FormEvent, useState } from "react";
import { LogIn } from "lucide-react";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import useLogin from "./useLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = { email, password };
  const { login, loading } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    login(`${process.env.NEXT_PUBLIC_BASE_URL}login`, data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A35] via-[#142B56] to-[#3B82F6] flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full border-4 border-yellow-400 shadow-lg animate-pulse"
          />
          <h2 className="text-xl font-bold text-yellow-400 mt-3">
            مدرسة المستقبل
          </h2>
          <p className="text-sm text-yellow-200">تسجيل الدخول إلى النظام</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">كلمة المرور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400 text-[#0F1A35] font-bold hover:bg-yellow-300 transition"
          >
            <LogIn size={20} />
            تسجيل الدخول
          </button>
        </form>

        <p className="text-center text-xs text-yellow-200">
          © جميع الحقوق محفوظة - مدرسة المستقبل 2025
        </p>
      </div>
    </div>
  );
}
