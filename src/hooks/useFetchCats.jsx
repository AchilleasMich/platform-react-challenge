import { useState, useCallback, useEffect } from "react";
const CATS_PER_PAGE = 10;
const CATS_API_URL = "https://api.thecatapi.com/v1/images/search";

const useFetchCats = (breedId) => {
  const [fetchedCats, setFetchedCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchCats = useCallback(async (pageNum = 0, controller) => {
    setLoading(true);
    try {
      const url =
        CATS_API_URL +
        `?limit=${CATS_PER_PAGE}&page=${pageNum}` +
        (breedId ? `&breed_id=${breedId}` : "");
      const response = await fetch(url, { signal: controller?.signal });
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
