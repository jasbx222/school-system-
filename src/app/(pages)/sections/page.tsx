"use client";

import { PlusCircle, Users2 } from "lucide-react";

export default function ClassSectionsPage() {
  const sections = [
    { id: 1, name: "شعبة أ", className: "الصف الأول", students: 15 },
    { id: 2, name: "شعبة ب", className: "الصف الثاني", students: 13 },
    { id: 3, name: "شعبة ج", className: "الصف الثالث", students: 18 },
  ];

  return (
    <main className="bg-[#F8FAFC] min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0F1A35]">الشعب الدراسية</h1>
          <button className="flex items-center gap-2 bg-[#0F5BFF] hover:bg-[#0849d6] text-white px-4 py-2 rounded-lg shadow transition">
            <PlusCircle size={18} />
            إضافة شعبة
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-[#0F1A35]">
                  {section.name}
                </h2>
                <span className="text-sm text-gray-500">{section.className}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-[#0F1A35]">
                <Users2 size={20} />
                <span>{section.students} طلاب</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
