"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col items-center justify-center p-6 sm:p-10 text-center font-sans">
      {/* صورة رمزية */}
      <Image
        src="/school.png" 
        alt="School System"
        width={160}
        height={160}
        className="mb-6"
      />

      {/* العنوان */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-900 mb-4">
        مرحباً بك في نظام إدارة المدرسة
      </h1>

      {/* وصف مختصر */}
      <p className="text-lg sm:text-xl text-gray-700 max-w-xl mb-8">
        نظام عصري وسهل الاستخدام يساعدك في إدارة المدرسة بكفاءة واحترافية.
      </p>

      {/* زر دخول */}
      <button
        onClick={() => router.push("/dashboard")} // غيّر المسار حسب نظامك
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl text-lg shadow-md"
      >
       الصفحة الرئيسية
      </button>

      {/* الفوتر */}
      <footer className="text-sm text-gray-400 mt-16">
        © 2025 نظام المدرسة | جميع الحقوق محفوظة
      </footer>
    </div>
  );
}
