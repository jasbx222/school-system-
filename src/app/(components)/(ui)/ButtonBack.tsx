"use client";

import { ArrowLeft, ArrowRight } from "lucide-react"; // أو ArrowLeft حسب الاتجاه
import { useRouter } from "next/navigation";
import React from "react";

const ButtonBack = () => {
const route =useRouter();
  const handleBack = () => {
    route.back();
  };

  return (
    <button
      onClick={handleBack}
      className="fixed bottom-6 end-6 z-50 bg-yellow-400 hover:bg-yellow-300 text-[#0F1A35] rounded-full p-4 shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center"
      title="رجوع"
    >
      <ArrowLeft size={24} />
    </button>
  );
};

export default ButtonBack;
