import axios from "axios";
import { useEffect, useState } from "react";
import { getDecryptedToken } from "./useDelete";

export default function useGetOffer<T>(url: string ) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const token = getDecryptedToken()
          if(!token)return null;
        setLoading(true);
        const res = await axios.get(`${url}`,{
               headers:{
      Authorization:`Bearer ${token}`,
      Accept:'application/json; charset=UTF-8'
    }
        });
       
        setData(res.data); // أو json مباشرة حسب الـ API
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
}
