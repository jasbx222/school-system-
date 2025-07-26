"use client";

import React, { FormEvent, useState } from "react";
import { PlusCircle, School } from "lucide-react";
import useGetOffer from "@/app/hooks/useGetOffer";
import usePost from "@/app/hooks/usePost";

interface SemsterItem {
  id: number;
  title: string;
  from: string;
  to?: string;
  students_count: number;
}
interface Semester {
  semesters: SemsterItem[];
}

export default function Page() {
  const {
    data: classes,
    loading,
    refetch,
  } = useGetOffer<Semester>(`${process.env.NEXT_PUBLIC_BASE_URL}semesters`);
  // const { add } = usePost();
  // const [showModal, setShowModal] = useState(false);
  // const [title, setTitle] = useState("");
  // const [fromDate, setFromDate] = useState("");
  // const [toDate, setToDate] = useState("");

  // const handleAddSemester = async (e: FormEvent) => {
  //   e.preventDefault();
  //   const data = {
  //     title: title,
  //     from: fromDate,
  //     to: toDate,
  //   };
  //   await add(`${process.env.NEXT_PUBLIC_BASE_URL}semesters`, data);
  //   refetch();

  //   setShowModal(false);
  //   setTitle("");
  //   setFromDate("");
  //   setToDate("");
  // };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f8ff] to-[#e0e7ff] p-6 font-cairo">
      <div className="max-w-7xl mx-auto">
        {/* العنوان وزر الإضافة */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-[#0F5BFF] flex items-center gap-3">
            <School size={40} />
            إدارة الفصول الدراسية
          </h1>
         
        </div>

        {loading ? (
          <p className="text-center text-lg text-gray-500">
            جارٍ تحميل البيانات...
          </p>
        ) : (
          <section>
            {/* جدول للشاشات الكبيرة */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg bg-white border border-[#0F5BFF]">
              <table className="min-w-full text-right border-collapse border border-gray-300">
                <thead className="bg-gradient-to-r from-[#0F5BFF] to-[#3a67bb] text-white">
                  <tr>
                    <th className="p-4 border border-[#2c3570]">#</th>
                    <th className="p-4 border border-[#2c3570]">
                      الفصل الدراسي
                    </th>
                    <th className="p-4 border border-[#2c3570]">من</th>
                    <th className="p-4 border border-[#2c3570]">إلى</th>
                    <th className="p-4 border border-[#2c3570]">عدد الطلاب</th>
                  </tr>
                </thead>
                <tbody>
                  {classes?.semesters?.map((cls, idx) => (
                    <tr
                      key={cls.id}
                      className={`${
                        idx % 2 === 0 ? "bg-[#e6ebff]" : "bg-white"
                      } hover:bg-[#ccd6ff] transition cursor-default`}
                    >
                      <td className="p-4 border border-[#b4bcdb]">{idx + 1}</td>
                      <td className="p-4 border border-[#b4bcdb] font-semibold">
                        {cls.title}
                      </td>
                      <td className="p-4 border border-[#b4bcdb]">
                        {cls.from}
                      </td>
                      <td className="p-4 border border-[#b4bcdb]">{cls.to}</td>
                      <td className="p-4 border border-[#b4bcdb] text-gray-600 italic">
                        {cls.students_count || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* كروت للموبايل */}
            <div className="md:hidden flex flex-col gap-5">
              {classes?.semesters?.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white rounded-xl shadow-md p-5 border border-[#0F5BFF] hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold text-[#0F5BFF] mb-2">
                    {cls.title}
                  </h3>
                  <p>
                    <span className="font-semibold">من: </span> {cls.from}
                  </p>
                  <p>
                    <span className="font-semibold">إلى: </span> {cls.to}
                  </p>
                  <p className="italic text-gray-600 mt-2">
                    عدد الطلاب: {cls.students_count}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Modal */}
      {/* {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-[#0F1A35]">
              إضافة فصل دراسي جديد
            </h2>

            <input
              type="text"
              placeholder="عنوان الفصل الدراسي"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#0F5BFF]"
            />
            <input
              type="date"
              placeholder="من تاريخ"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#0F5BFF]"
            />
            <input
              type="date"
              placeholder="إلى تاريخ"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#0F5BFF]"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddSemester}
                className="px-4 py-2 rounded-lg bg-[#0F5BFF] text-white hover:bg-[#0c4be0]"
              >
                حفظ الفصل
              </button>
            </div>
          </div>
        </div>
      )} */}
    </main>
  );
}
