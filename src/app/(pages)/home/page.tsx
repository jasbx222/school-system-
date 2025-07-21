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
  const { data: offers } = useGetOffer<OfferResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}offer`);
  const { data: students } = useGetOffer<StudentsResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}students`);

  // جهز بيانات الطلاب حسب الأشهر (من تاريخ الميلاد مثلاً)
  const monthCounts: Record<string, number> = {};

  if (students?.students) {
    students.students.forEach((student: Student) => {
      if (student.birth_day) {
        const month = new Date(student.birth_day).getMonth(); // 0-11
        const monthName = getMonthName(month);
        monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
      }
    });
  }

  // حول البيانات إلى مصفوفة لجارت recharts
  const chartData = Object.entries(monthCounts).map(([name, طلاب]) => ({
    name,
    طلاب,
  }));

  return (
    <main className="p-8 bg-gradient-to-br from-[#f0f5ff] to-[#d9e4ff] min-h-screen font-cairo">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-extrabold text-[#0F1A35] mb-10 text-center drop-shadow-md">
          لوحة تحكم إدارة الطلاب بالمدرسة
        </h1>

        {/* كروت الإحصائيات */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: <GraduationCap className="text-[#0F5BFF]" size={36} />,
              title: "عدد الطلاب",
              value: students?.total ?? 0,
              borderColor: "border-[#0F5BFF]",
            },
            {
              icon: <Coins className="text-[#41BC4C]" size={36} />,
              title: "الأقساط المدفوعة",
              value: "120,000 د.ع",
              borderColor: "border-[#41BC4C]",
            },
            {
              icon: <Percent className="text-[#FF9F40]" size={36} />,
              title: "الخصومات",
              value: `المجموع الكلي: ${offers?.total ?? 0} د.ع`,
              borderColor: "border-[#FF9F40]",
            },
          ].map(({ icon, title, value, borderColor }, i) => (
            <div
              key={i}
              className={`
                bg-white shadow-lg rounded-xl p-6 flex items-center gap-5
                border-r-8 ${borderColor}
                hover:scale-105 hover:shadow-2xl
                transition-transform duration-300 cursor-pointer
              `}
              role="region"
              aria-label={title}
              tabIndex={0}
              onFocus={(e) =>
                e.currentTarget.classList.add("ring-4", "ring-[#0F5BFF]")
              }
              onBlur={(e) =>
                e.currentTarget.classList.remove("ring-4", "ring-[#0F5BFF]")
              }
            >
              <div className="flex-shrink-0">{icon}</div>
              <div className="text-right">
                <p className="text-gray-500 uppercase tracking-wider text-sm">
                  {title}
                </p>
                <p className="text-2xl font-bold text-[#0F1A35]">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* الرسم البياني */}
        <section
          className="bg-white shadow-2xl rounded-2xl p-8 max-w-full"
          aria-labelledby="chart-title"
        >
          <h2
            id="chart-title"
            className="text-2xl font-extrabold text-[#0F5BFF] mb-8 text-right select-none"
          >
            إحصائية عدد الطلاب حسب الأشهر
          </h2>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barCategoryGap="25%"
              barGap={8}
            >
              <XAxis
                dataKey="name"
                reversed
                tick={{ fill: "#0F1A35", fontWeight: "600" }}
                axisLine={{ stroke: "#0F5BFF" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#0F1A35", fontWeight: "600" }}
                axisLine={{ stroke: "#0F5BFF" }}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(15,91,255,0.1)" }}
                contentStyle={{
                  borderRadius: 12,
                  borderColor: "#0F5BFF",
                  fontFamily: "Cairo, sans-serif",
                  fontWeight: "600",
                  fontSize: 14,
                }}
                labelStyle={{ color: "#0F1A35", fontWeight: "bold" }}
              />
              <Bar
                dataKey="طلاب"
                fill="#0F5BFF"
                radius={[12, 12, 0, 0]}
                maxBarSize={40}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
    </main>
  );
}
