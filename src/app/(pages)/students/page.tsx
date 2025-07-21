"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  CheckCircle,
  XCircle,
  GraduationCap,
  Eye,
} from "lucide-react";
import useGet from "@/app/hooks/useGet";
import { Student, StudentsResponse } from "@/app/types/types";
import useGetOffer from "@/app/hooks/useGetOffer";
import Link from "next/link";

export default function StudentsTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: studentsResponse, loading } = useGetOffer<StudentsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );

  if (loading) return <p>جاري التحميل...</p>;

  const students = studentsResponse?.students ?? [];
  const filterstudents = (studentsResponse?.students ?? []).filter((student) =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Students data:", students);

  const handleToggleStatus = (id: number, status: "حاضر" | "غائب") => {
    // هنا تكتب منطق تعديل الحالة
    alert(`تغيير حالة الطالب ${id} إلى ${status} (غير مفعّل حالياً)`);
  };

  const handleDelete = (id: number) => {
    // هنا تكتب منطق حذف الطالب
    alert(`حذف الطالب ${id} (غير مفعّل حالياً)`);
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-[#f4f6fb] to-[#dbe3f7] font-sans text-[#0F1A35] rtl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
        <input
          type="text"
          placeholder="ابحث عن طالب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0F5BFF] w-full sm:w-64"
        />

        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          إدارة الطلاب
        </h1>
        <Link
          href={"/students/add"}
          className="bg-[#0F1A35] hover:bg-[#141f4d] text-white px-6 py-3 rounded-lg font-semibold shadow-md flex items-center gap-2 transition"
          aria-label="إضافة طالب جديد"
        >
          <Plus size={20} /> إضافة طالب
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white border border-[#0F5BFF]">
        <table className="min-w-full text-right table-auto">
          <thead className="bg-[#0F5BFF] text-white rounded-t-lg">
            <tr>
              <th className="p-4 text-sm font-semibold select-none">#</th>
              <th className="p-4 text-sm font-semibold select-none">
                اسم الطالب
              </th>
              <th className="p-4 text-sm font-semibold select-none">الصف</th>
              <th className="p-4 text-sm font-semibold select-none">الحالة</th>
              <th className="p-4 text-sm font-semibold select-none text-center">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {filterstudents?.map((student, idx) => (
              <tr
                key={student.id}
                className="border-t border-gray-200 hover:bg-[#e1e6f7] transition cursor-pointer"
                tabIndex={0}
                aria-label={`الطالب ${student.full_name}، الحالة: ${student.gender}`}
              >
                <td className="p-4 text-sm">{idx + 1}</td>
                <td className="p-4 font-medium">{student.full_name}</td>
                <td className="p-4 text-sm">
                  {/* حقل الصف غير موجود مباشرة، ممكن تحط رقم القسم أو فصل */}
                  {student.class_room_id ?? "-"}
                </td>
                <td className="p-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-semibold tracking-wide select-none ${
                      student.status === "مستمر"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                    aria-label={`حالة الطالب: ${student.status}`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="p-4 text-sm space-x-6 space-x-reverse  flex justify-center items-center gap-4">
                  {/* <button
                    onClick={() => handleToggleStatus(student.id, "حاضر")}
                    title="تسجيل حضور"
                    className="text-green-600 hover:text-green-900 transition"
                    aria-label="تسجيل حضور"
                  >
                    <CheckCircle size={22} />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(student.id, "غائب")}
                    title="تسجيل غياب"
                    className="text-yellow-500 hover:text-yellow-800 transition"
                    aria-label="تسجيل غياب"
                  >
                    <XCircle size={22} />
                  </button> */}
                  <button
                    onClick={() => alert("تعديل الطالب غير مفعّل حالياً")}
                    title="تعديل"
                    className="text-blue-700 hover:text-blue-900 transition"
                    aria-label="تعديل بيانات الطالب"
                  >
                    <Pencil size={22} />
                  </button>

                  <Link
                    href={`/students/show/${student.id}`}
                    title="تفاصيل"
                    className="text-green-700 hover:text-green-900 transition"
                    aria-label="تفاصيل الطالب"
                  >
                    <Eye size={22} />
                  </Link>
                </td>
              </tr>
            ))}
            {students?.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  لا توجد بيانات للعرض
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
