'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import useGetOffer from '@/app/hooks/useGetOffer';
import usePost from '@/app/hooks/usePost';
interface Category{
    id:number;
    title:string
}
interface Categores{
    categores:Category[]
}
export default function Page() {
const {data:categories}=useGetOffer<Categores>( `${process.env.NEXT_PUBLIC_BASE_URL}categores`)
const {add}=usePost()
  const [form, setForm] = useState({
    title: '',
    amount: '',
    date: '',
    description: '',
    category_expense_id: '',
    status: 'دفع',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await add(`${process.env.NEXT_PUBLIC_BASE_URL}expenses`,form); // غيّر المسار حسب API مالتك
      setSuccess('تمت إضافة المصروف بنجاح ✅');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'فشل في الإضافة');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#0F1A35]">إضافة مصروف جديد</h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="عنوان المصروف"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
          value={form.title}
        />

        <input
          name="amount"
          type="number"
          placeholder="المبلغ"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
          value={form.amount}
        />

        <input
          name="date"
          type="date"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
          value={form.date}
        />

      
        <textarea
          name="description"
          placeholder="تفاصيل المصروف"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
          value={form.description}
        />

        <select
          name="category_expense_id"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
          value={form.category_expense_id}
        >
          <option value="">اختر التصنيف</option>
          {categories?.categores.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.title}</option>
          ))}
        </select>

        <select
          name="status"
          className="w-full border rounded-xl p-3"
          onChange={handleChange}
          value={form.status}
        >
          <option value="دفع">دفع</option>
          <option value="قبض">قبض</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700">
          إرسال المصروف
        </button>
      </form>
    </div>
  );
}
