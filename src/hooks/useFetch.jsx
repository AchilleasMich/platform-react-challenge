import { useState, useCallback, useEffect } from "react";
import { PAGE_SIZE, CATS_PER_PAGE } from "@common/constants";
import { apiFetch, apiDelete } from "@utils/client";

const buildCatsUrl = (url, pageNum) => {
  return `${url}?limit=${PAGE_SIZE}&page=${pageNum}`;
};

const useFetch = (url, options = {}) => {
  const {
    pagination = false,
    accumulate = false,
    defaultValue = null,
    deleteMethod = false,
  } = options;

  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const finalUrl = pagination ? buildCatsUrl(url, page) : url;

  const fetchData = useCallback(async (pageNum = 0, controller) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(finalUrl, { signal: controller?.signal });
      const data = await response.json();

      if (accumulate) {
        setData((prev) => (prev ? [...prev, ...data] : data));
      } else {
        setData(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      await fetchData(page, controller);
    };
    run();
    return () => controller.abort();
  }, [page, fetchData]);

  const fetchMore = pagination
    ? () => {
        if (!loading) {
          setPage((prev) => prev + 1);
        }
      }
    : null;

  const refetch = useCallback(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  const deleteResource = useCallback(
    async (id) => {
      if (!deleteMethod) {
        console.warn("Delete method is not enabled for this hook.");
        return null;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await apiDelete(`${finalUrl}/${id}`);
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

  return {
    data,
    loading,
    error,
    fetchMore,
    deleteResource,
  };
};

export default useFetch;
