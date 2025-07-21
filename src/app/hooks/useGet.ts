'use client';

import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { getDecryptedToken } from './useDelete';
const useGet = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const token = getDecryptedToken();
      if (!token) return;
      setLoading(true);

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json; charset=UTF-8',
        },
      });

      if (res.status >= 200) {
        setData(res.data.data);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
};

export default useGet;
