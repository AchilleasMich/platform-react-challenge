import { useState, useEffect } from "react";

const useFetchCatInfo = (id) => {
  const [catInfo, setCatInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCatInfo = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.thecatapi.com/v1/images/${id}`, {
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
