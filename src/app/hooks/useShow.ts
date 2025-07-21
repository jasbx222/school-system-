import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getDecryptedToken } from "./useDelete";

export default function useShow<T>(url: string, id: any ) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async()=>{
      try {
          const token = getDecryptedToken()
            if(!token)return null;
        setLoading(true);
        const res = await axios.get(`${url}/${id}`,{
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
    },[]
  )
   useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading ,reftch:fetchData};
}
