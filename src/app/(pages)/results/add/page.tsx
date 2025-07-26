"use client";

import React, { useState } from "react";

type Result = {
  studentId: number;
  subjectName: string;
  score: number;
  fullScore: number;
  semester: string;
  academicYear: string;
  examType: string;
  notes?: string;
};

export default function Page() {
  const [results, setResults] = useState<Result[]>([]);
  const [form, setForm] = useState({
    studentId: "",
    subjectName: "",
    score: "",
    fullScore: "100",
    semester: "",
    academicYear: "",
    examType: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddResult = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.studentId || !form.subjectName || !form.score || !form.academicYear) {
      alert("يرجى تعبئة الحقول الأساسية: رقم الطالب، اسم المادة، الدرجة، السنة الدراسية");
      return;
    }

    setResults([
      ...results,
      {
        studentId: Number(form.studentId),
        subjectName: form.subjectName,
        score: Number(form.score),
        fullScore: Number(form.fullScore),
        semester: form.semester,
        academicYear: form.academicYear,
        examType: form.examType,
        notes: form.notes,
      },
    ]);

    setForm({
      studentId: "",
      subjectName: "",
      score: "",
      fullScore: "100",
      semester: "",
      academicYear: "",
      examType: "",
      notes: "",
    });
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">إضافة نتائج الطلاب</h1>

      <form onSubmit={handleAddResult} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <input
          type="number"
          name="studentId"
          placeholder="رقم الطالب"
          value={form.studentId}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="subjectName"
          placeholder="اسم المادة"
          value={form.subjectName}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="score"
          placeholder="الدرجة"
          value={form.score}
          onChange={handleChange}
          className="p-2 border rounded"
          required
          min={0}
        />
        <input
          type="number"
          name="fullScore"
          placeholder="الدرجة العظمى"
          value={form.fullScore}
          onChange={handleChange}
          className="p-2 border rounded"
          min={0}
        />
        <input
          type="text"
          name="semester"
          placeholder="الفصل الدراسي"
          value={form.semester}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="academicYear"
          placeholder="السنة الدراسية (مثلاً 2024)"
          value={form.academicYear}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="examType"
          value={form.examType}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">نوع الامتحان (اختياري)</option>
          <option value="نصف السنة">نصف السنة</option>
          <option value="نهاية السنة">نهاية السنة</option>
          <option value="شهري">شهري</option>
          <option value="دور ثاني">دور ثاني</option>
        </select>
        <textarea
          name="notes"
          placeholder="ملاحظات"
          value={form.notes}
          onChange={handleChange}
          className="p-2 border rounded col-span-1 sm:col-span-2"
          rows={2}
        />
        <button
          type="submit"
          className="bg-[#142B56] text-[#fff] rounded py-2 font-bold hover:bg-[#142b5698] transition col-span-1 sm:col-span-2"
        >
          إضافة نتيجة
        </button>
      </form>


    </div>
  );
}
