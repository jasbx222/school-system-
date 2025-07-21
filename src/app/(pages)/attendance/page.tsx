"use client";

import React, { useEffect, useState } from "react";
import { getDecryptedToken } from "@/app/hooks/useDelete";
import useGetOffer from "@/app/hooks/useGetOffer";

interface Student {
  id: number;
  full_name: string; // حسب API
}

interface StudentsResponse {
  students: Student[];
}

const AttendanceManagement = () => {
  const token = getDecryptedToken();

  // جلب الطلاب باستخدام useGetOffer
  const { data: studentsResponse, loading } = useGetOffer<StudentsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );

  const students = studentsResponse?.students ?? [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [attendanceStatus, setAttendanceStatus] = useState<"present" | "absent" | "">("");
  const [message, setMessage] = useState("");

  // تصفية الطلاب حسب البحث
  const filteredStudents = students.filter((student) =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  // دالة تسجيل الحضور / الغياب
  const handleSubmitAttendance = async () => {
    if (!selectedStudentId) {
      setMessage("يرجى اختيار طالب.");
      return;
    }
    if (!attendanceStatus) {
      setMessage("يرجى اختيار حالة الحضور أو الغياب.");
      return;
    }
    if (!token) {
      setMessage("لا يوجد توكن مصادق عليه.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}attendances`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          student_id: selectedStudentId,
          status: attendanceStatus === "present" ? "حاضر" : "غائب",
        }),
      });

      if (!response.ok) {
        throw new Error(`فشل التسجيل: ${response.statusText}`);
      }

      setMessage("تم تسجيل/ بنجاح.");
      setAttendanceStatus("");
      setSelectedStudentId(null);
      setSearchTerm("");
    } catch (error) {
      setMessage(`حدث خطأ: ${error instanceof Error ? error.message : error}`);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">جاري تحميل بيانات الطلاب...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">إدارة الحضور والغياب</h1>

      <input
        type="text"
        placeholder="ابحث عن طالب..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="bg-white rounded-lg shadow p-4 mb-6 max-h-64 overflow-y-auto">
        {filteredStudents.length === 0 ? (
          <p className="text-center text-gray-500">لا يوجد طلاب</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className={`p-2 cursor-pointer hover:bg-blue-100 rounded ${
                  selectedStudentId === student.id ? "bg-blue-200" : ""
                }`}
              >
                {student.full_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedStudent && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">{selectedStudent.full_name}</h2>

          <div className="flex justify-center gap-8 mb-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="present"
                checked={attendanceStatus === "present"}
                onChange={() => setAttendanceStatus("present")}
                className="mr-2"
              />
              حاضر
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="absent"
                checked={attendanceStatus === "absent"}
                onChange={() => setAttendanceStatus("absent")}
                className="mr-2"
              />
              غائب
            </label>
          </div>

          <button
            onClick={handleSubmitAttendance}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            تسجيل
          </button>

          {message && <p className="mt-4 text-red-600">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;
