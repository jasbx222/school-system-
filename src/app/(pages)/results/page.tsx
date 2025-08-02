"use client";

import React, { useState } from "react";
import { Eye, Pencil, Plus, Trash, Trash2 } from "lucide-react";
import useGetOffer from "@/app/hooks/useGetOffer";
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
  } = useGetOffer<Result>(`${process.env.NEXT_PUBLIC_BASE_URL}results`);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const route = useRouter();
  const handleEdit = (id: number) => {
    route.replace(`/results/update/${id}`);
  };
  const { remove } = useDelete();
  const handleDelete = async () => {
    if (selectedId === null) return;
    await remove(`${process.env.NEXT_PUBLIC_BASE_URL}results/${selectedId}`);
    refetch();
    setIsModalOpen(false);
  };

  const handleView = (id: number) => {
    route.replace(`/results/show/${id}`);
  };

  const filteredStudents =
    results?.data.filter((r) =>
      r.student.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (loading) {
    return <p className="p-6 text-lg text-blue-600">جاري التحميل...</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">قائمة النتائج</h1>
        <Link
          href={"/results/add"}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <Plus size={18} />
          إضافة نتيجة
        </Link>
      </div>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="ابحث عن طالب..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // ارجع للصفحة الأولى عند البحث
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0F5BFF] w-full sm:w-80"
        />
      </div>

      {currentStudents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentStudents.map((result) => (
            <div
              key={result.id}
              className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-green-800 mb-3">
                الطالب: <span className="text-gray-800">{result.student}</span>
              </h2>

              <div className="flex justify-between gap-2 pt-4 border-t mt-4">
                <button
                  onClick={() => handleView(result.id)}
                  className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                >
                  <Eye className="w-4 h-4" />
                  عرض
                </button>
                <button
                  onClick={() => handleEdit(result.id)}
                  className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                >
                  <Pencil className="w-4 h-4" />
                  تعديل
                </button>
                <button
                  onClick={() => {
                    setSelectedId(result.id);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
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
