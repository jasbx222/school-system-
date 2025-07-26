"use client";

import useGet from "@/app/hooks/useGet";
import useGetOffer from "@/app/hooks/useGetOffer";
import useUpdateMultipart from "@/app/hooks/useUpdateFaq";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Student } from "@/app/types/types";

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
  const { id } = useParams();
  const { data: studentData, loading } = useGetOffer<{ student: Student }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students/${id}`
  );

  const { data: sections } = useGetOffer<Section>(
    `${process.env.NEXT_PUBLIC_BASE_URL}sections`
  );
  const { data: classes } = useGetOffer<ClassRoom>(
    `${process.env.NEXT_PUBLIC_BASE_URL}classes`
  );
  const { data: semesters } = useGetOffer<Semester>(
    `${process.env.NEXT_PUBLIC_BASE_URL}semesters`
  );

  const { update } = useUpdateMultipart();

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

  // تعبئة البيانات من API
  useEffect(() => {
    if (studentData?.student) {
      const s = studentData.student;
      setFormData({
        full_name: s.full_name || "",
        mother_name: s.mother_name || "",
        school_id: s.school_id?.toString() || "",
        class_room_id: s.class_room_id?.toString() || "",
        class_section_id: s.class_section_id?.toString() || "",
        birth_day: s.birth_day || "",
        gender: s.gender || "",
        status: s.status || "مستمر",
        orphan: s.orphan || "لا",
        has_martyrs_relatives: s.has_martyrs_relatives || "لا",
        last_school: s.last_school || "",
        semester_id: s.semester_id?.toString() || "",
        offer_id: s.offer_id?.toString() || "",
        description: s.description || "",
        file: null,
        profile_image: null,
      });
    }
  }, [studentData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value);
      }
    });

    update(`${process.env.NEXT_PUBLIC_BASE_URL}update/students/${id}`, data, true);
  };

  if (loading) return <div className="text-center p-6">جاري تحميل البيانات...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 rtl text-[#0F1A35] font-sans"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-[#0F5BFF]">
        تعديل معلومات الطالب
      </h2>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputField id="mother_name" label="اسم الأم" required value={formData.mother_name} onChange={handleChange} />

        <SelectField
          id="class_room_id"
          label="الصف"
          value={formData.class_room_id}
          onChange={handleChange}
          options={classes?.classes}
        />

        <SelectField
          id="class_section_id"
          label="الشعبة"
          value={formData.class_section_id}
          onChange={handleChange}
          options={sections?.sections}
        />

        <InputField id="birth_day" label="تاريخ الميلاد" type="date" required value={formData.birth_day} onChange={handleChange} />

        <SelectStaticField
          id="gender"
          label="الجنس"
          value={formData.gender}
          onChange={handleChange}
          options={["ذكر", "أنثى"]}
        />

        <SelectStaticField
          id="status"
          label="الحالة"
          value={formData.status}
          onChange={handleChange}
          options={["مستمر", "منقطع"]}
        />

        <SelectStaticField
          id="orphan"
          label="يتيم"
          value={formData.orphan}
          onChange={handleChange}
          options={["لا", "نعم"]}
        />

        <SelectStaticField
          id="has_martyrs_relatives"
          label="لديه أقارب شهداء"
          value={formData.has_martyrs_relatives}
          onChange={handleChange}
          options={["لا", "نعم"]}
        />

        <InputField id="last_school" label="المدرسة السابقة" value={formData.last_school} onChange={handleChange} />

        <SelectField
          id="semester_id"
          label="الفصل الدراسي"
          value={formData.semester_id}
          onChange={handleChange}
          options={semesters?.semesters}
        />

        <InputField id="offer_id" label="رقم العرض (اختياري)" value={formData.offer_id} onChange={handleChange} />
      </div>

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
          className="input-style"
        />
      </div>

      <div>
        <label htmlFor="file" className="block mb-2 font-semibold">
          ملف الطالب
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

// Components for reusability (Input, Select):
const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: any) => (
  <div>
    <label htmlFor={id} className="block mb-2 font-semibold">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="input-style"
    />
  </div>
);

const SelectField = ({
  id,
  label,
  value,
  onChange,
  options = [],
}: any) => (
  <div>
    <label htmlFor={id} className="block mb-2 font-semibold">
      {label} <span className="text-red-600">*</span>
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required
      className="input-style"
    >
      <option value="">اختر</option>
      {options.map((opt: any) => (
        <option key={opt.id} value={opt.id}>
          {opt.title}
        </option>
      ))}
    </select>
  </div>
);

const SelectStaticField = ({
  id,
  label,
  value,
  onChange,
  options = [],
}: any) => (
  <div>

  </div>
);
