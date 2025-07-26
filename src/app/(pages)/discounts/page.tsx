"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import useGetOffer from "@/app/hooks/useGetOffer";
import {
  OffersResponseItems,
  Student,
  StudentsResponse,
} from "@/app/types/types";
import usePost from "@/app/hooks/usePost";
import useDelete from "@/app/hooks/useDelete";
import Link from "next/link";

export default function DiscountsPage() {
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // بيانات الفورم
  const [selectedStudent, setSelectedStudent] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const { data: student } = useGetOffer<StudentsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );
  const {
    data: discounts,
    loading,
    refetch,
  } = useGetOffer<OffersResponseItems>(
    `${process.env.NEXT_PUBLIC_BASE_URL}offers`
  );

  const { add } = usePost();
  // حفظ خصم جديد
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      student_id: selectedStudent,
      value: amount,
      note: reason,
    };
    await add(`${process.env.NEXT_PUBLIC_BASE_URL}offers`, body);
    refetch();
    setShowModal(false);
  };

  const { remove } = useDelete();
  const handleDelete = async (id: number) => {
    await remove(`${process.env.NEXT_PUBLIC_BASE_URL}offers/${id}`);
    refetch();
    setIsModalOpen(false)
  };

  return (
    <main className="p-10 bg-gray-100 min-h-screen" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">الخصومات</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#0F5BFF] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#0d4cd1]"
        >
          <Plus size={18} />
          إضافة خصم
        </button>
      </div>

      {/* جدول الخصومات */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full text-right table-fixed">
          <thead className="bg-gradient-to-l from-[#E3F2FD] to-[#BBDEFB] text-[#0F5BFF]">
            <tr className="text-sm font-bold">
              <th className="p-4 w-12">#</th>
              <th className="p-4">اسم الطالب</th>
              <th className="p-4">المبلغ</th>
              <th className="p-4">السبب</th>
              <th className="p-4 w-32">التحكم</th>
            </tr>
          </thead>
          <tbody>
            {discounts?.data?.map((d, i) => (
              <tr
                key={d.id}
                className={`text-sm border-t border-gray-100 hover:bg-blue-50 transition ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-4 text-gray-600">{d.id}</td>
                <td className="p-4 font-medium text-gray-800">
                  {d.student || <span className="text-gray-400">—</span>}
                </td>
                <td className="p-4 text-green-600 font-semibold">
                  {d.value} د.ع
                </td>
                <td className="p-4 text-gray-700">{d.note || "—"}</td>
                <td className="p-4 flex items-center justify-center gap-2">
                  <Link href={`/discounts/update/${d.id}`}
                    className="text-xs bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full transition"
                    title="تعديل"
                  >
                    تعديل
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedId(d.id);
                      setIsModalOpen(true);
                    }}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition"
                    title="حذف"
                  >
                    حذف
                  </button>
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
                      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm text-center space-y-4">
                        <h2 className="text-lg font-bold text-gray-800">
                          تأكيد الحذف
                        </h2>
                        <p className="text-gray-600 text-sm">
                          هل أنت متأكد أنك تريد حذف هذا العنصر؟ لا يمكن التراجع.
                        </p>
                        <div className="flex justify-center gap-3 mt-4">
                          <button
                            onClick={() => handleDelete(d.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                          >
                            نعم، احذف
                          </button>
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                          >
                            إلغاء
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* فورم منبثقة */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-6">إضافة خصم</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">الطالب</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">-- اختر الطالب --</option>
                  {student?.students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold">قيمة الخصم</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="مثال: 10000"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">السبب</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="مثلاً: تفوق دراسي، ظروف عائلية..."
                />
              </div>

              <div className="text-left">
                <button
                  type="submit"
                  className="bg-[#0F5BFF] text-white px-6 py-2 rounded-full hover:bg-[#0d4cd1]"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
