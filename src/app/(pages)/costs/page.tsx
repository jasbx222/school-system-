"use client";

import Link from "next/link";
import { Plus, Loader2, Delete, Pen } from "lucide-react";
import useGetOffer from "@/app/hooks/useGetOffer";
import { useState, useEffect } from "react";
import useDelete from "@/app/hooks/useDelete";

interface Cost {
  id: number;
  cost: string;
  semester:string;
  created_at: string;
}

export default function CostsListPage() {
  const { data, loading ,refetch} = useGetOffer<{ data: Cost[] }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}semesters/cost`
  );

  const costs = data?.data ?? [];
  const {remove , response}=useDelete()
const handleDelete= async (id:number)=>{

  await remove (   `${process.env.NEXT_PUBLIC_BASE_URL}semesters/delete/${id}`)

  refetch()

}
  return (
    <main className="bg-[#F8FAFC] min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
     <div className="flex justify-between items-center mb-4">
  <h2 className="text-2xl font-bold text-[#0F1A35]">
    {response && (
      <span className="text-red-500">{response}</span>
    )}
  </h2>

          <Link
            href="/costs/add"
            className="bg-[#0F1A35] hover:bg-[#141f4d] text-white px-6 py-2 rounded-lg font-medium shadow transition flex items-center gap-2"
          >
            <Plus size={18} /> إضافة تكلفة
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32 text-[#0F5BFF]">
            <Loader2 className="animate-spin" size={28} />
            <span className="ml-2">جاري تحميل البيانات...</span>
          </div>
        ) : costs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">لا توجد تكاليف حالياً.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-right border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-[#0F5BFF] text-white text-sm">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">الفصل الدراسي</th>
                  <th className="px-4 py-3">المبلغ</th>
                  <th className="px-4 py-3">تاريخ الإضافة</th>
                  <th className="px-4 py-3"> الاجرائات</th>

                </tr>
              </thead>
              <tbody className="text-[#0F1A35]">
                {costs.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`transition hover:bg-blue-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-b last:border-none`}
                  >
                    <td className="px-4 py-3">
                      <div className="w-7 h-7 rounded-full bg-[#E6EEFF] text-[#0F5BFF] flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-[#DDEBFF] text-[#0F5BFF] px-2 py-1 rounded text-xs font-semibold">
                        #{item.semester}
                      </span>
                    </td>
                  
                    <td className="px-4 py-3 font-bold text-[#41BC4C]">
                      {parseFloat(item.cost).toLocaleString()} د.ع
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(item.created_at).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                      <td className="px-4 py-3 grid grid-cols-2 gap-3 ">
                  <button onClick={()=>handleDelete(item.id)}>  <Delete color="red" size={18} className=""/></button>
                       <Link href={`/costs/update/${item.id}`}> <Pen color="green" size={18}/></Link>
                    </td>
                     
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
