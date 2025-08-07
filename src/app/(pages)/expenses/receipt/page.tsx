"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import { Button, InputDate, InputText, TextArea } from "../Form";
import useGetData from "@/app/hooks/useGetData";
import { Accounts } from "@/app/types/types";
import usePost from "@/app/hooks/usePost";

export default function Page() {
  const [formData, setFormData] = useState({
    account_id: null as string | null,
    amount: "",
    date: "",
    method: "",
    receipt_number: "",
    notes: "",
  });
  const [message, setMessage] = useState("");

  const { data: accounts } = useGetData<Accounts>(`${process.env.NEXT_PUBLIC_BASE_URL}accounts`);

 
const flattenAccounts = (
  accounts: Accounts, 
  level = 0
): { value: string; label: string }[] => {
  let result: { value: string; label: string }[] = [];

  for (const acc of accounts) {
    if (acc.type === 'income') {  // هنا نتحقق من النوع income فقط
      result.push({
        value: String(acc.id),
        label: `${'—'.repeat(level)} ${acc.name}`,
      });

      if (acc.children_recursive?.length > 0) {
        result = result.concat(flattenAccounts(acc.children_recursive, level + 1));
      }
    } else {
      // حتى لو النوع مش income، ممكن الأطفال منهم income
      if (acc.children_recursive?.length > 0) {
        result = result.concat(flattenAccounts(acc.children_recursive, level + 1));
      }
    }
  }

  return result;
};

const accountOptions = accounts ? flattenAccounts(accounts) : [];


  // الحصول على العنصر المختار
  const selectedAccount = accountOptions.find((opt) => opt.value === formData.account_id) || null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAccountSelect = (selected: { value: string; label: string } | null) => {
    setFormData({ ...formData, account_id: selected ? selected.value : null });
  };
  const {add,response}= usePost();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    add(`${process.env.NEXT_PUBLIC_BASE_URL}receipts`, formData);
    setMessage("تم إضافة الإيصال بنجاح");

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      {
        message && <div className="text-green-600">{message}</div>
      }
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          الحساب
        </label>
        <Select
          options={accountOptions}
          value={selectedAccount}
          onChange={handleAccountSelect}
          className="w-full"
          placeholder="اختر حسابًا"
          isClearable
        />
      </div>

      <InputText
        onChange={handleChange}
        value={formData.amount}
        name="amount"
        placeholder="المبلغ"
      />

      <InputDate name="date" value={formData.date} onChange={handleChange} />
      
      <InputText
        name="receipt_number"
        value={formData.receipt_number}
        onChange={handleChange}
        placeholder="رقم الوثيقة"
      />

      <InputText
        name="method"
        value={formData.method}
        onChange={handleChange}
        placeholder="طريقة الدفع"
      />

      <TextArea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="الوصف"
        rows={3}
      />

      <Button type="submit">إضافة إيصال</Button>
    </form>
  );
}
