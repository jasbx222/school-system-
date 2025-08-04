"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AccountingReportsPage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [account, setAccount] = useState("");

  const reports = [
    {
      id: 1,
      date: "2025-08-04",
      account: "الصندوق الرئيسي",
      description: "قبض من ولي أمر",
      debit: 0,
      credit: 25000,
      balance: 25000,
    },
    {
      id: 2,
      date: "2025-08-05",
      account: "بنك الكفاح",
      description: "سحب رواتب",
      debit: 15000,
      credit: 0,
      balance: 10000,
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans text-gray-800 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-[#1E40AF] drop-shadow-md select-none">
        التقارير المحاسبية
      </h1>

      {/* الفلاتر */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">من تاريخ</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholderText="اختر التاريخ"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">إلى تاريخ</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholderText="اختر التاريخ"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-gray-700">الحساب</label>
          <select
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option value="">كل الحسابات</option>
            <option value="الصندوق الرئيسي">الصندوق الرئيسي</option>
            <option value="بنك الكفاح">بنك الكفاح</option>
          </select>
        </div>
      </section>

      {/* جدول التقارير */}
      <section className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200">
        <table className="min-w-full table-auto text-sm text-right border-collapse">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-50 text-[#1E40AF] font-semibold tracking-wide select-none">
            <tr>
              <th className="px-6 py-4 border-b border-blue-200">التاريخ</th>
              <th className="px-6 py-4 border-b border-blue-200">الحساب</th>
              <th className="px-6 py-4 border-b border-blue-200">الوصف</th>
              <th className="px-6 py-4 border-b border-blue-200 text-red-600">مدين</th>
              <th className="px-6 py-4 border-b border-blue-200 text-green-600">دائن</th>
              <th className="px-6 py-4 border-b border-blue-200 font-bold">الرصيد</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr
                key={report.id}
                className={`transition-colors duration-300 ${
                  idx % 2 === 0 ? "bg-white" : "bg-blue-50"
                } hover:bg-blue-100 cursor-default`}
              >
                <td className="px-6 py-3">{report.date}</td>
                <td className="px-6 py-3">{report.account}</td>
                <td className="px-6 py-3">{report.description}</td>
                <td className="px-6 py-3 text-red-600">{report.debit || "-"}</td>
                <td className="px-6 py-3 text-green-600">{report.credit || "-"}</td>
                <td className="px-6 py-3 font-semibold">{report.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* زر تصدير */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-3 rounded-xl shadow-lg transition-transform active:scale-95 select-none"
          onClick={() => alert("هذه الخاصية تحت التطوير")}
        >
          <Download size={18} />
          تصدير Excel
        </button>
      </div>
    </div>
  );
}
