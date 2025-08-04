"use client";

import React, { useState } from "react";
import Select from "react-select";
import useGetData from "@/app/hooks/useGetData";
import {  StudentsResponse } from "@/app/types/types"; // عدل حسب النوع الصحيح
import usePost from "@/app/hooks/usePost";

type Option = { value: number; label: string };
interface Class {
  id: number;
  title: string;
  students_count: number;
}

interface ClassData {
  classes: Class[];
}
interface Section {
  id: number;
  title: string;
  students_count: number;
}

interface SectionData {
  sections: Section[];
}

export default function TransferForm() {
  const [student, setStudent] = useState<Option | null>(null);
  const [fromClass, setFromClass] = useState<Option | null>(null);
  const [fromSection, setFromSection] = useState<Option | null>(null);
  const [toClass, setToClass] = useState<Option | null>(null);
  const [toSection, setToSection] = useState<Option | null>(null);
  const [transferDate, setTransferDate] = useState<string>("");

  // جلب البيانات من API
  const { data: studentsData } = useGetData<StudentsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );
  const { data: classData } = useGetData<ClassData>(
    `${process.env.NEXT_PUBLIC_BASE_URL}classes`
  );
  const { data: sectionData } = useGetData<SectionData>(
    `${process.env.NEXT_PUBLIC_BASE_URL}sections`
  );

  // تحويل البيانات إلى صيغة React Select
  const studentOptions: Option[] =
    studentsData?.students.map((s: any) => ({
      value: s.id,
      label: s.full_name,
    })) || [];

  const classOptions: Option[] =
    classData?.classes.map((c) => ({
      value: c.id,
      label: c.title,
    })) || [];

  const sectionOptions: Option[] = 
    sectionData?.sections.map((s) => ({
      value: s.id,
      label: s.title,
    })) || [];
const {add}=usePost()
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      student_id: student?.value,
      from_class_room_id: fromClass?.value,
      from_class_section_id: fromSection?.value,
      to_class_room_id: toClass?.value,
      to_class_section_id: toSection?.value,
      transfer_date: transferDate,
    };
    add(`${process.env.NEXT_PUBLIC_BASE_URL}student-transfers`, payload)
    .then((response) => {
      console.log("Transfer successful:", response);
      // هنا يمكنك إضافة أي منطق إضافي بعد نجاح النقل
    })

    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 rtl"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600">نقل طالب</h2>

      <div>
        <label className="block mb-1 font-medium">اختر الطالب</label>
        <Select options={studentOptions} value={student} onChange={setStudent} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">من الصف</label>
          <Select options={classOptions} value={fromClass} onChange={setFromClass} />
        </div>
        <div>
          <label className="block mb-1 font-medium">من الشعبة</label>
          <Select options={sectionOptions} value={fromSection} onChange={setFromSection} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">إلى الصف</label>
          <Select options={classOptions} value={toClass} onChange={setToClass} />
        </div>
        <div>
          <label className="block mb-1 font-medium">إلى الشعبة</label>
          <Select options={sectionOptions} value={toSection} onChange={setToSection} />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">تاريخ النقل</label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={transferDate}
          onChange={(e) => setTransferDate(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
      >
        تنفيذ النقل
      </button>
    </form>
  );
}
