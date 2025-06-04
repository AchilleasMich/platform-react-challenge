import React, { useState, useCallback, useEffect, useMemo } from "react";
import PreviewCard from "../components/Card/PreviewCard";
import Button from "../components/Button/Button";
import { removeDuplicates } from "../utils/removeDuplicates";
import CatContainer from "./CatContainer";

const CATS_PER_PAGE = 10;

const CatsGalleryContainer = () => {
  const [fetchedCats, setFetchedCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cat, setCat] = useState(null);

  // Fetch cats from API
  const fetchCats = useCallback(async (pageNum = 0, controller) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${CATS_PER_PAGE}&page=${pageNum}`,
        { signal: controller?.signal }
      );
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

  // Initial fetch and on page change
  useEffect(() => {
    const controller = new AbortController();
    fetchCats(page, controller);
    return () => controller.abort();
  }, [page, fetchCats]);

  // Compute unique cats only when fetchedCats changes
  const uniqueCats = useMemo(
    () => removeDuplicates(fetchedCats),
    [fetchedCats]
  );

  const handleCatClick = (selectedCat) => {
    setCat(selectedCat);
    setIsModalOpen(true);
  };

  const fetchMore = () => {
    if (!loading) {
      setPage((prev) => prev + 1); // triggers useEffect
    }
  };

  return (
    <div className="flex flex-col items-center max-w-screen-xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {uniqueCats.map((cat) => (
          <div key={cat.id ?? cat.url} onClick={() => handleCatClick(cat)}>
            <PreviewCard cat={cat} />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CatContainer cat={cat} closeModal={() => setIsModalOpen(false)} />
      )}

      <div className="w-full flex justify-center mt-4 items-center">
        {loading && <span className="mr-4">Loading...</span>}
        {!loading && <Button onClick={fetchMore}>Get More</Button>}
      </div>
    </div>
  );
};

export default CatsGalleryContainer;
