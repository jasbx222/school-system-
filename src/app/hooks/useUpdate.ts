"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { getDecryptedToken } from "./useDelete";

const useUpdate = () => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoad] = useState<boolean>(false);

  const update = useCallback(async (url: string, data: any) => {
    setLoad(true);
    setResponse(""); // reset previous response
    try {
      const token =getDecryptedToken()
        if(!token)return null;
      const res = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status >= 200 && res.status < 300) {
        setResponse("تم التعديل بنجاح");
      } else {
        setResponse("حدث خطأ أثناء التعديل");
      }
       setLoad(false);
    } catch (error: any) {
      console.error("Post error:", error);
      setResponse("تاكد من الاتصال بالانرنت او البيانات بالفعل مستخدمة");
    } finally {
      setLoad(false);
    }
  }, []);

  return { update, response, loading };
};

export default useUpdate;
