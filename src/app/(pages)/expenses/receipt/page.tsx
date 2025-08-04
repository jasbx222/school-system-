"use client";

import { useState } from "react";
import Select from "react-select";
import { CalendarDays, DollarSign } from "lucide-react";

const accounts = [
  { label: "أحمد محمد", value: 1 },
  { label: "شركة النور", value: 2 },
  { label: "مصرف الرافدين", value: 3 },
];

const paymentMethods = [
  { label: "نقدًا", value: "cash" },
  { label: "تحويل بنكي", value: "bank" },
  { label: "شيك", value: "cheque" },
];

export default function Page() {
  const [formData, setFormData] = useState({
    account_id: null,
    amount: "",
    date: "",
    payment_method: null,
    document_number: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: any, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Receipt Data:", formData);
    // send to API...
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 rtl text-right"
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-4">إيصال قبض</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          اسم الحساب
        </label>
        <Select
          options={accounts}
          value={formData.account_id}
          onChange={(val) => handleSelectChange(val, "account_id")}
          placeholder="اختر الحساب"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            المبلغ
          </label>
          <div className="relative">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full border rounded-md py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <DollarSign className="absolute top-2.5 right-3 text-gray-400" size={16} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            التاريخ
          </label>
          <div className="relative">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <CalendarDays className="absolute top-2.5 right-3 text-gray-400" size={16} />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          طريقة الدفع
        </label>
        <Select
          options={paymentMethods}
          value={formData.payment_method}
          onChange={(val) => handleSelectChange(val, "payment_method")}
          placeholder="اختر الطريقة"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          رقم المستند
        </label>
        <input
          type="text"
          name="document_number"
          value={formData.document_number}
          onChange={handleChange}
          placeholder="مثال: RC-2025-001"
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          الوصف / ملاحظات
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="اكتب تفاصيل إضافية عن القبض..."
          rows={3}
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
        >
     قبض إيصال
        </button>
      </div>
    </form>
  );
}
