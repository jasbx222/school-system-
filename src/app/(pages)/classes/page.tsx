"use client";

import useGetData from "@/app/hooks/useGetData";
import { Building2, Plus } from "lucide-react";

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
    </main>
  );
}
