import React from "react";

interface Props {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, setCurrentPage }: Props) => {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div dir="rtl" className="flex justify-center mt-8 gap-4 rtl:flex-row-reverse">
    
  
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
        }`}
      >
        التالي
      </button>
          <span className="px-4 py-2 text-sm font-medium text-gray-700">
        الصفحة {currentPage} من {totalPages}
      </span>
        <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
        }`}
      >
        السابق
      </button>
    </div>
  );
};

export default Pagination;
