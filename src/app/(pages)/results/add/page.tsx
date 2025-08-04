"use client";

import useGetData from "@/app/hooks/useGetData";
import usePost from "@/app/hooks/usePost";
import { StudentsResponse } from "@/app/types/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Select from "react-select";

interface Data {
  id: number;
  title: string;
  class: string;
}
interface Subject {
  data: Data[];
}

const AddResultForm = () => {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [subjects, setSubjects] = useState([{ title: "", degree: "" }]);
  const [success, setSuccess] = useState(false);
  const [examType, setExamType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const type_exam_data = [
    { value: "year", label: "امتحان سنوي" },
    { value: "month", label: "امتحان شهري" },
    { value: "day", label: "امتحان يومي" },
  ];

  const { data: studentsResponse } = useGetData<StudentsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );
  const { data: subjectsResponse } = useGetData<Subject>(
    `${process.env.NEXT_PUBLIC_BASE_URL}subjects`
  );
  const { add } = usePost();

  const handleAddSubject = () => {
    setSubjects([...subjects, { title: "", degree: "" }]);
  };

  const handleChangeSubject = (index: number, field: string, value: string) => {
    const updated = [...subjects];
    updated[index][field as "title" | "degree"] = value;
    setSubjects(updated);
  };

  const handleSelectChange = (selectedOption: any) => {
    setStudentId(selectedOption?.value || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const data = {
      student_id: studentId,
      type_exam: examType,
      subjects: subjects.map((s) => ({
        title: s.title,
        degree: Number(s.degree),
      })),
    };

    try {
      await add(`${process.env.NEXT_PUBLIC_BASE_URL}results`, data);
      setSuccess(true);
      setSubjects([{ title: "", degree: "" }]);
      setStudentId(null);
      setExamType(null);
    } catch (err) {
      console.error("خطأ في الإرسال:", err);
    } finally {
      setLoading(false);
    }
  };

  const studentOptions = studentsResponse?.students.map((s) => ({
    value: s.id,
    label: s.full_name,
  }));

  const subjectOptions = subjectsResponse?.data.map((s) => ({
    value: s.id,
    label: s.title,
  }));

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6">
        إضافة نتيجة طالب
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-3xl p-6 max-w-2xl mx-auto space-y-6"
      >
        {/* الطالب ونوع الامتحان */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <label className="text-sm mb-1 text-blue-900 block">
              الطالب
            </label>
            <Select
              options={studentOptions}
              isClearable
              placeholder="اختر طالبًا..."
              onChange={handleSelectChange}
            />
          </div>

          <div className="w-full">
            <label className="text-sm mb-1 text-blue-900 block">
              نوع الامتحان
            </label>
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

        {/* المواد والدرجات */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-blue-900">
            المواد والدرجات
          </label>

          {subjects.map((subject, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2">
              <div className="w-full">
                <Select
                  options={subjectOptions}
                  isClearable
                  placeholder="اختر المادة..."
                  onChange={(selected: any) =>
                    handleChangeSubject(
                      index,
                      "title",
                      selected ? selected.label : ""
                    )
                  }
                />
              </div>
              <input
                type="number"
                min={0}
                placeholder="الدرجة"
                value={subject.degree}
                onChange={(e) =>
                  handleChangeSubject(index, "degree", e.target.value)
                }
                required
                className="w-full sm:w-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddSubject}
            className="text-sm text-green-700 hover:underline mt-1"
          >
            + إضافة مادة أخرى
          </button>
        </div>

        {/* زر الإرسال */}
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

export default AddResultForm;
