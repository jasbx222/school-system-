"use client";

import React, { useState } from "react";
import useGetOffer from "@/app/hooks/useGetOffer";
import { useParams } from "next/navigation";
import { Student } from "@/app/types/types";

interface AttendanceRecord {
  mojaz: number;
  ghaib: number;
}

export default function Page() {
  const { id } = useParams();
  const { data: attendanceRecords, loading } = useGetOffer<AttendanceRecord>(
    `${process.env.NEXT_PUBLIC_BASE_URL}attendanceRecords/${id}`
  );
  const { data } = useGetOffer<{ student: Student }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students/${id}`
  );

  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-700 font-semibold text-lg">
        جاري تحميل بيانات الحضور...
      </div>
    );
  }

  if (!attendanceRecords) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold text-lg">
        لا توجد بيانات حضور لهذا الطالب.
      </div>
    );
  }

  // معالجة رقم الهاتف قبل الإرسال
  let fullPhone = phone.trim();
  if (!fullPhone.startsWith("+") && !fullPhone.startsWith("0")) {
    fullPhone = `+964${fullPhone}`;
  }

  // دالة ارسال رسالة واتساب
  const sendWhatsApp = () => {
    const digitsOnly = fullPhone.replace(/\D/g, "");
    if (!digitsOnly || digitsOnly.length < 10) {
      alert("يرجى إدخال رقم هاتف صحيح");
      return;
    }
    setSending(true);

    const message = `ملخص حضور الطالب ${data?.student.full_name}:\n- الاجازات: ${attendanceRecords?.mojaz} \n- الغياب: ${attendanceRecords?.ghaib} \n\nمع تحيات إدارة المدرسة.`;
    const url = `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
    setSending(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex flex-col items-center font-sans text-blue-900">
      <h1 className="text-4xl font-extrabold mb-10 text-center">
        ملخص الحضور والغياب للطالب
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">{data?.student.full_name}</h2>

        <div className="flex justify-around mb-8">
          <div className="bg-green-100 p-6 rounded-lg w-40 text-center shadow-inner">
            <p className="text-green-700 font-bold text-xl">الاجازات</p>
            <p className="text-4xl font-extrabold">{attendanceRecords?.mojaz}</p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg w-40 text-center shadow-inner">
            <p className="text-red-700 font-bold text-xl">غياب</p>
            <p className="text-4xl font-extrabold">{attendanceRecords?.ghaib}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="tel"
            placeholder="أدخل رقم الهاتف للواتساب"
            className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
          <button
            onClick={sendWhatsApp}
            disabled={sending}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md px-6 py-3 transition disabled:opacity-60"
          >
            {sending ? "جار الإرسال..." : "إرسال عبر واتساب"}
          </button>
        </div>
      </div>
    </main>
  );
}
