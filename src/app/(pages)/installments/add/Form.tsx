import { AddInsType, StudentOption } from '@/app/types/types';
import React from 'react'
import Select from 'react-select';


const Form = ({
    title,
    setTitle,
    amount,
    studentId,
    setAmount,
    studentOptions,
    handleSelectChange,
    status,
    setStatus,
    isSplit,
    setIsSplit,
    parts,
    handleAddPart,
    handlePartChange,
    handleSubmit
}:AddInsType
   
) => {
  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-md   space-y-6">
      <h2 className="text-2xl font-semibold text-[#0F5BFF] text-center">
        إضافة قسط جديد
      </h2>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          عنوان القسط
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مثال: قسط الفصل الثاني"
          className="w-full px-4 py-2 input-style border rounded-lg focus:ring-2 focus:ring-[#0F5BFF] focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="block  text-sm font-medium text-gray-700">
          المبلغ الكلي
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="ادخل المبلغ"
          className="w-full input-style px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F5BFF] focus:outline-none"
        />
      </div>

         <div className="w-full">
              <Select<StudentOption>
  options={studentOptions ?? undefined}
  isClearable
  placeholder="اختر طالبًا..."
  onChange={handleSelectChange}
/>

              </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          حالة القسط
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 input-style border rounded-lg focus:ring-2 focus:ring-[#0F5BFF] focus:outline-none"
        >
          <option value="paid">مدفوع</option>
          <option value="pending">قيد الانتظار</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="split"
          checked={isSplit}
          onChange={(e) => setIsSplit(e.target.checked)}
          className="accent-[#0F5BFF] "
        />
        <label htmlFor="split" className="text-sm text-gray-700">
          تقسيم القسط إلى دفعات؟
        </label>
      </div>

      {isSplit && (
        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center">
            <h4 className="text-[#0F5BFF] font-semibold">الدفعات</h4>
            <button
              type="button"
              onClick={handleAddPart}
              className="text-sm px-3 py-1 bg-[#0F5BFF] text-white rounded-md hover:bg-blue-700 transition"
            >
              + إضافة دفعة
            </button>
          </div>

          {parts.map((part, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  مبلغ الدفعة
                </label>
                <input
                  type="number"
                  value={part.amount}
                  onChange={(e) =>
                    handlePartChange(index, "amount", e.target.value)
                  }
                  className="w-full input-style  px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F5BFF] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  تاريخ التسليم
                </label>
                <input
                  type="date"
                  value={part.due_date}
                  onChange={(e) =>
                    handlePartChange(index, "due_date", e.target.value)
                  }
                  className="w-full px-4 input-style py-2 border rounded-lg focus:ring-2 focus:ring-[#0F5BFF] focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-[#0F5BFF] text-white rounded-lg hover:bg-blue-700 transition font-medium text-lg"
      >
        حفظ القسط
      </button>
    </div>
  )
}

export default Form