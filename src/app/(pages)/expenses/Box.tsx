"use client";

import useGet from '@/app/hooks/useGet';
import useGetOffer from '@/app/hooks/useGetOffer';
import usePost from '@/app/hooks/usePost';
import { BookOpen, BoxIcon } from 'lucide-react';
import React, { FormEvent, useState } from 'react';

interface Amount {
  amount: string;
}

interface BoxData {
  amount: Amount[];
}

const Box = () => {
  const [amount, setAmount] = useState('');

  const { add } = usePost();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    add(`${process.env.NEXT_PUBLIC_BASE_URL}box`, { amount });
  };

  const { data: netTotal } = useGetOffer<BoxData>(`${process.env.NEXT_PUBLIC_BASE_URL}box`);

  // استخراج المبلغ الأول (أو 0 إذا لم يكن موجود)
  const latestAmount = netTotal?.amount?.[0]?.amount ?? '0';

  return (
    <div className="max-w-4xl grid grid-cols-4 mx-auto mb-8 bg-white rounded-2xl shadow-xl gap-6 p-8 border-l-8 border-[#0F1A35]">
      {/* أيقونة */}
      <div className="col-span-1 flex items-start justify-center">
        <BoxIcon className="text-[#0F1A35]" size={56} />
      </div>

      {/* النص + النموذج */}
      <div className="col-span-3 flex flex-col gap-6">
        {/* معلومات الرصيد */}
        <div className="text-right">
          <p className="text-gray-600 text-lg mb-1 font-semibold">رصيد صندوق المصاريف</p>
          <p
            className={`text-4xl font-extrabold ${
              parseFloat(latestAmount) >= 0 ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {parseFloat(latestAmount).toLocaleString()} د.ع
          </p>
          <p className="text-sm text-gray-400 italic mt-1">
            {parseFloat(latestAmount) >= 0
              ? 'رصيد إيجابي - أموال متوفرة'
              : 'رصيد سلبي - تجاوز المصروفات'}
          </p>
        </div>

        {/* النموذج */}
   
      {
         parseFloat (latestAmount) > 0 ? <div>
           
         </div> :  <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-sm self-end w-full"
        >
          <input
            placeholder="ادخل رصيدك"
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            إرسال
          </button>
        </form>
      }
      </div>
    </div>
  );
};

export default Box;
