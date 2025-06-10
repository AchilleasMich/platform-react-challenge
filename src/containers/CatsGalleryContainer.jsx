import React, { useMemo } from "react";
import CatPreviewCard from "@components/Cats/CatPreviewCard";
import Button from "@components/ui/Button";
import { removeDuplicates } from "@utils/removeDuplicates";
import { Link, useLocation } from "react-router";
import useFetch from "@hooks/useFetch";
import { CATS_URL } from "@common/constants";

const CatsGalleryContainer = () => {
  const {
    data: fetchedCats,
    loading,
    fetchMore,
    error,
  } = useFetch(CATS_URL, {
    defaultValue: [],
    pagination: true,
    accumulate: true,
  });
  const location = useLocation();

  // Compute unique cats only when fetchedCats changes
  const uniqueCats = useMemo(
    () => removeDuplicates(fetchedCats),
    [fetchedCats]
  );

  if (error) {
    return (
      <div className="flex flex-col items-center max-w-screen-xl mx-auto">
        <h2 className="text-red-500">Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-screen-xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {uniqueCats.map((cat) => (
          <Link
            to={`/cat/${cat.id}`}
            state={{ backgroundLocation: location }}
            key={cat.id}
          >
            <CatPreviewCard cat={cat} />
          </Link>
        ))}
      </div>

      <div className="w-full flex justify-center mt-4 items-center">
        {loading && <span className="mr-4">Loading...</span>}
        {!loading && <Button onClick={fetchMore}>Get More</Button>}
      </div>
    </div>
  );
};

export default CatsGalleryContainer;
