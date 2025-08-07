"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import useGetData from "@/app/hooks/useGetData";
import {
  OffersResponseItems,
  StudentsResponse,
} from "@/app/types/types";
import usePost from "@/app/hooks/usePost";
import useDelete from "@/app/hooks/useDelete";
import Link from "next/link";
import Select from "react-select";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [studentId, setStudentId] = useState<string | null>("");

  const { data: student } = useGetData<StudentsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );

  const studentOptions = student?.students.map((student) => ({
    value: student.id,
    label: student.full_name,
  }));

  const handleSelectChange = (selectedOption: any) => {
    setStudentId(selectedOption ? selectedOption.value : null);
  };

  const {
    data: discounts,
    refetch,
  } = useGetData<OffersResponseItems>(
    `${process.env.NEXT_PUBLIC_BASE_URL}offers`
  );

  const { add } = usePost();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      student_id: studentId,
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
    setIsModalOpen(false);
  };

  return (
    <main className="p-4 sm:p-10   container w-full bg-gray-100 min-h-screen" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">الخصومات</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#0F5BFF] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#0d4cd1]"
        >
          <Plus size={18} />
          إضافة خصم
        </button>
      </div>

      {/* جدول الخصومات متجاوب */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto border border-gray-200">
        <table className="w-full  text-right">
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
                  <Link
                    href={`/discounts/update/${d.id}`}
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
                  {isModalOpen && selectedId === d.id && (
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

      {/* فورم منبثقة لإضافة خصم */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0000001e] bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-6">إضافة خصم</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full">
                <Select
                  options={studentOptions}
                  isClearable
                  placeholder="اختر طالبًا..."
                  onChange={handleSelectChange}
                />
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
