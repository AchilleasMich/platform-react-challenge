import { useState, useEffect, useCallback } from "react";
import { FAVORITES_URL } from "../constants";
import { apiFetch } from "../utils/client";

const useFetchFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(FAVORITES_URL, { signal });
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchFavorites(controller.signal);
    return () => controller.abort();
  }, [fetchFavorites]);

  const refetch = useCallback(() => {
    const controller = new AbortController();
    fetchFavorites(controller.signal);
    return () => controller.abort();
  }, [fetchFavorites]);

  const removeFavorite = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFetch(`${FAVORITES_URL}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to remove favorite");
        }
        refetch();
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    },
    [refetch]
  );

  return { favorites, loading, error, removeFavorite, refetch };
};

export default useFetchFavorites;
