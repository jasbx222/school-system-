"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Select from "react-select";

type OptionType = {
  value: string;
  label: string;
};

const Button = () => {
  const router = useRouter();

  const handleSelect = (selected: OptionType | null) => {
    if (!selected) return;

    switch (selected.value) {
      case "all":
        router.push("/installments");
        break;
      case "paid":
        router.push("/installments/status/paid");
        break;
      case "pending":
        router.push("/installments/status/pending");
        break;
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        قائمة الأقساط
      </h1>

      <div className="w-full md:w-1/3">
        <Select
          options={[
            { value: "all", label: "كل الأقساط" },
            { value: "paid", label: "الأقساط المدفوعة" },
            { value: "pending", label: "الأقساط المعلقة" },
          ]}
          isClearable
          placeholder="اختر حالة القسط..."
          onChange={handleSelect}
        />
      </div>

      <Link
        href="/installments/add"
        className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
      >
        <Plus size={18} />
        إضافة قسط جديد
      </Link>
    </div>
  );
};

export default Button;
