"use client";

import { FormEvent, useState } from "react";
import useGetData from "@/app/hooks/useGetData";
import { Building2, Plus } from "lucide-react";
import usePost from "@/app/hooks/usePost";

interface Class {
  id: number;
  title: string;
  students_count: number;
}

interface ClassData {
  classes: Class[];
}

export default function Page() {
  const {
    data: classes,
    loading,
    refetch,
  } = useGetData<ClassData>(`${process.env.NEXT_PUBLIC_BASE_URL}classes`);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">
        جاري تحميل البيانات...
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f8ff] to-[#e0e7ff] p-6">
      <div className="container mx-auto max-w-7xl">
        {/* العنوان وزر الإضافة */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0F1A35]">إدارة الصفوف</h1>
        </div>

        {/* بطاقات الصفوف */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {classes?.classes.map((cls) => (
            <div
              key={cls.id}
              className="flex items-center gap-4 rounded-lg border-r-8 border-[#0F5BFF] bg-white p-5 shadow-md transition-all hover:shadow-lg"
            >
              <Building2 className="text-[#0F5BFF]" size={32} />
              <div className="w-full text-right">
                <p className="text-sm text-gray-500">الصف</p>
                <p className="text-lg font-semibold">{cls.title}</p>
                <p className="mt-1 text-sm text-gray-400">
                  عدد الطلاب: {cls.students_count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* نافذة منبثقة */}
      {/* {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-[#0F1A35] mb-4">إضافة صف جديد</h2>
            <input
              type="text"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              placeholder="أدخل اسم الصف"
              className="w-full rounded-lg border border-gray-300 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0F5BFF]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddClass}
                className="px-4 py-2 rounded-lg bg-[#0F5BFF] text-white hover:bg-[#0c4be0]"
              >
                حفظ الصف
              </button>
            </div>
          </div>
        </div>
      )} */}
    </main>
  );
}
