"use client";

import React, { useState } from "react";
import { Pen, Trash } from "lucide-react";
import useGetData from "@/app/hooks/useGetData";
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
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [isOpenForm, setIsModalFormOpen] = useState(false);
  const [isOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: subjects, refetch } = useGetData<Subject>(
    `${process.env.NEXT_PUBLIC_BASE_URL}subjects`
  );

  const classOptions = Array.from(
    new Set(subjects?.data.map((s) => s.class))
  ).map((cls) => ({
    value: cls,
    label: cls,
  }));

  const subjectOptions = subjects?.data.map((sub) => ({
    value: sub.id,
    label: sub.title,
  }));

  const filteredSubjects = subjects?.data.filter((sub) => {
    const matchesTitle = sub.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? sub.class === selectedClass : true;
    return matchesTitle && matchesClass;
  });

  const { remove } = useDelete();
  const deleteSubject = async (id: number) => {
    await remove(`${process.env.NEXT_PUBLIC_BASE_URL}subjects/${id}`);
    setLoading(true);
    refetch();
    setLoading(false);
  };

  const handleSubjectChange = (selected: any) => {
    setSearchTerm(selected?.label || "");
  };

  const handleClassChange = (selected: any) => {
    setSelectedClass(selected?.value || null);
  };

  return (
    <div className="p-4 sm:p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 text-center">
        إدارة المواد الدراسية
      </h1>

      {/* الفلاتر */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
        <div>
          <label className="text-sm block mb-1 text-blue-900">الصف</label>
          <Select
            options={classOptions}
            isClearable
            placeholder="اختر الصف..."
            onChange={handleClassChange}
          />
        </div>

        <div>
          <label className="text-sm block mb-1 text-blue-900">اسم المادة</label>
          <Select
            options={subjectOptions}
            isClearable
            placeholder="اختر مادة..."
            onChange={handleSubjectChange}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              setIsModalFormOpen(true);
              setSelectedId(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          >
            + إضافة مادة
          </button>
        </div>
      </div>

      {/* نموذج إضافة مادة */}
      {isOpenForm && (
        <AddSubjectsForm
          setIsModalFormOpen={setIsModalFormOpen}
          refetch={refetch}
        />
      )}

      {/* جدول المواد */}
      {loading ? (
        <p className="text-center text-gray-600">جاري التحميل...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
          <table className="min-w-full text-right">
            <thead className="bg-blue-200 text-blue-800">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">اسم المادة</th>
                <th className="p-3">الصف</th>
                <th className="p-3 text-center">الإجراءات</th>
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
                    <td className="p-3">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => {
                            setSelectedId(subject.id);
                            setIsModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-700 flex items-center gap-1"
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

                        <Link
                          href={`/subjects/edit/${subject.id}`}
                          className="text-green-500 hover:text-green-700 flex items-center gap-1"
                        >
                          <Pen size={18} />
                          تعديل
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
