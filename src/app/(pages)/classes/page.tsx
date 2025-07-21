"use client";

import { PlusCircle, Building2 } from "lucide-react";

export default function Page() {
  const classes = [
    { name: "الأول ابتدائي", students: 30 },
    { name: "الثاني ابتدائي", students: 28 },
    { name: "الثالث ابتدائي", students: 26 },
    { name: "الرابع ابتدائي", students: 32 },
    { name: "الخامس ابتدائي", students: 27 },
    { name: "السادس ابتدائي", students: 31 },
  ];

  return (
    <main className="p-6 bg-gradient-to-br from-[#f5f8ff] to-[#e0e7ff] min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#0F1A35]">إدارة الصفوف</h1>
          <button className="flex items-center gap-2 bg-[#0F5BFF] hover:bg-[#0849d6] text-white px-4 py-2 rounded-lg shadow transition">
            <PlusCircle size={18} />
            إضافة صف جديد
          </button>
        </div>

        {/* Grid of classes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {classes.map((cls, i) => (
            <div
              key={i}
              className="bg-white border-r-8 border-[#0F5BFF] p-5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-4"
            >
              <Building2 className="text-[#0F5BFF]" size={32} />
              <div className="text-right w-full">
                <p className="text-gray-500 text-sm">الصف</p>
                <p className="text-lg font-semibold">{cls.name}</p>
                <p className="text-sm mt-1 text-gray-400">
                  عدد الطلاب: {cls.students}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
