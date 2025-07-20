"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Search } from "lucide-react";

interface Student {
  id: number;
  name: string;
  attendance: {
    hadir: number;
    ghaib: number;
  };
}

const studentsData: Student[] = [
  { id: 1, name: "علي محمد", attendance: { hadir: 18, ghaib: 2 } },
  { id: 2, name: "زينب علي", attendance: { hadir: 16, ghaib: 4 } },
  { id: 3, name: "أحمد حسين", attendance: { hadir: 20, ghaib: 0 } },
  { id: 4, name: "مريم صالح", attendance: { hadir: 19, ghaib: 1 } },
  { id: 5, name: "خالد عباس", attendance: { hadir: 15, ghaib: 5 } },
];

export default function AttendanceManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  const filteredStudents = studentsData.filter((student) =>
    student.name.includes(searchTerm)
  );

  const selectedStudent = studentsData.find((s) => s.id === selectedStudentId);

  const total = selectedStudent
    ? selectedStudent.attendance.hadir + selectedStudent.attendance.ghaib
    : 0;
  const hadirPercent = total ? (selectedStudent!.attendance.hadir / total) * 100 : 0;
  const ghaibPercent = total ? (selectedStudent!.attendance.ghaib / total) * 100 : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e0f2fe] to-[#f8fafc] p-8 flex flex-col items-center font-sans">
      <h1 className="text-3xl font-bold mb-10 text-blue-900"> إدارة التفقد</h1>

      {/* حقل البحث */}
      <div className="w-full max-w-md mb-8 relative">
        <label
          htmlFor="search"
          className="block mb-2 text-right font-semibold text-blue-800"
        >
          ابحث عن طالب
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedStudentId(null); // امسح الطالب المختار اذا غيرنا البحث
            }}
            placeholder="اكتب اسم الطالب..."
            className="w-full rounded-lg border border-blue-300 px-4 py-3 pr-10 text-right text-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
            autoComplete="off"
          />
          <Search
            size={20}
            className="absolute top-3.5 right-3 text-blue-400 pointer-events-none"
          />
        </div>

        {/* قائمة الاقتراحات */}
        {searchTerm && filteredStudents.length > 0 && (
          <ul className="absolute z-10 w-full max-h-52 overflow-auto bg-white border border-blue-300 rounded-b-lg shadow-md mt-1 text-right">
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                onClick={() => {
                  setSelectedStudentId(student.id);
                  setSearchTerm(student.name);
                }}
              >
                {student.name}
              </li>
            ))}
          </ul>
        )}

        {searchTerm && filteredStudents.length === 0 && (
          <p className="absolute z-10 w-full bg-white border border-blue-300 rounded-b-lg shadow-md mt-1 px-4 py-2 text-gray-500 text-right">
            لا يوجد طلاب مطابقين
          </p>
        )}
      </div>

      {/* عرض بيانات الطالب */}
      {selectedStudent ? (
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 space-y-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
            بيانات الحضور لـ {selectedStudent.name}
          </h2>

          <div className="flex flex-col md:flex-row justify-around items-center gap-8">
            <div className="flex flex-col items-center bg-green-50 rounded-lg p-6 w-48 shadow-inner">
              <CheckCircle2 size={48} className="text-green-600 mb-3" />
              <span className="text-4xl font-bold text-green-700">
                {selectedStudent.attendance.hadir}
              </span>
              <p className="text-green-700 font-medium mt-1">عدد مرات الحضور</p>
            </div>

            <div className="flex flex-col items-center bg-red-50 rounded-lg p-6 w-48 shadow-inner">
              <XCircle size={48} className="text-red-600 mb-3" />
              <span className="text-4xl font-bold text-red-700">
                {selectedStudent.attendance.ghaib}
              </span>
              <p className="text-red-700 font-medium mt-1">عدد مرات الغياب</p>
            </div>
          </div>

          <div>
            <p className="text-center font-semibold text-blue-900 mb-2">
              نسبة الحضور والغياب %
            </p>
            <div className="w-full bg-blue-100 rounded-full h-8 overflow-hidden shadow-inner flex">
              <div
                className="bg-green-500 h-full transition-all duration-700"
                style={{ width: `${hadirPercent}%` }}
                title={`الحضور: ${hadirPercent.toFixed(1)}%`}
              />
              <div
                className="bg-red-500 h-full transition-all duration-700"
                style={{ width: `${ghaibPercent}%` }}
                title={`الغياب: ${ghaibPercent.toFixed(1)}%`}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-700 px-1">
              <span>حضور {hadirPercent.toFixed(1)}%</span>
              <span>غياب {ghaibPercent.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-8 text-center text-lg">
          يرجى البحث واختيار طالب لعرض معلومات الحضور والغياب.
        </p>
      )}
    </main>
  );
}
