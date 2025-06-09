import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BREEDS_URL } from "../constants";
import { apiFetch } from "../utils/apiFetch";

const useFetchBreedInfo = () => {
  const [breedInfo, setBreedInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setBreedInfo(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const fetchBreedInfo = async () => {
      try {
        const res = await apiFetch(`${BREEDS_URL}/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch breed info");
        setBreedInfo(res);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreedInfo();

    return () => controller.abort();
  }, [id]);

  return { breedInfo, loading, error };
};

export default useFetchBreedInfo;
