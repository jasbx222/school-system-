"use client";

import { useEffect, useState } from "react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

type Result = {
  subject_name: string;
  score: number;
  full_score: number;
  semester: string;
  academic_year: string;
  exam_type?: string;
  notes?: string;
};

const mockResults: Result[] = [
  {
    subject_name: "الرياضيات",
    score: 85,
    full_score: 100,
    semester: "الأول",
    academic_year: "2025",
    exam_type: "نهاية السنة",
    notes: "جيد جداً",
  },
  {
    subject_name: "اللغة العربية",
    score: 92,
    full_score: 100,
    semester: "الأول",
    academic_year: "2025",
    exam_type: "نهاية السنة",
    notes: "",
  },
];

export default function Page() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    // استبدل هذا لاحقًا بfetch من API
    setResults(mockResults);
  }, []);

  // const exportToPDF = () => {
  //   const doc = new jsPDF();
  //   doc.setFont("Arial");
  //   doc.setFontSize(16);
  //   doc.text("نتائج الطالب", 14, 15);

  //   autoTable(doc, {
  //     startY: 25,
  //     head: [
  //       [
  //         "المادة",
  //         "الدرجة",
  //         "الدرجة العظمى",
  //         "الفصل",
  //         "السنة",
  //         "نوع الامتحان",
  //         "ملاحظات",
  //       ],
  //     ],
  //     body: results.map((r) => [
  //       r.subject_name,
  //       r.score,
  //       r.full_score,
  //       r.semester,
  //       r.academic_year,
  //       r.exam_type || "-",
  //       r.notes || "-",
  //     ]),
  //     styles: { font: "arabic", halign: "right" },
  //     headStyles: { fillColor: [15, 91, 255] },
  //   });

  //   doc.save("student_results.pdf");
  // };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">نتائج الطالب</h1>
      <table className="w-full text-right border rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">المادة</th>
            <th className="border px-3 py-2">الدرجة</th>
            <th className="border px-3 py-2">الدرجة العظمى</th>
            <th className="border px-3 py-2">الفصل</th>
            <th className="border px-3 py-2">السنة</th>
            <th className="border px-3 py-2">نوع الامتحان</th>
            <th className="border px-3 py-2">ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{r.subject_name}</td>
              <td className="border px-2 py-1">{r.score}</td>
              <td className="border px-2 py-1">{r.full_score}</td>
              <td className="border px-2 py-1">{r.semester}</td>
              <td className="border px-2 py-1">{r.academic_year}</td>
              <td className="border px-2 py-1">{r.exam_type || "-"}</td>
              <td className="border px-2 py-1">{r.notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        // onClick={exportToPDF}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        تصدير PDF
      </button>
    </div>
  );
}
