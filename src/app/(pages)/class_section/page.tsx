"use client";

import React, { useState } from "react";
import { PlusCircle, X, School } from "lucide-react";

interface ClassItem {
  id: number;
  name: string;
  teacher: string;
  studentsCount: number;
  notes?: string;
}

export default function Page() {
  const [classes, setClasses] = useState<ClassItem[]>([
    { id: 1, name: "الصف الأول", teacher: "أ. أحمد", studentsCount: 25 },
    { id: 2, name: "الصف الثاني", teacher: "أ. سارة", studentsCount: 28 },
    { id: 3, name: "الصف الثالث", teacher: "أ. محمد", studentsCount: 22 },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [studentsCount, setStudentsCount] = useState<number | "">("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setName("");
    setTeacher("");
    setStudentsCount("");
    setNotes("");
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !teacher || !studentsCount) {
      alert("يرجى تعبئة الحقول الأساسية (اسم الفصل، المعلم، عدد الطلاب)");
      return;
    }
    const newClass: ClassItem = {
      id: classes.length + 1,
      name,
      teacher,
      studentsCount: Number(studentsCount),
      notes,
    };
    setClasses((prev) => [...prev, newClass]);
    resetForm();
    setShowForm(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f8ff] to-[#e0e7ff] p-6 font-cairo">
      <div className="max-w-7xl mx-auto">
        {/* العنوان */}
        <h1 className="text-3xl font-extrabold text-[#0F5BFF] mb-8 flex items-center gap-3 justify-center">
          <School size={40} />
          إدارة الفصول الدراسية
        </h1>

        {/* زر إضافة فصل */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#0F5BFF] hover:bg-[#0a47d1] text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <PlusCircle size={24} />
            إضافة فصل جديد
          </button>
        </div>

        {/* عرض الفصول */}
        <section>
          {/* للعرض على الشاشات الكبيرة: جدول */}
          <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg bg-white border border-[#0F5BFF]">
            <table className="min-w-full text-right border-collapse border border-gray-300">
              <thead className="bg-gradient-to-r from-[#0F5BFF] to-[#3a67bb] text-white">
                <tr>
                  <th className="p-4 border border-[#2c3570]">#</th>
                  <th className="p-4 border border-[#2c3570]">اسم الفصل</th>
                  <th className="p-4 border border-[#2c3570]">المعلم المسؤول</th>
                  <th className="p-4 border border-[#2c3570]">عدد الطلاب</th>
                  <th className="p-4 border border-[#2c3570]">ملاحظات</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls, idx) => (
                  <tr
                    key={cls.id}
                    className={`${
                      idx % 2 === 0 ? "bg-[#e6ebff]" : "bg-white"
                    } hover:bg-[#ccd6ff] transition cursor-default`}
                  >
                    <td className="p-4 border border-[#b4bcdb]">{idx + 1}</td>
                    <td className="p-4 border border-[#b4bcdb] font-semibold">{cls.name}</td>
                    <td className="p-4 border border-[#b4bcdb]">{cls.teacher}</td>
                    <td className="p-4 border border-[#b4bcdb]">{cls.studentsCount}</td>
                    <td className="p-4 border border-[#b4bcdb] text-gray-600 italic">
                      {cls.notes || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* للعرض على الشاشات الصغيرة: كروت */}
          <div className="md:hidden flex flex-col gap-5">
            {classes.map((cls, idx) => (
              <div
                key={cls.id}
                className="bg-white rounded-xl shadow-md p-5 border border-[#0F5BFF] hover:shadow-lg transition"
                role="region"
                aria-label={`فصل ${cls.name}`}
              >
                <h3 className="text-xl font-bold text-[#0F5BFF] mb-2">{cls.name}</h3>
                <p>
                  <span className="font-semibold">المعلم: </span> {cls.teacher}
                </p>
                <p>
                  <span className="font-semibold">عدد الطلاب: </span> {cls.studentsCount}
                </p>
                <p className="italic text-gray-600 mt-2">
                  {cls.notes ? cls.notes : "لا توجد ملاحظات"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* نموذج الإضافة (مودال) */}
        {showForm && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-class-title"
          >
            <form
              onSubmit={handleAddClass}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2
                  id="add-class-title"
                  className="text-2xl font-extrabold text-[#0F5BFF]"
                >
                  إضافة فصل جديد
                </h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-red-500 transition"
                  aria-label="إغلاق النموذج"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col text-right">
                <label
                  htmlFor="className"
                  className="mb-2 font-semibold text-[#0F5BFF]"
                >
                  اسم الفصل*
                </label>
                <input
                  id="className"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="مثلاً: الصف الأول"
                  className="border border-[#0F5BFF] rounded-md px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#0F5BFF]"
                />
              </div>

              <div className="flex flex-col text-right">
                <label
                  htmlFor="teacher"
                  className="mb-2 font-semibold text-[#0F5BFF]"
                >
                  المعلم المسؤول*
                </label>
                <input
                  id="teacher"
                  type="text"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  required
                  placeholder="اسم المعلم"
                  className="border border-[#0F5BFF] rounded-md px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#0F5BFF]"
                />
              </div>

              <div className="flex flex-col text-right">
                <label
                  htmlFor="studentsCount"
                  className="mb-2 font-semibold text-[#0F5BFF]"
                >
                  عدد الطلاب*
                </label>
                <input
                  id="studentsCount"
                  type="number"
                  min={1}
                  value={studentsCount}
                  onChange={(e) =>
                    setStudentsCount(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  required
                  placeholder="مثلاً: 25"
                  className="border border-[#0F5BFF] rounded-md px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#0F5BFF]"
                />
              </div>

              <div className="flex flex-col text-right">
                <label
                  htmlFor="notes"
                  className="mb-2 font-semibold text-[#0F5BFF]"
                >
                  ملاحظات (اختياري)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أي ملاحظات إضافية"
                  rows={3}
                  className="border border-[#0F5BFF] rounded-md px-4 py-2 text-right resize-none focus:outline-none focus:ring-2 focus:ring-[#0F5BFF]"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-5 py-2 rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-[#0F5BFF] text-white px-5 py-2 rounded-md shadow-md hover:bg-[#0a47d1] transition"
                >
                  إضافة
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
