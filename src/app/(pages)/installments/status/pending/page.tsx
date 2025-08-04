"use client";

import { useState } from "react";
import dayjs from "dayjs";
import useGetData from "@/app/hooks/useGetData";
import {
  Plus,
  Download,
  Trash2,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import useDelete from "@/app/hooks/useDelete";
import DeleteModel from "@/app/(components)/(ui)/DeleteModel";
import usePutStatus from "@/app/hooks/usePutClosedMsg";
import Pagination from "@/app/(components)/(ui)/Pagination";

type Part = {
  id: number;
  amount: string;
  due_date: string;
  paid_at: string;
};

type Installment = {
  id: number;
  title: string;
  amount: string;
  student: string;
  status: "pending" | "paid";
  created_at: string;
  parts: Part[];
};

type ApiResponse = {
  data: Installment[];
};

const Page = () => {
  const [isOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: installments, refetch } = useGetData<ApiResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}pending/installments`
  );

  const { remove } = useDelete();
  const { update } = usePutStatus();

  const handleDelete = async () => {
    if (selectedId === null) return;
    await remove(`${process.env.NEXT_PUBLIC_BASE_URL}installments/${selectedId}`);
    refetch();
    setIsModalOpen(false);
  };

  const EditStatus = async (id: number) => {
    await update(`${process.env.NEXT_PUBLIC_BASE_URL}installments/${id}`);
    refetch();
  };

  const exportToPDF = async (id: number) => {
    const node = document.getElementById(`installment-${id}`);
    if (!node) return;
    try {
      const dataUrl = await domtoimage.toPng(node);
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`قسط -${id}.pdf`);
    } catch (error) {
      console.error("PDF Export Error:", error);
    }
  };

  const allData = installments?.data || [];
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const currentData = allData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">قائمة الأقساط</h1>
        <Link
          href={"/installments/add"}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <Plus size={18} />
          إضافة قسط
        </Link>
      </div>

      {currentData.map((inst) => (
        <div
          key={inst.id}
          id={`installment-${inst.id}`}
          className="border rounded-xl shadow-sm p-5 space-y-3 bg-white relative"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {inst.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                الطالب: <span className="font-medium text-gray-700">{inst.student}</span> |
                المبلغ: <span className="font-medium">{inst.amount}</span> |
                الحالة:{" "}
                <span
                  className={`px-2 py-0.5 rounded-full text-white text-xs ${
                    inst.status === "paid" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {inst.status === "paid" ? "مدفوع" : "قيد الانتظار"}
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                تاريخ الإنشاء: {dayjs(inst.created_at).format("YYYY-MM-DD")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <button
                onClick={() => exportToPDF(inst.id)}
                className="bg-gray-100 text-green-500 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm flex items-center gap-1"
              >
                <Download size={16} />
                PDF
              </button>

              <button
                onClick={() => EditStatus(inst.id)}
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm flex items-center gap-1"
              >
                <CheckCircle
                  color={inst.status === "paid" ? "green" : "red"}
                  size={16}
                />
                تحديث القسط
              </button>

              <button
                onClick={() => {
                  setSelectedId(inst.id);
                  setIsModalOpen(true);
                }}
                className="bg-gray-100 text-red-500 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm flex items-center gap-1"
              >
                <Trash2 size={16} />
                حذف
              </button>

              {isOpen && selectedId === inst.id && (
                <DeleteModel
                  id={inst.id}
                  setIsModalOpen={setIsModalOpen}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </div>

{/* // parts of payments  */}
          {inst.parts.length > 0 && (
            <div className="mt-3">
              <p className="font-medium mb-2 text-gray-700">تفاصيل الأجزاء:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="border px-3 py-2">#</th>
                      <th className="border px-3 py-2">المبلغ</th>
                      <th className="border px-3 py-2">تاريخ الاستحقاق</th>
                      <th className="border px-3 py-2">تاريخ الدفع</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {inst.parts.map((part, index) => (
                      <tr key={part.id} className="hover:bg-gray-50">
                        <td className="border px-3 py-2">{index + 1}</td>
                        <td className="border px-3 py-2">{part.amount}</td>
                        <td className="border px-3 py-2">
                          {dayjs(part.due_date).format("YYYY-MM-DD")}
                        </td>
                        <td className="border px-3 py-2">
                          {part.paid_at
                            ? dayjs(part.paid_at).format("YYYY-MM-DD")
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Pagination Controls */}
     <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
};

export default Page;
