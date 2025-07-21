
import axios from "axios";
import { useState } from "react";
import { getDecryptedToken } from "./useDelete";

export default function usePost() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const add = async (url: string, data: any, isFormData = false) => {
    try {
      const token = getDecryptedToken()

      setLoading(true);

      const headers = {
        ...(isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const body = isFormData ? data : JSON.stringify(data);

      const res = await axios.post(url, body, { headers });
      if(res.status===400){
          setResponse(" لا يمكن الارسال ربما العنصر مغلق   ");
      }
     setResponse(" تمت الإضافة بنجاح");
   
       
   
    } catch (error: any) {
      console.error(" فشل الإرسال:", error);
      setResponse("  حدث خطأ أثناء الإرسال");
    } finally {
      setLoading(false);
    }
  };

  return { add, response, loading };
}