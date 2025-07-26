"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GraduationCap, Coins, Percent } from "lucide-react";
import { OfferResponse, Student, StudentsResponse } from "@/app/types/types";
import useGetOffer from "@/app/hooks/useGetOffer";

function getMonthName(monthNumber: number) {
  const months = [
    "كانون 2", "شباط", "آذار", "نيسان", "أيار", "حزيران",
    "تموز", "آب", "أيلول", "تشرين 1", "تشرين 2", "كانون 1",
  ];
  return months[monthNumber] || "";
}

export default function Page() {
  const { data: offers } = useGetOffer<OfferResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}sum/offer`);
  const { data: students } = useGetOffer<StudentsResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}students`);

  const monthCounts: Record<string, number> = {};

  if (students?.students) {
    students.students.forEach((student: Student) => {
      if (student.birth_day) {
        const month = new Date(student.birth_day).getMonth();
        const monthName = getMonthName(month);
        monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
      }
    });
  }

  const chartData = Object.entries(monthCounts).map(([name, طلاب]) => ({
    name,
    طلاب,
  }));

  const stats = [
    {
      icon: <GraduationCap size={36} className="text-[#0F5BFF]" />,
      title: "عدد الطلاب",
      value: students?.total ?? 0,
      border: "border-[#0F5BFF]",
    },
    {
      icon: <Coins size={36} className="text-[#41BC4C]" />,
      title: "الأقساط المدفوعة",
      value: "120,000 د.ع",
      border: "border-[#41BC4C]",
    },
    {
      icon: <Percent size={36} className="text-[#FF9F40]" />,
      title: "الخصومات",
      value: `المجموع الكلي: ${offers?.total ?? 0} د.ع`,
      border: "border-[#FF9F40]",
    },
  ];

  return (
    <main className="bg-gradient-to-br from-[#f0f5ff] to-[#d9e4ff] min-h-screen font-cairo p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[#0F1A35] mb-10">
          لوحة تحكم إدارة الطلاب بالمدرسة
        </h1>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {stats.map(({ icon, title, value, border }, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl p-5 flex items-center gap-5 border-r-8 ${border}
              shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer`}
              role="region"
              aria-label={title}
              tabIndex={0}
              onFocus={(e) => e.currentTarget.classList.add("ring-4", "ring-[#0F5BFF]")}
              onBlur={(e) => e.currentTarget.classList.remove("ring-4", "ring-[#0F5BFF]")}
            >
              <div>{icon}</div>
              <div className="flex-1 text-right">
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-[#0F1A35]">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* الرسم البياني */}
        <section className="bg-white shadow-lg rounded-2xl p-5 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F5BFF] mb-6 text-right">
            إحصائية عدد الطلاب حسب الأشهر
          </h2>
          <div className="w-full h-[300px] sm:-h[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barCategoryGap="25%"
                barGap={8}
              >
                <XAxis
                  dataKey="name"
                  reversed
                  tick={{ fill: "#0F1A35", fontWeight: 600 }}
                  axisLine={{ stroke: "#0F5BFF" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#0F1A35", fontWeight: 600 }}
                  axisLine={{ stroke: "#0F5BFF" }}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(15,91,255,0.1)" }}
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#0F5BFF",
                    fontFamily: "Cairo, sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                  labelStyle={{ color: "#0F1A35", fontWeight: "bold" }}
                />
                <Bar
                  dataKey="طلاب"
                  fill="#0F5BFF"
                  radius={[12, 12, 0, 0]}
                  maxBarSize={40}
                  isAnimationActive
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </main>
  );
}
