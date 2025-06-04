import { useState, useRef, useEffect, useCallback } from "react";

export function useFetch(
  baseUrl,
  { limit, initialPage = 0, params = {} } = {}
) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [internalParams] = useState(params);

  const abortRef = useRef(null);

  const fetchData = useCallback(
    async (pageToFetch = initialPage) => {
      if (abortRef.current) abortRef.current.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const url = new URL(baseUrl);

        if (limit !== undefined) {
          url.searchParams.set("limit", limit);
          url.searchParams.set("page", pageToFetch);
        }

        for (const [key, value] of Object.entries(internalParams)) {
          url.searchParams.append(key, value);
        }

        const res = await fetch(url.toString(), { signal: controller.signal });
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        const result = await res.json();

        setData((prev) =>
          limit !== undefined ? [...prev, ...result] : result
        );
        return result;
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [baseUrl, limit, internalParams, initialPage]
  );

  const fetchMore = useCallback(async () => {
    if (limit === undefined) return; // not paginated
    const nextPage = page + 1;
    const result = await fetchData(nextPage);
    if (result) setPage(nextPage);
  }, [fetchData, page, limit]);

  useEffect(() => {
    fetchData(initialPage, false);
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchData, initialPage]);

  return {
    data,
    loading,
    error,
    fetchMore,
  };
}
