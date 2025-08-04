"use client";

import ButtonBack from "@/app/(components)/(ui)/ButtonBack";
import useDelete from "@/app/hooks/useDelete";
import useGetData from "@/app/hooks/useGetData";
import { Student } from "@/app/types/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
type Record ={
  hadir:number
  ghaib: number
}
export default function StudentDetails() {
  const { id } = useParams();
  const [mssg, setMessg] = useState("");

  const { data, loading } = useGetData<{ student: Student }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students/${id}`
  );


  const { remove } = useDelete();

  const handleDelete = () => {
    remove(`${process.env.NEXT_PUBLIC_BASE_URL}delete/student/${id}`);
    setMessg("✅ تم حذف الطالب بنجاح.");
  };

  const student = data?.student ?? null;

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-[#f4f6fb] to-[#dbe3f7]">
        <p className="text-lg font-semibold text-[#0F1A35]">
          جاري تحميل بيانات الطالب...
        </p>
      </main>
    );

  if (!student)
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-[#f4f6fb] to-[#dbe3f7]">
        <p className="text-gray-600 font-semibold">
          لم يتم العثور على بيانات الطالب.
        </p>
      </main>
    );

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-[#f4f6fb] to-[#dbe3f7] rtl font-sans text-[#0F1A35]">
      {mssg && (
        <div className="max-w-2xl mx-auto mb-4 p-4 bg-green-100 text-green-700 rounded-md text-center font-semibold shadow">
          {mssg}
        </div>
      )}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-center">تفاصيل الطالب</h1>

        <div className="flex justify-center mb-6">
          {student.profile_image_url ? (
            <img
              src={student.profile_image_url}
              alt={`صورة ${student.full_name}`}
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
              لا توجد صورة
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-right text-sm sm:text-base">
          {[
            { label: "الاسم الكامل", value: student.full_name },
            { label: "اسم الأم", value: student.mother_name },
            { label: "رقم المدرسة", value: student.school_id },
            {
              label: "الحالة",
              value: (
                <span
                  className={`inline-block px-3 py-1 rounded-full font-semibold tracking-wide select-none ${
                    student.status === "مستمر"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {student.status}
                </span>
              ),
            },
            { label: "الجنس", value: student.gender },
            { label: "يتيم", value: student.orphan },
            { label: "أقارب شهداء", value: student.has_martyrs_relatives },
            { label: "المدرسة السابقة", value: student.last_school },
            { label: "الفصل الدراسي", value: student.semester_id },
            { label: "الصف", value: student.class_room_id },
            { label: "الشعبة", value: student.class_section_id },
            { label: "تاريخ الميلاد", value: student.birth_day },
            { label: "رقم العرض", value: student.offer_id ?? "-" },
            {
              label: "تاريخ الإنشاء",
              value: new Date(student.created_at).toLocaleDateString("ar-EG"),
            },
            {
              label: "تاريخ التحديث",
              value: new Date(student.updated_at).toLocaleDateString("ar-EG"),
            },
          ].map(({ label, value }, index) => (
            <div key={index}>
              <strong>{label}:</strong>
              <p>{value}</p>
            </div>
          ))}

          <div className="sm:col-span-2">
            <strong>الوصف:</strong>
            <p className="whitespace-pre-wrap">{student.description}</p>
          </div>

          <div className="sm:col-span-2">
            <strong>الملف:</strong>
            {student.file ? (
              <a
                href={student.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                عرض الملف
              </a>
            ) : (
              <p>لا يوجد ملف مرفق</p>
            )}
          </div>

        
        </div>

        <div className="mt-8 text-center grid grid-cols-2 gap-5">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow"
          >
            حذف الطالب
          </button>
          <Link
          href={`/attendance/show/${student.id}`}
       
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow"
          >
      تفاصيل الحضور والغياب
          </Link>
        </div>
      </div>
    </main>
  );
}
