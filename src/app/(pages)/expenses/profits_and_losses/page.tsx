"use client";

import useGetData from "@/app/hooks/useGetData";

type Profit = {
  income: string;
  expenses: string;
  profit: number;
};

export default function ProfitLossPage() {
  const { data: profit_loss } = useGetData<Profit>(
    `${process.env.NEXT_PUBLIC_BASE_URL}get_profit_loss`
  );

  if (!profit_loss) {
    return (
      <div className="p-8 max-w-6xl mx-auto font-sans text-gray-600">
        جارِ تحميل البيانات...
      </div>
    );
  }

  const totalRevenue = parseFloat(profit_loss.income || "0");
  const totalExpense = parseFloat(profit_loss.expenses || "0");
  const netProfit = profit_loss.profit;

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-gray-800 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-[#1E40AF] mb-8">
        تقرير الأرباح والخسائر
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* الإيرادات */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-4 border-b border-green-300 pb-2">
            الإيرادات
          </h2>
          <div className="text-lg font-medium text-gray-700 flex justify-between">
            <span>إجمالي الإيرادات</span>
            <span>{totalRevenue.toLocaleString()} د.ع</span>
          </div>
        </section>

        {/* المصروفات */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-red-700 mb-4 border-b border-red-300 pb-2">
            المصروفات
          </h2>
          <div className="text-lg font-medium text-gray-700 flex justify-between">
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
