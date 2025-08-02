"use client";

import React, { useEffect, useState } from "react";
import { Pen, Trash } from "lucide-react";
import useGetOffer from "@/app/hooks/useGetOffer";
import Select from "react-select";
import useDelete from "@/app/hooks/useDelete";
import DeleteModel from "@/app/(components)/(ui)/DeleteModel";
import AddSubjectsForm from "./AddSubjectsForm";
import Link from "next/link";

interface Data {
  id: number;
  title: string;
  class: string;
}
interface Subject {
  data: Data[];
}

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsModalOpen] = useState(false);
  const [isOpenForm, setIsModalFormOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: subjects, refetch } = useGetOffer<Subject>(
    `${process.env.NEXT_PUBLIC_BASE_URL}subjects`
  );

  // استخراج الصفوف بدون تكرار
  const classOptions = Array.from(
    new Set(subjects?.data.map((s) => s.class))
  ).map((cls) => ({
    value: cls,
    label: cls,
  }));

  // خيارات المواد (إذا بقيت موجودة لسبب ما)
  const subjectOptions = subjects?.data.map((sub) => ({
    value: sub.id,
    label: sub.title,
  }));

  // تصفية المواد حسب الاسم والصف معًا
  const filteredSubjects = subjects?.data.filter((sub) => {
    const matchesTitle = sub.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? sub.class === selectedClass : true;
    return matchesTitle && matchesClass;
  });

  const handleSubjectChange = (selected: any) => {
    setSearchTerm(selected?.label || "");
  };

  const handleClassChange = (selected: any) => {
    setSelectedClass(selected?.value || null);
  };
  const { remove } = useDelete();
  const deleteSubject = async (id: number) => {
    await remove(`${process.env.NEXT_PUBLIC_BASE_URL}subjects/${id}`);
    setLoading(true);
    refetch();
    setLoading(false);
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        إدارة المواد الدراسية
      </h1>

      <div className=" grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="w-full ">
          <Select
            options={classOptions}
            isClearable
            placeholder="اختر الصف..."
            onChange={handleClassChange}
          />
        </div>

        <div className="w-full ">
          <Select
            options={subjectOptions}
            isClearable
            placeholder="اختر مادة..."
            onChange={handleSubjectChange}
          />
        </div>
        {/* add button to add subject  */}
        <div className="w-full md:w-full flex justify-end">
          <button
            onClick={() => {
              setIsModalFormOpen(true);
              setSelectedId(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            إضافة مادة
          </button>
        </div>
      </div>
      {isOpenForm && (
        <AddSubjectsForm
          setIsModalFormOpen={setIsModalFormOpen}
          refetch={refetch}
        />
      )}
      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        <table className="w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-blue-200 text-blue-800 text-right">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">اسم المادة</th>
              <th className="p-3">الصف</th>
              <th
                className="p-3 
text-center
              
              "
              >
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects?.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  لا توجد مواد مطابقة
                </td>
              </tr>
            ) : (
              filteredSubjects?.map((subject, index) => (
                <tr key={subject.id} className="hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{subject.title}</td>
                  <td className="p-3">{subject.class}</td>
                  <td className="p-3 flex justify-center items-center gap-4">
                    <button
                      onClick={() => {
                        setSelectedId(subject.id);
                        setIsModalOpen(true);
                      }}
                      className="text-red-500 
                      cursor-pointer
                       hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash size={18} />
                      حذف
                    </button>
                     {isOpen && selectedId === subject.id && (
                    <DeleteModel
                      id={subject.id}
                      setIsModalOpen={setIsModalOpen}
                      handleDelete={deleteSubject}
                    />
                  )}
                    <Link href={`/subjects/edit/${subject.id}`} className="text-green-500  cursor-pointer hover:text-green-700 flex items-center gap-1">
                      <Pen size={18} />
                      تعديل
                    </Link>
                  </td>
                 
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Page;
