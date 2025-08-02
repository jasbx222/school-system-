"use client";

import { FormEvent, useState } from "react";
import useUpdate from "@/app/hooks/useUpdate";
import { useParams } from "next/navigation";
export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const { update } = useUpdate();
const {id}=useParams();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = {
      title: title,
      description: description,
    };
    setMessage("");
    try {
      await update(`${process.env.NEXT_PUBLIC_BASE_URL}categores/${id}`, form); // غيّر المسار حسب API مالتك
      setMessage("✅ تم تعديل التصنيف");
      setTitle("");
      setDesc("");
    } catch (err: any) {
      setMessage("❌ فشل في التعديل");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        إدارة تصنيفات المصروفات
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          value={title}
          placeholder="اسم التصنيف"
          className="border p-3 rounded-xl"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          value={description}
          placeholder="وصف التصنيف"
          className="border p-3 rounded-xl"
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          تعديل التصنيف
        </button>
      </form>

      {message && <p className="text-center mb-4">{message}</p>}

     
</div>


  );
}
