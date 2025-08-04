"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useGetData from "@/app/hooks/useGetData";
import usePost from "@/app/hooks/usePost";
import { StudentOption, StudentsResponse } from "@/app/types/types";
import Select from "react-select";
import Form from "./Form";

type InstallmentPart = {
  amount: string;
  due_date: string;
};


export default function AddInstallmentPage() {
  const router = useRouter();
  const { data: studentsResponse } = useGetData<StudentsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}students`
  );
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [studentId, setStudentId] = useState<string|null>('');

  const [status, setStatus] = useState("pending");
  const [isSplit, setIsSplit] = useState(false);
  const [parts, setParts] = useState<InstallmentPart[]>([]);
  const { add } = usePost();

  const handleAddPart = () => {
    setParts([...parts, { amount: "", due_date: "" }]);
  };

const studentOptions = studentsResponse?.students.map((student) => ({
  value: student.id,
  label: student.full_name,
})) ?? null;


const handleSelectChange = (selectedOption: StudentOption | null) => {
  setStudentId(selectedOption ? selectedOption.value.toString() : null);
};

  const handlePartChange = (
    index: number,
    field: keyof InstallmentPart,
    value: string
  ) => {
    const updatedParts = [...parts];
    updatedParts[index][field] = value;
    setParts(updatedParts);
  };

  const handleSubmit = async () => {
    const payload = {
      title,
      amount: parseFloat(amount),
      student_id: Number(studentId),
      status,
      parts: isSplit ? parts : [],
    };
    await add(`${process.env.NEXT_PUBLIC_BASE_URL}installments`, payload);
    router.replace("/installments");
  };

  return (
  
    <Form
      title={title}
      setTitle={setTitle}
      amount={amount}
      setAmount={setAmount}
      studentOptions={studentOptions}
      studentId={studentId}
      handleSelectChange={handleSelectChange}
      status={status}
      setStatus={setStatus}
      isSplit={isSplit}
      setIsSplit={setIsSplit}
      parts={parts}
      handleAddPart={handleAddPart}
      handlePartChange={handlePartChange}
      handleSubmit={handleSubmit}

    />
  );
}
