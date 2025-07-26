"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useGetOffer from "@/app/hooks/useGetOffer";
import usePost from "@/app/hooks/usePost";
import { OffersResponseItems, StudentsResponse } from "@/app/types/types";
import useUpdate from "@/app/hooks/useUpdate";

export default function EditDiscountPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: students } = useGetOffer<StudentsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );
  const { data: discount } = useGetOffer<OffersResponseItems>(
    `${process.env.NEXT_PUBLIC_BASE_URL}offers/${id}`
  );

  const [selectedStudent, setSelectedStudent] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const { update } = useUpdate(); 

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      student_id: selectedStudent,
      value: amount,
      note: reason,
    };

    await update(`${process.env.NEXT_PUBLIC_BASE_URL}offers/${id}`, body); 
    router.push("/discounts"); 
  };

  return (
    <main className="p-10 bg-gray-100 min-h-screen" dir="rtl">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#0F5BFF]">تعديل الخصم</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">الطالب</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">-- اختر الطالب --</option>
              {students?.students.map((s) => (
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
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
