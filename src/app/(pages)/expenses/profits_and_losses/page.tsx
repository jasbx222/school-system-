"use client";

import { useState } from "react";

export default function ProfitLossPage() {
  // بيانات وهمية للإيرادات والمصروفات
  const revenues = [
    { id: 1, name: "الإيرادات من الرسوم", amount: 75000 },
    { id: 2, name: "إيرادات الخدمات", amount: 32000 },
    { id: 3, name: "تبرعات", amount: 10000 },
  ];

  const expenses = [
    { id: 1, name: "رواتب الموظفين", amount: 40000 },
    { id: 2, name: "مصاريف تشغيلية", amount: 15000 },
    { id: 3, name: "صيانة", amount: 5000 },
    { id: 4, name: "إعلانات وتسويق", amount: 3000 },
  ];

  // حساب مجموع الإيرادات والمصروفات
  const totalRevenue = revenues.reduce((acc, cur) => acc + cur.amount, 0);
  const totalExpense = expenses.reduce((acc, cur) => acc + cur.amount, 0);

  const netProfit = totalRevenue - totalExpense; // صافى الربح (أو الخسارة إذا سالبة)

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-gray-800 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-[#1E40AF] mb-8">تقرير الأرباح والخسائر</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* الإيرادات */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4 border-b border-green-300 pb-2">
            الإيرادات
          </h2>
          <ul className="space-y-3">
            {revenues.map((rev) => (
              <li key={rev.id} className="flex justify-between text-gray-700 font-medium">
                <span>{rev.name}</span>
                <span>{rev.amount.toLocaleString()} د.ع</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-green-300 pt-3 text-green-800 font-bold text-lg flex justify-between">
            <span>إجمالي الإيرادات</span>
            <span>{totalRevenue.toLocaleString()} د.ع</span>
          </div>
        </section>

        {/* المصروفات */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-red-700 mb-4 border-b border-red-300 pb-2">
            المصروفات
          </h2>
          <ul className="space-y-3">
            {expenses.map((exp) => (
              <li key={exp.id} className="flex justify-between text-gray-700 font-medium">
                <span>{exp.name}</span>
                <span>{exp.amount.toLocaleString()} د.ع</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-red-300 pt-3 text-red-800 font-bold text-lg flex justify-between">
            <span>إجمالي المصروفات</span>
            <span>{totalExpense.toLocaleString()} د.ع</span>
          </div>
        </section>
      </div>

      {/* صافي الربح/الخسارة */}
      <section
        className={`rounded-3xl p-6 text-center font-extrabold text-2xl shadow-lg max-w-md mx-auto
        ${
          netProfit >= 0
            ? "bg-green-100 text-green-800 border border-green-300"
            : "bg-red-100 text-red-800 border border-red-300"
        }
      `}
      >
        {netProfit >= 0 ? "صافي الربح" : "صافي الخسارة"}:{" "}
        {Math.abs(netProfit).toLocaleString()} د.ع
      </section>
    </div>
  );
}
