"use client";

import { BookOpen, Delete, Pen } from "lucide-react";
import { useMemo, useState } from "react";
import Box from "./Box";
import Link from "next/link";
import useGetOffer from "@/app/hooks/useGetOffer";
import useDelete from "@/app/hooks/useDelete";
interface Ex{
   id: number;
  title: string;
  date: string;
  description: string;
  status: "دفع" | "قبض";
  amount: number;
}
interface Expense {
 expenses:Ex[]
}

export default function ExpensesPage() {
    const [message, setMessage] = useState("");
  const {data:expenses}=useGetOffer<Expense>(`${process.env.NEXT_PUBLIC_BASE_URL}expenses`)
  const {remove}=useDelete()
const handleDelete= async(id:number)=>{

  await remove(`${process.env.NEXT_PUBLIC_BASE_URL}delete/expenses/${id}`)
setMessage("تم الحذف بنجاح");

}
  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-[#e6f0ff] to-[#cbdffd] font-cairo font-semibold">
      <h1 className="text-4xl text-center text-[#0F1A35] mb-10 flex items-center justify-center gap-3">
        إدارة المصاريف المدرسية
      </h1>

      {/* الصندوق الصافي */}
      <Box />

      {/* زر إضافة مصروف */}
      <div className=" grid grid-cols-2  max-w-4xl mx-auto gap-3 mb-6">
        <Link
          href={"/expenses/add"}
          className="bg-[#0F1A35] text-center hover:bg-[#141f4d] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-transform active:scale-95"
        >
          + إضافة مصروف
        </Link>
        <Link
          href={"/expenses/category"}
          className="bg-[#0F1A35] hover:bg-[#141f4d] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-transform active:scale-95"
        >
          + إضافة فئة
        </Link>
      </div>

      {/* جدول المصاريف */}
      {message}
      <div className="overflow-x-auto max-w-6xl mx-auto rounded-lg shadow-md bg-white border border-[#0F1A35]">
        <table className="min-w-full text-right border-collapse border border-gray-300">
          <thead className="bg-gradient-to-r from-[#0F1A35] to-[#3a4677] text-white">
            <tr>
              <th className="p-3 border border-[#2c3570]">#</th>
              <th className="p-3 border border-[#2c3570]"> المصروف</th>
              <th className="p-3 border border-[#2c3570]">التاريخ</th>
              <th className="p-3 border border-[#2c3570]">الوصف</th>
              <th className="p-3 border border-[#2c3570]">نوع العملية</th>
              <th className="p-3 border border-[#2c3570]">المبلغ (د.ع)</th>
              <th className="p-3 border border-[#2c3570]"> الاجرائات</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.expenses.map((exp, idx) => (
              <tr
                key={exp.id}
                className={`${
                  idx % 2 === 0 ? "bg-[#e6ebff]" : "bg-white"
                } hover:bg-[#ccd6ff] transition cursor-default`}
              >
                <td className="p-3 border border-[#b4bcdb]">{idx + 1}</td>
                <td className="p-3 border border-[#b4bcdb]">{exp.title}</td>
                <td className="p-3 border border-[#b4bcdb]">{exp.date}</td>
                <td className="p-3 border border-[#b4bcdb] text-gray-700">
                  {exp.description || "-"}
                </td>
                <td
                  className={`p-3 border border-[#b4bcdb] font-semibold ${
                    exp.status === "دفع"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {exp.status}
                </td>
                <td className="p-3 border border-[#b4bcdb] font-semibold text-[#0F1A35]">
                  {exp.amount.toLocaleString()}
                </td>
                 <td className="p-3 border border-[#b4bcdb] grid grid-cols-2 gap-2 ">
                  <Delete onClick={()=>handleDelete(exp.id)} color="red" />
                  <Link href={`/expenses/update/${exp.id}`} >
                  <Pen color="green"/>
                  </Link>
                 </td>
              </tr>
                
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
