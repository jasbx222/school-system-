"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  CheckCircle,
  XCircle,
  GraduationCap,
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  grade: string;
  status: "حاضر" | "غائب";
}

export default function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "علي محمد", grade: "الصف السادس", status: "حاضر" },
    { id: 2, name: "زينب علي", grade: "الصف الخامس", status: "غائب" },
    { id: 3, name: "أحمد حسين", grade: "الصف الرابع", status: "حاضر" },
  ]);

  const handleToggleStatus = (id: number, status: "حاضر" | "غائب") => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف الطالب؟")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-[#f4f6fb] to-[#dbe3f7] font-sans text-[#0F1A35] rtl">
      {/* العنوان وزر الإضافة */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
        
          إدارة الطلاب
        </h1>
        <button
          className="bg-[#0F1A35] hover:bg-[#141f4d] text-white px-6 py-3 rounded-lg font-semibold shadow-md flex items-center gap-2 transition"
          aria-label="إضافة طالب جديد"
        >
          <Plus size={20} /> إضافة طالب
        </button>
      </div>

      {/* الجدول */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white border border-[#0F5BFF]">
        <table className="min-w-full text-right table-auto">
          <thead className="bg-[#0F5BFF] text-white rounded-t-lg">
            <tr>
              <th className="p-4 text-sm font-semibold select-none">#</th>
              <th className="p-4 text-sm font-semibold select-none">اسم الطالب</th>
              <th className="p-4 text-sm font-semibold select-none">الصف</th>
              <th className="p-4 text-sm font-semibold select-none">الحالة</th>
              <th className="p-4 text-sm font-semibold select-none">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr
                key={student.id}
                className="border-t border-gray-200 hover:bg-[#e1e6f7] transition cursor-pointer"
                tabIndex={0}
                aria-label={`الطالب ${student.name} في ${student.grade}، الحالة: ${student.status}`}
              >
                <td className="p-4 text-sm">{idx + 1}</td>
                <td className="p-4 font-medium">{student.name}</td>
                <td className="p-4 text-sm">{student.grade}</td>
                <td className="p-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-semibold tracking-wide select-none ${
                      student.status === "حاضر"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                    aria-label={`حالة الطالب: ${student.status}`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="p-4 text-sm space-x-3 space-x-reverse flex justify-end">
                  <button
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
                  </button>
                  <button
                    onClick={() => alert("تعديل الطالب غير مفعّل حالياً")}
                    title="تعديل"
                    className="text-blue-700 hover:text-blue-900 transition"
                    aria-label="تعديل بيانات الطالب"
                  >
                    <Pencil size={22} />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    title="حذف"
                    className="text-red-700 hover:text-red-900 transition"
                    aria-label="حذف الطالب"
                  >
                    <Trash2 size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
