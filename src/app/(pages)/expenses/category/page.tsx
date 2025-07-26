"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import usePost from "@/app/hooks/usePost";
import useGetOffer from "@/app/hooks/useGetOffer";
import Link from "next/link";
import { Delete, Eye, Pen } from "lucide-react";
import useDelete from "@/app/hooks/useDelete";
interface Category{
    id:number;
    title:string
}
interface Categores{
    categores:Category[]
}
export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [message, setMessage] = useState("");
const {data:categories}=useGetOffer<Categores>( `${process.env.NEXT_PUBLIC_BASE_URL}categores`)
  const { add } = usePost();
  const {remove}=useDelete()
const handleDelete= async(id:number)=>{

  await remove(`${process.env.NEXT_PUBLIC_BASE_URL}delete/category/${id}`)
setMessage("تم الحذف بنجاح");

}
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = {
      title: title,
      description: description,
    };
    setMessage("");
    try {
      await add(`${process.env.NEXT_PUBLIC_BASE_URL}categores`, form); // غيّر المسار حسب API مالتك
      setMessage("✅ تم إضافة التصنيف");
      setTitle("");
      setDesc("");
    } catch (err: any) {
      setMessage("❌ فشل في الإضافة");
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
          إضافة التصنيف
        </button>
      </form>

      {message && <p className="text-center mb-4">{message}</p>}

     <div className="mt-8">
  <h3 className="text-lg font-bold mb-4 text-gray-800">قائمة التصنيفات:</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {categories?.categores.map((cat) => (
      <div 
    
        key={cat.id}
        className="bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      >
        <p className="text-blue-600 font-medium text-center">{cat.title}</p>
       <div className=" grid grid-cols-2 gap-5">
         <Link   href={`/expenses/category/update/${cat.id}`}>
        <Pen size={18} color="green"/>
        </Link>
        <button onClick={()=>handleDelete(cat.id)}>
          <Delete size={18} color="red"/>
        </button>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
