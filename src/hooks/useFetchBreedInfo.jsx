import { useState, useEffect } from "react";
import { useParams } from "react-router";

const API_URL = "https://api.thecatapi.com/v1/breeds";

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

    fetch(`${API_URL}/${id}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch breed info");
        return res.json();
      })
      .then((data) => setBreedInfo(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  return { breedInfo, loading, error };
};

export default useFetchBreedInfo;
