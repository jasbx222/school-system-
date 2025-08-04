"use client";

import { useState } from "react";
import { Plus, Pencil, Eye } from "lucide-react";
import { Student, StudentsResponse } from "@/app/types/types";
import useGetData from "@/app/hooks/useGetData";
import Link from "next/link";
import Pagination from "@/app/(components)/(ui)/Pagination";
import Select from "react-select"; // أضف هذا في الأعلى
export default function StudentsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // عدد العناصر في كل صفحة

  const { data: studentsResponse, loading } = useGetData<StudentsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );

  if (loading) return <p className="text-center">جاري التحميل...</p>;

  const students = studentsResponse?.students ?? [];

  const filteredStudents = students.filter((student) =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const studentOptions = students.map((student) => ({
    value: student.id,
    label: student.full_name,
  }));

  const handleSelectChange = (selected: any) => {
    setSearchTerm(selected?.label || "");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="min-h-screen container w-[100%] p-8 bg-gradient-to-br from-[#f4f6fb] to-[#dbe3f7] font-sans text-[#0F1A35] rtl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
        <div className="w-full ">
          <Select
            options={studentOptions}
            isClearable
            placeholder="اختر طالبًا..."
            onChange={handleSelectChange}
          />
        </div>

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
            {currentStudents.map((student, idx) => (
              <tr
                key={student.id}
                className="border-t border-gray-200 hover:bg-[#e1e6f7] transition cursor-pointer"
              >
                <td className="p-4 text-sm">{indexOfFirstItem + idx + 1}</td>
                <td className="p-4 font-medium">{student.full_name}</td>
                <td className="p-4 text-sm">{student.class_room_id ?? "-"}</td>
                <td className="p-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-semibold tracking-wide select-none ${
                      student.status === "مستمر"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="p-4 text-sm flex justify-center gap-4">
                  <Link
                    href={`/students/update/${student.id}`}
                    title="تعديل"
                    className="text-blue-700 hover:text-blue-900 transition"
                  >
                    <Pencil size={22} />
                  </Link>
                  <Link
                    href={`/students/show/${student.id}`}
                    title="تفاصيل"
                    className="text-green-700 hover:text-green-900 transition"
                  >
                    <Eye size={22} />
                  </Link>
                </td>
              </tr>
            ))}
            {currentStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  لا توجد بيانات للعرض
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
