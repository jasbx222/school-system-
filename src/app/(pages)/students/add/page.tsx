"use client";

import useGetOffer from "@/app/hooks/useGetOffer";
import usePost from "@/app/hooks/usePost";
import { useState } from "react";

type Section = {
  sections: { id: number; title: string }[];
  total: number;
};
type ClassRoom = {
  classes: { id: number; title: string }[];
  total: number;
};
type Semester = {
  semesters: { id: number; title: string }[];
  total: number;
};

export default function StudentForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    mother_name: "",
    school_id: "",
    class_room_id: "",
    class_section_id: "",
    birth_day: "",
    gender: "",
    status: "مستمر",
    orphan: "لا",
    has_martyrs_relatives: "لا",
    last_school: "",
    semester_id: "",
    offer_id: "",
    description: "",
    file: null as File | null,
    profile_image: null as File | null,
  });

  const [message, setMessage] = useState("");
  const { add } = usePost();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files?.[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const { data: sections } = useGetOffer<Section>(`${process.env.NEXT_PUBLIC_BASE_URL}sections`);
  const { data: classes } = useGetOffer<ClassRoom>(`${process.env.NEXT_PUBLIC_BASE_URL}classes`);
  const { data: semesters } = useGetOffer<Semester>(`${process.env.NEXT_PUBLIC_BASE_URL}semesters`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    }

    add(`${process.env.NEXT_PUBLIC_BASE_URL}add/students`, data, true);
   
    
  };

  return (
    
  
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 rtl text-[#0F1A35] font-sans"
    >
          {message && (
        <div
          className={`text-center py-2 font-semibold ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}
      <h2 className="text-3xl font-bold text-center mb-6 text-[#0F5BFF]">
        إضافة طالب جديد
      </h2>

      {/* الاسم الكامل وصورة الملف الشخصي */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="full_name" className="block mb-2 font-semibold">
            الاسم الكامل <span className="text-red-600">*</span>
          </label>
          <input
            id="full_name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            placeholder="مثلاً: أحمد محمد"
            className="input-style"
          />
        </div>

        <div>
          <label htmlFor="profile_image" className="block mb-2 font-semibold">
            صورة البروفايل
          </label>
          <input
            id="profile_image"
            type="file"
            name="profile_image"
            accept="image/*"
            onChange={handleFileChange}
            className="input-style"
          />
        </div>
      </div>

      {/* بيانات الطالب الأساسية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="mother_name" className="block mb-2 font-semibold">
            اسم الأم <span className="text-red-600">*</span>
          </label>
          <input
            id="mother_name"
            type="text"
            name="mother_name"
            value={formData.mother_name}
            onChange={handleChange}
            required
            placeholder="اسم الأم"
            className="input-style"
          />
        </div>

         <div>
  <label htmlFor="class_room_id" className="block mb-2 font-semibold">
    الصف <span className="text-red-600">*</span>
  </label>
  <select
    id="class_room_id"
    name="class_room_id"
    value={formData.class_room_id}
    onChange={handleChange}
    required
    className="input-style"
  >
    <option value="">اختر الصف</option>
    {classes?.classes?.map((class_id) => (
      <option key={class_id.id} value={class_id.id}>
        {class_id.title}
      </option>
    ))}
  </select>
</div>

     <div>
  <label htmlFor="class_section_id" className="block mb-2 font-semibold">
    الشعبة <span className="text-red-600">*</span>
  </label>
  <select
    id="class_section_id"
    name="class_section_id"
    value={formData.class_section_id}
    onChange={handleChange}
    required
    className="input-style"
  >
    <option value="">اختر الشعبة</option>
    {sections?.sections?.map((section) => (
      <option key={section.id} value={section.id}>
        {section.title}
      </option>
    ))}
  </select>
</div>
 

        <div>
          <label htmlFor="birth_day" className="block mb-2 font-semibold">
            تاريخ الميلاد <span className="text-red-600">*</span>
          </label>
          <input
            id="birth_day"
            type="date"
            name="birth_day"
            value={formData.birth_day}
            onChange={handleChange}
            required
            className="input-style"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block mb-2 font-semibold">
            الجنس <span className="text-red-600">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="input-style"
          >
            <option value="">اختر</option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block mb-2 font-semibold">
            الحالة <span className="text-red-600">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="input-style"
          >
            <option value="مستمر">مستمر</option>
            <option value="منقطع">منقطع</option>
          </select>
        </div>

        <div>
          <label htmlFor="orphan" className="block mb-2 font-semibold">
            يتيم <span className="text-red-600">*</span>
          </label>
          <select
            id="orphan"
            name="orphan"
            value={formData.orphan}
            onChange={handleChange}
            required
            className="input-style"
          >
            <option value="لا">لا</option>
            <option value="نعم">نعم</option>
          </select>
        </div>

        <div>
          <label htmlFor="has_martyrs_relatives" className="block mb-2 font-semibold">
            لديه أقارب شهداء <span className="text-red-600">*</span>
          </label>
          <select
            id="has_martyrs_relatives"
            name="has_martyrs_relatives"
            value={formData.has_martyrs_relatives}
            onChange={handleChange}
            required
            className="input-style"
          >
            <option value="لا">لا</option>
            <option value="نعم">نعم</option>
          </select>
        </div>

        <div>
          <label htmlFor="last_school" className="block mb-2 font-semibold">
            المدرسة السابقة
          </label>
          <input
            id="last_school"
            type="text"
            name="last_school"
            value={formData.last_school}
            onChange={handleChange}
            placeholder="اسم المدرسة السابقة"
            className="input-style"
          />
        </div>

          <div>
  <label htmlFor="semester_id" className="block mb-2 font-semibold">
    الفصل الدراسي <span className="text-red-600">*</span>
  </label>
  <select
    id="semester_id"
    name="semester_id"
    value={formData.semester_id}
    onChange={handleChange}
    required
    className="input-style"
  >
    <option value="">اختر الفصل الدراسي</option>
    {semesters?.semesters?.map((semester) => (
      <option key={semester.id} value={semester.id}>
        {semester.title}
      </option>
    ))}
  </select>
</div>

        <div>
          <label htmlFor="offer_id" className="block mb-2 font-semibold">
            رقم العرض (اختياري)
          </label>
          <input
            id="offer_id"
            type="text"
            name="offer_id"
            value={formData.offer_id}
            onChange={handleChange}
            placeholder="إذا موجود"
            className="input-style"
          />
        </div>
      </div>

      {/* الوصف والملف */}
      <div>
        <label htmlFor="description" className="block mb-2 font-semibold">
          الوصف
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="وصف الطالب أو ملاحظات إضافية"
          className="input-style"
        />
      </div>

      <div>
        <label htmlFor="file" className="block mb-2 font-semibold">
          ملف الطالب (PDF أو مستند)
        </label>
        <input
          id="file"
          type="file"
          name="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="input-style"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#0F5BFF] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        إرسال البيانات
      </button>
    </form>
  );
}
