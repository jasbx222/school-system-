"use client";

import React, { useState } from "react";
import useGetData from "@/app/hooks/useGetData";
import { useParams } from "next/navigation";
import { Student } from "@/app/types/types";

interface AttendanceRecord {
  mojaz: number;
  ghaib: number;
  resoneForGhaib: string;
  resoneForMojaz: string;

}

export default function Page() {
  const { id } = useParams();
  const { data: attendanceRecords, loading } = useGetData<AttendanceRecord>(
    `${process.env.NEXT_PUBLIC_BASE_URL}attendanceRecords/${id}`
  );
  const { data } = useGetData<{ student: Student }>(
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

  <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-2xl space-y-8">
    <h2 className="text-3xl font-bold text-center text-blue-700">
      {data?.student.full_name}
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div className="bg-green-100 p-6 rounded-xl shadow-md">
        <p className="text-green-800 font-semibold text-lg">الإجازات</p>
        <p className="text-4xl font-bold">{attendanceRecords?.mojaz}</p>
      </div>

      <div className="bg-red-100 p-6 rounded-xl shadow-md">
        <p className="text-red-800 font-semibold text-lg">الغياب</p>
        <p className="text-4xl font-bold">{attendanceRecords?.ghaib}</p>
      </div>

      <div className="bg-yellow-100 p-6 rounded-xl shadow-md col-span-2">
        <p className="text-yellow-800 font-semibold text-lg mb-1">
          سبب الغياب
        </p>
        <p className="text-base font-medium text-gray-700">
          {attendanceRecords?.resoneForGhaib || "لا يوجد"}
        </p>
      </div>

      <div className="bg-yellow-100 p-6 rounded-xl shadow-md col-span-2">
        <p className="text-yellow-800 font-semibold text-lg mb-1">
          سبب الإجازة
        </p>
        <p className="text-base font-medium text-gray-700">
          {attendanceRecords?.resoneForMojaz || "لا يوجد"}
        </p>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
      <input
        type="tel"
        placeholder="أدخل رقم الهاتف للواتساب"
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
      />
      <button
        onClick={sendWhatsApp}
        disabled={sending}
        className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg px-6 py-3 transition disabled:opacity-60"
      >
        {sending ? "جار الإرسال..." : "إرسال عبر واتساب"}
      </button>
    </div>
  </div>
</main>

  );
}
