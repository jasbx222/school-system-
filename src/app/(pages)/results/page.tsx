"use client";

import React, { useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import useGetData from "@/app/hooks/useGetData";
import Pagination from "@/app/(components)/(ui)/Pagination";
import { useRouter } from "next/navigation";
import useDelete from "@/app/hooks/useDelete";
import DeleteModel from "@/app/(components)/(ui)/DeleteModel";
import Link from "next/link";

interface Data {
  id: number;
  student: string;
}
interface Result {
  data: Data[];
}

const Page = () => {
  const [isOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: results,
    loading,
    refetch,
  } = useGetData<Result>(`${process.env.NEXT_PUBLIC_BASE_URL}results`);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const route = useRouter();

  const { remove } = useDelete();

  const handleEdit = (id: number) => {
    route.replace(`/results/update/${id}`);
  };

  const handleView = (id: number) => {
    route.replace(`/results/show/${id}`);
  };

  const handleDelete = async () => {
    if (selectedId === null) return;
    await remove(`${process.env.NEXT_PUBLIC_BASE_URL}results/${selectedId}`);
    refetch();
    setIsModalOpen(false);
  };

  const filteredStudents =
    results?.data.filter((r) =>
      r.student.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <p className="p-6 text-lg text-blue-600">جاري التحميل...</p>;
  }

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          قائمة النتائج
        </h1>

        <Link
          href="/results/add"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <Plus size={18} />
          إضافة نتيجة
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="ابحث عن طالب..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Results */}
      {currentStudents.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentStudents.map((result) => (
            <div
              key={result.id}
              className="bg-white rounded-2xl shadow-md p-5  hover:shadow-xl transtion-all"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-2">
                الطالب:{" "}
                <span className="text-gray-800 font-medium">
                  {result.student}
                </span>
              </h2>

              <div className="flex flex-wrap gap-2 pt-4 border-t mt-4">
                <button
                  onClick={() => handleView(result.id)}
                  className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                >
                  <Eye size={16} />
                  عرض
                </button>

                <button
                  onClick={() => handleEdit(result.id)}
                  className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                >
                  <Pencil size={16} />
                  تعديل
                </button>

                <button
                  onClick={() => {
                    setSelectedId(result.id);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                >
                  <Trash2 size={16} />
                  حذف
                </button>

                {isOpen && selectedId === result.id && (
                  <DeleteModel
                    id={result.id}
                    setIsModalOpen={setIsModalOpen}
                    handleDelete={handleDelete}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10 text-lg">
          لا يوجد نتائج مطابقة.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
