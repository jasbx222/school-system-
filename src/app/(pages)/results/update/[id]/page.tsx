"use client";

import useGetData from "@/app/hooks/useGetData";
import usePost from "@/app/hooks/usePost";
import useShow from "@/app/hooks/useShow";
import useUpdate from "@/app/hooks/useUpdate";
import { StudentsResponse } from "@/app/types/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
interface Subject {
  name: string;
  degree: number;
}
interface Data {
  id: number;
  student: string;
  student_id:number;
  type_exam: string;
  subjects: Subject[];
}
interface Result {
  data: Data;
}
const Page = () => {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [subjects, setSubjects] = useState([{ name: "", degree: "" }]);
  const [success, setSuccess] = useState(false);
  const [examType, setExamType] = useState<string | null>(null);
  const { id } = useParams();
  const type_exam_data = [
    { value: "year", label: "امتحان سنوي" },
    { value: "month", label: "امتحان شهري" },
    { value: "day", label: "امتحان يومي" },
  ];
  const { data: result } = useGetData<Result>(
    `${process.env.NEXT_PUBLIC_BASE_URL}results/${id}`,
  
  );
  const [loading, setLoading] = useState(false);

  const { data: studentsResponse } = useGetData<StudentsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );

  const { update } = useUpdate();

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "", degree: "" }]);
  };

  const handleChangeSubject = (index: number, field: string, value: string) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field as "name" | "degree"] = value;
    setSubjects(updatedSubjects);
  };

  const handleSelectChange = (selectedOption: any) => {
    setStudentId(selectedOption ? selectedOption.value : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const data = {
      student_id: studentId,
      type_exam: examType,
      subjects: subjects.map((s) => ({
        name: s.name,
        degree: Number(s.degree),
      })),
    };

    try {
      await update(`${process.env.NEXT_PUBLIC_BASE_URL}results/${id}`, data);
      setSuccess(true);
      setSubjects([{ name: "", degree: "" }]);
      setStudentId(null);
    } catch (error) {
      console.error("حدث خطأ أثناء الإرسال:", error);
    } finally {
      setLoading(false);
    }
  };

  const studentOptions = studentsResponse?.students.map((student) => ({
    value: student.id,
    label: student.full_name,
  }));
useEffect(() => {
  if (result?.data) {
    setStudentId(result.data.student_id.toString());
    setExamType(result.data.type_exam);
    setSubjects(result.data.subjects.map((subject) => ({
      name: subject.name,
      degree: subject.degree.toString(),
    })));
  }
}, [result]);
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        إضافة نتيجة طالب
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-3xl p-6 max-w-2xl mx-auto space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
          <div className="w-full sm:w-64">
            <Select
              options={studentOptions}
              isClearable
              placeholder="اختر طالبًا..."
              onChange={handleSelectChange}
            />
          </div>

          <div className="w-full sm:w-64">
            <Select
              options={type_exam_data}
              isClearable
              placeholder="اختر نوع الامتحان..."
              onChange={(selected: any) =>
                setExamType(selected ? selected.value : null)
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-blue-900">
            المواد والدرجات
          </label>
          {subjects.map((subject, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="اسم المادة"
                value={subject.name }
                onChange={(e) =>
                  handleChangeSubject(index, "name", e.target.value)
                }
                required
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              />
              <input
                type="number"
                placeholder="الدرجة"
                value={subject.degree}
                onChange={(e) =>
                  handleChangeSubject(index, "degree", e.target.value)
                }
                required
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              />
            </div>



          ))}
          <button
            type="button"
            onClick={handleAddSubject}
            className="mt-2 text-sm text-green-700 hover:underline"
          >
            + إضافة مادة
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "جاري الإرسال..." : "إرسال النتيجة"}
        </button>

        {success && (
          <p className="text-green-600 text-center mt-4">
            ✅ تم إرسال البيانات بنجاح!
          </p>
        )}
      </form>
    </div>
  );
};

export default Page;
