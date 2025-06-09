import { useState, useCallback, useEffect } from "react";
import { CATS_URL, CATS_PER_PAGE } from "../constants";
import { apiFetch } from "../utils/apiFetch";

const buildCatsUrl = (breedId, pageNum) => {
  let url = `${CATS_URL}?limit=${CATS_PER_PAGE}&page=${pageNum}`;
  if (breedId) {
    url += `&breed_id=${breedId}`;
  }
  return url;
};

const useFetchCats = (breedId) => {
  const [fetchedCats, setFetchedCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchCats = useCallback(async (pageNum = 0, controller) => {
    setLoading(true);
    try {
      const url = buildCatsUrl(breedId, pageNum);
      const response = await apiFetch(url, { signal: controller?.signal });
      const data = await response.json();
      setFetchedCats((prev) => [...prev, ...data]);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch cats:", error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchCats(page, controller);
    return () => controller.abort();
  }, [page, fetchCats]);

  const fetchMore = () => {
    if (!loading) {
      setPage((prev) => prev + 1); // triggers useEffect
    }
  };

  return {
    fetchedCats,
    loading,
    fetchMore,
  };
};

export default useFetchCats;
