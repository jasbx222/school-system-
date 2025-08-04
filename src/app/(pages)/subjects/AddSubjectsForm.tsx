"use client";

import React, { use, useState } from "react";
import { X } from "lucide-react";
import usePost from "@/app/hooks/usePost";
import Select from "react-select";
import useGetData from "@/app/hooks/useGetData";

const AddSubjectsForm = ({
  setIsModalFormOpen,
  refetch,
}: {
  setIsModalFormOpen: (isOpen: boolean) => void;
  refetch: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [subjectClass, setSubjectClass] = useState("");
  const {data:classesResponse} = useGetData<{ classes: { id: number; title: string }[] }>(`${process.env.NEXT_PUBLIC_BASE_URL}classes`)
  const { add } = usePost();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subjectClass) {
      alert("يرجى ملء جميع الحقول");
      return;
    }
    try {
      await add(`${process.env.NEXT_PUBLIC_BASE_URL}subjects`, {
        title,
        class_room_id: subjectClass,
      });
      refetch();
      setIsModalFormOpen(false);
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("حدث خطأ أثناء إضافة المادة");
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
  return (
    <>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
          {/* زر إغلاق */}
          <button
            onClick={() => setIsModalFormOpen(false)}
            className="absolute top-4 left-4 text-gray-500 hover:text-red-500"
          >
            <X size={22} />
          </button>

          <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">
            إضافة مادة جديدة
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                اسم المادة
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                حفظ المادة
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSubjectsForm;
