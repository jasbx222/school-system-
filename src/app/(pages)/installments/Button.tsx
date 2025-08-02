import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Select from "react-select";

const Button = () => {
  const route=useRouter();
  const RouteSelected = (selected: any) => {
    if (selected.value === "all") {
      route.push("/installments");
    }
    if (selected.value === "paid") {
      route.push("/installments/status/paid");
    }
    if (selected.value === "pending") {
      route.push("/installments/status/pending");
    }
  };

  return (
    <div className="grid md:grid-cols-4 gap-5 grid-cols-2 ">
      <h1 className="text-3xl font-bold text-gray-800">قائمة الأقساط</h1>

      
      <div className="w-full">
        <Select
          options={[
            { value: "all", label: "كل الأقساط" },
            { value: "paid", label: "الأقساط المدفوعة" },
            { value: "pending", label: "الأقساط المعلقة" },
          ]}
          isClearable
          placeholder="اختر حالة القسط..."
          onChange={RouteSelected}
        />
        
        </div>
      <Link
        href="/installments/add"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
      >
        <Plus size={18} />
        إضافة قسط جديد
      </Link>
      
     
    </div>
  );
};

export default Button;
