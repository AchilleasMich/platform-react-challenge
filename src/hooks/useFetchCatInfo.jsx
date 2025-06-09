import { useState, useEffect } from "react";
import { CATS_BASE_URL } from "../common/constants";
import { apiFetch } from "../utils/client";

const useFetchCatInfo = (id) => {
  const [catInfo, setCatInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCatInfo = async () => {
      setLoading(true);
      try {
        const res = await apiFetch(`${CATS_BASE_URL}/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch cat info");
        const data = await res.json();
        setCatInfo(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setCatInfo(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCatInfo();

    return () => {
      controller.abort();
    };
  }, [id]);

  return { catInfo, loading };
};

export default useFetchCatInfo;
