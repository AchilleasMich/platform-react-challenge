import { useState, useEffect } from "react";

const useBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBreeds = async () => {
      try {
        const response = await fetch("https://api.thecatapi.com/v1/breeds", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch breeds");
        }
        const data = await response.json();
        setBreeds(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();

    return () => {
      controller.abort();
    };
  }, []);

  return { breeds, loading, error };
};

export default useBreeds;
