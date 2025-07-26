"use client";

import { useEffect, useState } from "react";
import usePost from "@/app/hooks/usePost";
import useGetOffer from "@/app/hooks/useGetOffer";
import { Plus } from "lucide-react";
import Link from "next/link";
import DeleteModel from "@/app/(components)/(ui)/DeleteModel";
import useDelete from "@/app/hooks/useDelete";
import { InvoiceResponse, Option } from "@/app/types/types";



export default function InvoicesPage() {
  const [studentId, setStudentId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [value, setValue] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { add } = usePost();
  const { remove } = useDelete();
  const handleDelete = async (id: number) => {
      await remove(`${process.env.NEXT_PUBLIC_BASE_URL}invoices/${id}`);
    setIsModalOpen(false);
    refetch();
  };
  const { data: invoices, refetch } = useGetOffer<InvoiceResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}invoices`
  );

  const { data: students } = useGetOffer<{ students: Option[] }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      student_id: studentId,
      number,
      value,
    };
    await add(`${process.env.NEXT_PUBLIC_BASE_URL}invoices`, body);
    refetch();
    setShowForm(false);
    setStudentId("");
    setNumber("");
    setValue("");
  };

  return (
    <main className="p-10 bg-gray-100 min-h-screen" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">الفواتير</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#0F5BFF] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#0d4cd1]"
        >
          <Plus size={18} />
          إضافة فاتورة
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-10 grid gap-4 md:grid-cols-2"
        >
          <div>
            <label className="block font-semibold mb-1">الطالب</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">اختر الطالب</option>
              {students?.students?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.full_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">رقم الفاتورة</label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">قيمة الفاتورة</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="col-span-2 text-left">
            <button
              type="submit"
              className="bg-[#0F5BFF] text-white px-6 py-2 rounded-full hover:bg-[#0d4cd1]"
            >
              حفظ الفاتورة
            </button>
          </div>
        </form>
      )}

      {/* جدول الفواتير */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-gradient-to-l from-blue-100 to-blue-200 text-[#0F5BFF]">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">رقم الفاتورة</th>
              <th className="p-4">الطالب</th>
              <th className="p-4">المدرسة</th>
              <th className="p-4">القيمة</th>
              <th className="p-4">تاريخ الإنشاء</th>
              <th className="p-4"> التحكم</th>
            </tr>
          </thead>
          <tbody>
            {invoices?.data?.map((inv) => (
              <tr key={inv.id} className="border-t hover:bg-blue-50">
                <td className="p-4">{inv.id}</td>
                <td className="p-4">{inv.number}</td>
                <td className="p-4">{inv.student_name}</td>
                <td className="p-4">{inv.school_name}</td>
                <td className="p-4 text-green-600 font-semibold">
                  {parseFloat(inv.value).toLocaleString()} د.ع
                </td>
                <td className="p-4 text-gray-500 text-xs">
                  {new Date(inv.created_at).toLocaleString("ar-IQ")}
                </td>
                <td>
                  <td className="p-4 flex items-center justify-center gap-2">
                    <Link
                      href={`/invoice/update/${inv.id}`}
                      className="text-xs bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full transition"
                      title="تعديل"
                    >
                      تعديل
                    </Link>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                      className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition"
                      title="حذف"
                    >
                      حذف
                    </button>
                    {isModalOpen && (
                      <DeleteModel
                        id={inv.id}
                        handleDelete={handleDelete}
                        setIsModalOpen={setIsModalOpen}
                      />
                    )}
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
