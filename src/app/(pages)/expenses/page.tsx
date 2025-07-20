"use client";

import { BookOpen } from "lucide-react";
import { useMemo, useState } from "react";

interface Expense {
  id: number;
  type: string;
  date: string;
  description: string;
  paymentType: "دفع" | "قبض";
  amount: number;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      type: "لوازم مدرسية",
      date: "2025-07-01",
      description: "شراء دفاتر وأقلام",
      paymentType: "دفع",
      amount: 150000,
    },
    {
      id: 2,
      type: "راتب معلم",
      date: "2025-07-05",
      description: "دفع راتب لشهر يوليو",
      paymentType: "دفع",
      amount: 3000000,
    },
    {
      id: 3,
      type: "تبرع",
      date: "2025-07-10",
      description: "تبرع من ولي أمر",
      paymentType: "قبض",
      amount: 500000,
    },
  ]);

  const netTotal = useMemo(() => {
    const totalReceived = expenses
      .filter((e) => e.paymentType === "قبض")
      .reduce((sum, e) => sum + e.amount, 0);
    const totalPaid = expenses
      .filter((e) => e.paymentType === "دفع")
      .reduce((sum, e) => sum + e.amount, 0);

    return totalReceived - totalPaid;
  }, [expenses]);

  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState<"دفع" | "قبض">("دفع");
  const [amount, setAmount] = useState<number | "">("");

  const resetForm = () => {
    setType("");
    setDate("");
    setDescription("");
    setPaymentType("دفع");
    setAmount("");
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !date || !amount) {
      alert("يرجى تعبئة الحقول الأساسية (النوع، التاريخ، المبلغ)");
      return;
    }

    const newExpense: Expense = {
      id: expenses.length + 1,
      type,
      date,
      description,
      paymentType,
      amount: typeof amount === "string" ? parseFloat(amount) : amount,
    };

    setExpenses((prev) => [...prev, newExpense]);
    resetForm();
    setShowForm(false);
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-[#e6f0ff] to-[#cbdffd] font-cairo font-semibold">
      <h1 className="text-4xl text-center text-[#0F1A35] mb-10 flex items-center justify-center gap-3">
    
        إدارة المصاريف المدرسية
      </h1>

      {/* الصندوق الصافي */}
      <div className="max-w-4xl mx-auto mb-8 bg-white rounded-2xl shadow-xl flex items-center gap-6 p-8 border-l-8 border-[#0F1A35]">
        <BookOpen className="text-[#0F1A35]" size={56} />
        <div className="text-right">
          <p className="text-gray-600 text-lg mb-1 font-semibold">رصيد صندوق المصاريف</p>
          <p
            className={`text-4xl font-extrabold ${
              netTotal >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {netTotal.toLocaleString()} د.ع
          </p>
          <p className="text-sm text-gray-400 italic mt-1">
            {netTotal >= 0
              ? "رصيد إيجابي - أموال متوفرة"
              : "رصيد سلبي - تجاوز المصروفات"}
          </p>
        </div>
      </div>

      {/* زر إضافة مصروف */}
      <div className="flex justify-end max-w-4xl mx-auto mb-6">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-[#0F1A35] hover:bg-[#141f4d] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-transform active:scale-95"
          aria-expanded={showForm}
        >
          + إضافة مصروف
        </button>
      </div>

      {/* نموذج إضافة المصروف */}
      {showForm && (
        <form
          onSubmit={handleAddExpense}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12 space-y-6 border border-[#0F1A35]"
        >
          {/* نوع المصروف */}
          <div className="flex flex-col text-right">
            <label htmlFor="type" className="mb-2 text-[#0F1A35] text-lg font-bold">
              نوع المصروف
            </label>
            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="مثلاً: لوازم مدرسية"
              className="border border-[#0F1A35] rounded-md px-4 py-3 text-right text-[#0F1A35] placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0F1A35] transition"
              required
            />
          </div>

          {/* تاريخ المصروف */}
          <div className="flex flex-col text-right">
            <label htmlFor="date" className="mb-2 text-[#0F1A35] text-lg font-bold">
              تاريخ المصروف
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-[#0F1A35] rounded-md px-4 py-3 text-right text-[#0F1A35] focus:outline-none focus:ring-4 focus:ring-[#0F1A35] transition"
              required
            />
          </div>

          {/* الوصف */}
          <div className="flex flex-col text-right">
            <label htmlFor="description" className="mb-2 text-[#0F1A35] text-lg font-bold">
              الوصف (اختياري)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="شرح بسيط عن المصروف"
              rows={3}
              className="border border-[#0F1A35] rounded-md px-4 py-3 text-right text-[#0F1A35] placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0F1A35] transition resize-none"
            />
          </div>

          {/* نوع العملية */}
          <div className="flex flex-col text-right">
            <label className="mb-2 text-[#0F1A35] text-lg font-bold">نوع العملية</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value as "دفع" | "قبض")}
              className="border border-[#0F1A35] rounded-md px-4 py-3 text-right text-[#0F1A35] focus:outline-none focus:ring-4 focus:ring-[#0F1A35] transition"
            >
              <option value="دفع">دفع</option>
              <option value="قبض">قبض</option>
            </select>
          </div>

          {/* المبلغ */}
          <div className="flex flex-col text-right">
            <label htmlFor="amount" className="mb-2 text-[#0F1A35] text-lg font-bold">
              المبلغ (د.ع)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="مثلاً: 150000"
              className="border border-[#0F1A35] rounded-md px-4 py-3 text-right text-[#0F1A35] placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0F1A35] transition"
              required
              min={0}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#0F1A35] hover:bg-[#141f4d] text-white px-7 py-3 rounded-full shadow-lg transition active:scale-95"
            >
              حفظ المصروف
            </button>
          </div>
        </form>
      )}

      {/* جدول المصاريف */}
      <div className="overflow-x-auto max-w-6xl mx-auto rounded-lg shadow-md bg-white border border-[#0F1A35]">
        <table className="min-w-full text-right border-collapse border border-gray-300">
          <thead className="bg-gradient-to-r from-[#0F1A35] to-[#3a4677] text-white">
            <tr>
              <th className="p-3 border border-[#2c3570]">#</th>
              <th className="p-3 border border-[#2c3570]">نوع المصروف</th>
              <th className="p-3 border border-[#2c3570]">التاريخ</th>
              <th className="p-3 border border-[#2c3570]">الوصف</th>
              <th className="p-3 border border-[#2c3570]">نوع العملية</th>
              <th className="p-3 border border-[#2c3570]">المبلغ (د.ع)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, idx) => (
              <tr
                key={exp.id}
                className={`${
                  idx % 2 === 0 ? "bg-[#e6ebff]" : "bg-white"
                } hover:bg-[#ccd6ff] transition cursor-default`}
              >
                <td className="p-3 border border-[#b4bcdb]">{idx + 1}</td>
                <td className="p-3 border border-[#b4bcdb]">{exp.type}</td>
                <td className="p-3 border border-[#b4bcdb]">{exp.date}</td>
                <td className="p-3 border border-[#b4bcdb] text-gray-700">
                  {exp.description || "-"}
                </td>
                <td
                  className={`p-3 border border-[#b4bcdb] font-semibold ${
                    exp.paymentType === "دفع"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {exp.paymentType}
                </td>
                <td className="p-3 border border-[#b4bcdb] font-semibold text-[#0F1A35]">
                  {exp.amount.toLocaleString()}
                </td>
              </tr>
            ))}
       
          </tbody>
        </table>
      </div>
    </main>
  );
}
