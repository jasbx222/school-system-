"use client";

import { FormEvent, useState } from "react";
import { Save } from "lucide-react";
import usePost from "@/app/hooks/usePost";
import useGetOffer from "@/app/hooks/useGetOffer";
import useUpdate from "@/app/hooks/useUpdate";
import { useParams } from "next/navigation";

interface SemsterItem {
  id: number;
  title: string;
  from: string;
  students_count: number;
  to?: string;
}
interface Semester {
  semesters: SemsterItem[];
}

interface Class {
  id: number;
  title: string;
  students_count: number;
}
interface ClassData {
  classes: Class[];
}
export default function Page() {
    const {id}=useParams();
  const [semester_id, setSemester] = useState("");
  const [class_room_id, setClassRoom] = useState("");
  const [cost, setCost] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { update, loading } = useUpdate();
  const { data: semesters, loading: semestersLoading } = useGetOffer<Semester>(
    `${process.env.NEXT_PUBLIC_BASE_URL}semesters`
  );
  const { data: classes } = useGetOffer<ClassData>(
    `${process.env.NEXT_PUBLIC_BASE_URL}classes`
  );

  const handleSubmit = async (e:FormEvent) => {
   e.preventDefault()

    const data = {
      semester_id,
      class_room_id,
      cost,
    };

    try {
      await update(`${process.env.NEXT_PUBLIC_BASE_URL}semesters/update/${id}`, data);
      setSuccessMessage("تم التعديل بنجاح");
      setSemester("");
      setClassRoom("");
      setCost("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      alert("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.");
    }
  };

  return (
    <main className="bg-[#F8FAFC] min-h-screen p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-[#0F1A35] text-center">
          تعديل تكلفة
        </h2>

        {/* الفصل الدراسي */}
        <div className="space-y-1">
          <label className="block text-[#0F1A35] font-medium">
            الفصل الدراسي *
          </label>
          <select
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-[#0F5BFF] p-2"
            value={semester_id}
            onChange={(e) => setSemester(e.target.value)}
            disabled={semestersLoading}
          >
            <option value="" disabled>
              {semestersLoading ? "جاري التحميل..." : "اختر الفصل"}
            </option>
            {semesters?.semesters?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        {/* الصف */}
        <div className="space-y-1">
          <label className="block text-[#0F1A35] font-medium">الصف *</label>
          <select
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-[#0F5BFF] p-2"
            value={class_room_id}
            onChange={(e) => setClassRoom(e.target.value)}
            disabled={semestersLoading}
          >
            <option value="" disabled>
              {semestersLoading ? "جاري التحميل..." : "اختر الصف"}
            </option>
            {classes?.classes?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* التكلفة */}
        <div className="space-y-1">
          <label className="block text-[#0F1A35] font-medium">التكلفة *</label>
          <input
            type="number"
            placeholder="أدخل المبلغ"
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-[#0F5BFF] p-2"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            min={0}
          />
        </div>

        {/* زر الحفظ */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#0F5BFF] hover:bg-[#0849d6] text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          <Save size={18} />
          {loading ? "جارٍ التعديل..." : "تعديل التكلفة"}
        </button>

        {/* رسالة النجاح */}
        {successMessage && (
          <p className="text-green-600 text-center font-medium">
            {successMessage}
          </p>
        )}
      </div>
    </main>
  );
}
