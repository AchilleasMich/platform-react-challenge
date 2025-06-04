import React, { useMemo } from "react";
import PreviewCard from "../components/Card/PreviewCard";
import Button from "../components/Button/Button";
import { removeDuplicates } from "../utils/removeDuplicates";
import CatContainer from "./CatContainer";
import { Link, useLocation } from "react-router";
import useFetchCats from "../hooks/useFetchCats";

const CatsGalleryContainer = () => {
  const { fetchedCats, loading, fetchMore } = useFetchCats();

  const location = useLocation();

  // Compute unique cats only when fetchedCats changes
  const uniqueCats = useMemo(
    () => removeDuplicates(fetchedCats),
    [fetchedCats]
  );

  return (
    <div className="flex flex-col items-center max-w-screen-xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {uniqueCats.map((cat) => (
          <Link
            to={`/cat/${cat.id}`}
            state={{ backgroundLocation: location }}
            key={cat.id}
          >
            <PreviewCard cat={cat} />
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
