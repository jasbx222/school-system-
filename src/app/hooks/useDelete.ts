"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY_TOKEN || "fallback-key";

export function getDecryptedToken() {
  if (typeof window === "undefined") return null;

  const encryptedToken = localStorage.getItem("token");
  if (!encryptedToken || !SECRET_KEY) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) throw new Error("Invalid token decryption");
    return decrypted;
  } catch (err) {
    console.error("فشل في فك تشفير التوكن:", err);
    return null;
  }
}



// Hook الحذف
const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");

  const remove = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const token = getDecryptedToken();
      if (!token) {
        setResponse("المستخدم غير مصرح");
        setLoading(false);
        return;
      }

      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (res.status >= 200 && res.status < 300) {
        setResponse("تم الحذف بنجاح");
      } else {
        setResponse("فشل في الحذف");
      }
    } catch (error: any) {
      setResponse(error?.response?.data?.message || "حدث خطأ أثناء الحذف");
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, response, loading };
};

export default useDelete;
