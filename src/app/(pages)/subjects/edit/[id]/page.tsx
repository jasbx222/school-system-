"use client";

import React, { use, useState } from "react";
import { X } from "lucide-react";
import Select from "react-select";
import useGetOffer from "@/app/hooks/useGetOffer";
import { useParams, useRouter } from "next/navigation";
import useUpdate from "@/app/hooks/useUpdate";

const Page = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [subjectClass, setSubjectClass] = useState("");
  const { data: classesResponse } = useGetOffer<{
    classes: { id: number; title: string }[];
  }>(`${process.env.NEXT_PUBLIC_BASE_URL}classes`);
  const { update } = useUpdate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subjectClass) {
      alert("يرجى ملء جميع الحقول");
      return;
    }
    try {
      await update(`${process.env.NEXT_PUBLIC_BASE_URL}subjects/${id}`, {
        title,
        class_room_id: subjectClass,
      });
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("حدث خطأ أثناء تعديل المادة");
    }

    // إعادة تعيين وإغلاق النموذج
    setTitle("");
    setSubjectClass("");
  };

  const classOption = classesResponse?.classes?.map((c) => ({
    value: c.id,
    label: c.title,
  }));
  const handleSelectChange = (selectedOption: any) => {
    setSubjectClass(selectedOption ? selectedOption.value : null);
  };
  const route=useRouter();
  return (

      <div className=" flex items-center justify-center  relative top-12">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
          <button
            onClick={() => route.back()}
            className="absolute top-4 left-4 text-gray-500 hover:text-red-500"
            >

      
            <X size={22} />
          </button>

          <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">
            تعديل المادة
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                اسم المادة
              </label>
              <input
                type="text"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="أدخل اسم المادة"
                required
              />
            </div>

            <div className="w-full">
              <Select
                options={classOption}
                isClearable
                placeholder="اختر الصف..."
                onChange={handleSelectChange}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                تعديل المادة
              </button>
            </div>
          </form>
        </div>
      </div>
  
  );
};

export default Page;
