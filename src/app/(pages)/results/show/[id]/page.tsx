"use client";

import React, { useRef } from "react";
import { useParams } from "next/navigation";
import useGetData from "@/app/hooks/useGetData";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { GraduationCap } from "lucide-react";

interface Subject {
  title: string;
  degree: number;
}
interface Data {
  id: number;
  student: string;
  type_exam: string;
  subjects: Subject[];
}
interface Result {
  data: Data;
}

const Page = () => {
  const { id } = useParams();
  const contentRef = useRef(null);

  const { data: result, loading } = useGetData<Result>(
    `${process.env.NEXT_PUBLIC_BASE_URL}results/${id}`,
    
  );
  const translateExam = (ex: string) => {
    switch (ex) {
      case "month":
        return "امتحان شهري";
      case "day":
        return "امتحان يومي";
      case "year":
        return "امتحان سنوي";

      default:
        break;
    }
  };
  const exportPDF = async () => {
    const input = contentRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`student_result_${result?.data?.id}.pdf`);
  };

  if (loading)
    return <div className="p-6 text-center text-lg">جاري التحميل...</div>;

  if (!result)
    return (
      <div className="p-6 text-center text-red-600">النتيجة غير موجودة.</div>
    );

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={exportPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            تصدير PDF
          </button>
        </div>

        <div
          ref={contentRef}
          style={{
            direction: "rtl",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "1px solid #dbeafe",
            fontFamily: "Arial, sans-serif",
            color: "#1e3a8a",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              marginBottom: "10px",
              fontWeight: "bold",
              color: "#1d4ed8", // text-blue-700
              display: "flex",
              alignItems: "center",
              gap: "15px", // يعادل gap-2
            }}
          >
            <GraduationCap style={{ color: "#3b82f6" }} size={28} />{" "}
            {/* text-blue-500 */}
            نتائج الطالب: {result.data.student}
          </h1>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "16px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#dbeafe",
                  color: "#1e3a8a",
                  fontSize: "18px",
                }}
              >
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ccc",
                    textAlign: "center",
                  }}
                >
                  اسم المادة
                </th>
                <th
                  style={{
                    padding: "12px",
                    border: "1px solid #ccc",
                    textAlign: "center",
                  }}
                >
                  الدرجة
                </th>
              </tr>
            </thead>
            <tbody>
              {result?.data?.subjects?.map((subj, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#eff6ff" : "#ffffff",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#bfdbfe")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      idx % 2 === 0 ? "#eff6ff" : "#ffffff")
                  }
                >
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                    }}
                  >
                    {subj.title}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: subj.degree >= 50 ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {subj.degree}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: "#f3f4f6" }}>
                <td
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    border: "1px solid #ccc",
                  }}
                >
                  نوع الامتحان
                </td>
                <td
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    border: "1px solid #ccc",
                  }}
                >
                  {translateExam(result?.data.type_exam)}
                </td>
              </tr>
              <tr style={{ backgroundColor: "#f3f4f6" }}>
                <td
                  style={{
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  توقيع ولي الأمر
                </td>
                <td
                  style={{
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  توقيع الإدارة
                </td>
              </tr>
            </tfoot>
          </table>

          <p
            style={{
              fontSize: "14px",
              textAlign: "center",
              color: "#6b7280",
              marginTop: "24px",
            }}
          >
            تصميم وبرمجة شكة الحزمة التقنية - © 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
