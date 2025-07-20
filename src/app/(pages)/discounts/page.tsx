"use client";

import { useState } from "react";

export default function DiscountsPage() {
  const [students] = useState([
    { id: 1, name: "علي محمد" },
    { id: 2, name: "زينب علي" },
    { id: 3, name: "أحمد حسين" },
  ]);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudent || !amount) {
      alert("يرجى اختيار الطالب وإدخال قيمة الخصم");
      return;
    }

    console.log({
      student_id: selectedStudent,
      amount,
      reason,
    });

    setSuccess(true);
    setSelectedStudent("");
    setAmount("");
    setReason("");

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e0e7ff] to-[#f5f9ff] p-8 flex flex-col items-center font-sans">
      <h1 className="text-3xl font-extrabold text-[#0F1A35] mb-10 w-full max-w-xl text-right">
        إضافة خصم لطالب
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-8"
        dir="rtl"
      >
        {/* الطالب */}
        <div className="flex flex-col gap-2">
          <label className="text-[#0F1A35] font-semibold text-lg">الطالب</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 text-right text-base focus:outline-none focus:ring-4 focus:ring-[#0F5BFF] transition"
            aria-label="اختيار الطالب"
          >
            <option value="">-- اختر الطالب --</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {/* قيمة الخصم */}
        <div className="flex flex-col gap-2">
          <label className="text-[#0F1A35] font-semibold text-lg">
            قيمة الخصم (د.ع)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="أدخل قيمة الخصم"
            className="border border-gray-300 rounded-lg p-3 text-right text-base placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0F5BFF] transition"
            aria-label="قيمة الخصم"
          />
        </div>

        {/* السبب */}
        <div className="flex flex-col gap-2">
          <label className="text-[#0F1A35] font-semibold text-lg">السبب (اختياري)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="مثلاً: ظروف عائلية، تفوق دراسي ..."
            rows={5}
            className="border border-gray-300 rounded-lg p-3 text-right text-base placeholder-gray-400 resize-none focus:outline-none focus:ring-4 focus:ring-[#0F5BFF] transition"
            aria-label="سبب الخصم"
          />
        </div>

        {/* زر الحفظ */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#0F5BFF] hover:bg-[#0d4cd1] text-white font-bold py-3 px-10 rounded-full shadow-lg transition-transform active:scale-95"
            aria-label="حفظ الخصم"
          >
            حفظ الخصم
          </button>
        </div>

        {/* رسالة نجاح */}
        {success && (
          <div className="text-green-700 bg-green-100 border border-green-400 rounded-md py-3 px-5 text-right flex items-center gap-2 shadow-md animate-fade-in">
            ✅ تم حفظ الخصم بنجاح!
          </div>
        )}
      </form>
    </main>
  );
}
