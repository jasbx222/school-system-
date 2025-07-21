"use client";

import { Save } from "lucide-react";

export default function AddCostPage() {
  return (
    <main className="bg-[#F8FAFC] min-h-screen p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-[#0F1A35] text-center">
          إضافة تكلفة
        </h2>

        {/* الفصل الدراسي */}
        <div className="space-y-1">
          <label className="block text-[#0F1A35] font-medium">الفصل الدراسي *</label>
          <select
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-[#0F5BFF] p-2"
            defaultValue=""
          >
            <option value="" disabled>
              اختر الفصل
            </option>
            <option value="1">الفصل الأول</option>
            <option value="2">الفصل الثاني</option>
          </select>
        </div>

        {/* الصف */}
        <div className="space-y-1">
          <label className="block text-[#0F1A35] font-medium">الصف *</label>
          <select
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-[#0F5BFF] p-2"
            defaultValue=""
          >
            <option value="" disabled>
              اختر الصف
            </option>
            <option value="1">الصف الأول</option>
            <option value="2">الصف الثاني</option>
            <option value="3">الصف الثالث</option>
          </select>
        </div>

        {/* التكلفة */}
        <div className="space-y-1">
          <label className="block text-[#0F1A35] font-medium">التكلفة *</label>
          <input
            type="number"
            placeholder="أدخل المبلغ"
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-[#0F5BFF] p-2"
          />
        </div>

        {/* زر حفظ */}
        <button className="w-full bg-[#0F5BFF] hover:bg-[#0849d6] text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition">
          <Save size={18} />
          حفظ التكلفة
        </button>
      </div>
    </main>
  );
}
