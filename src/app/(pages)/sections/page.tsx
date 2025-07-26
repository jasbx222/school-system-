"use client";

import { FormEvent, useEffect, useState } from "react";
import useGetOffer from "@/app/hooks/useGetOffer";
import { PlusCircle, Users2 } from "lucide-react";
import usePost from "@/app/hooks/usePost";

interface Section {
  id: number;
  title: string;
  students_count: number;
}

interface SectionData {
  sections: Section[];
}

interface Class {
  id: number;
  title: string;
}

interface ClassData {
  classes: Class[];
}

export default function Page() {
  const {
    data: sections,
    loading,
    refetch,
  } = useGetOffer<SectionData>(`${process.env.NEXT_PUBLIC_BASE_URL}sections`);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">
        جاري تحميل البيانات...
      </div>
    );

  return (
    <main className="bg-[#F8FAFC] min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0F1A35]">الشعب الدراسية</h1>
     
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sections?.sections?.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-[#0F1A35]">
                  {section.title}
                </h2>
                <span className="text-sm text-gray-500">{section.title}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-[#0F1A35]">
                <Users2 size={20} />
                <span>{section.students_count} طلاب</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
