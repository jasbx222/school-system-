import axios from "axios";
import { useState } from "react";
import { getDecryptedToken } from "./useDelete";

export default function useUpdateFaq() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = async (url: string, data: any, isFormData = false) => {
    try {
      const token = getDecryptedToken()
  if(!token)return null;
      setLoading(true);

      const headers = {
        ...(isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const body = isFormData ? data : JSON.stringify(data);

      const res = await axios.post(url, body, { headers });
      if (res.status >= 200 && res.status <= 300) {
        setResponse("تم اضافة الباقة بنجاح ");
      }
    } catch (error: any) {
      console.error("فشل الإرسال:", error);
      setResponse("حدث خطأ أثناء الإرسال");
    } finally {
      setLoading(false);
    }
  };

  return { update, response, loading };
}
