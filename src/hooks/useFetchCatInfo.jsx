import { useState, useEffect } from "react";

const useFetchCatInfo = (id) => {
  const [catInfo, setCatInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatInfo = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.thecatapi.com/v1/images/${id}`);
        if (!res.ok) throw new Error("Failed to fetch cat info");
        const data = await res.json();
        setCatInfo(data);
      } catch {
        setCatInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCatInfo();
  }, [id]);

  return { catInfo, loading };
};

export default useFetchCatInfo;
