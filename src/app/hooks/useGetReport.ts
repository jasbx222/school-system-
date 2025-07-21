import axios from "axios";
import { useEffect, useState } from "react";
import { getDecryptedToken } from "./useDelete";

function useGetReport<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
          const token = getDecryptedToken()
  if (!token) return;
        const res = await axios.get(url,{
           headers:{
      Authorization:`Bearer ${token}`,
      Accept:'application/json; charset=UTF-8'
    }
        });
        const json = res.data
        setData(json); 
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
}

export default useGetReport;
