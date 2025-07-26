'use client'
import useGetOffer from "@/app/hooks/useGetOffer";
import useUpdate from "@/app/hooks/useUpdate";
import {  Option } from "@/app/types/types";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [studentId, setStudentId] = useState("");
  const [number, setNumber] = useState("");
  const [value, setValue] = useState("");
const route =useRouter()
  const { update } = useUpdate();
  const { data: students } = useGetOffer<{ students: Option[] }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      student_id: studentId,
      number,
      value,
    };
    await update(`${process.env.NEXT_PUBLIC_BASE_URL}invoices/${id}`, body);
    
    setStudentId("");
    setNumber("");
    setValue("");
    route.replace('/invoice')
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg mb-10 grid gap-6 md:grid-cols-2"
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">الطالب</label>
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          required
        >
          <option value="">اختر الطالب</option>
          {students?.students?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.full_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">رقم الفاتورة</label>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">قيمة الفاتورة</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          required
        />
      </div>

      <div className="col-span-2 flex justify-end mt-4">
        <button
          type="submit"
          className="bg-[#0F5BFF] hover:bg-[#0d4cd1] text-white font-medium px-6 py-2 rounded-full transition duration-200 shadow-md"
        >
          تعديل الفاتورة
        </button>
      </div>
    </form>
  );
};

export default Page;
