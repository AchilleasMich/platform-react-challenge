import React, { useState } from "react";
import CatCard from "../components/Card/CatCard";
import Button from "../components/Button/Button";
import { useFetch } from "../hooks/useFetch";
import { removeDuplicates } from "../utils/removeDuplicates";
import CatFullCard from "../components/Card/CatFullCard";

const CATS_PER_PAGE = 10;

const CatGalleryContainer = () => {
  const {
    data: fetchedCats,
    loading,
    fetchMore,
  } = useFetch(`https://api.thecatapi.com/v1/images/search`, {
    limit: 10,
    initialPage: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cat, setCat] = useState(null);

  const handleCatClick = (selectedCat) => {
    console.log("Cat clicked:", selectedCat);
    setCat(selectedCat);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-wrap justify-center max-w-screen-xl gap-4">
      {removeDuplicates(fetchedCats).map((cat) => (
        <div key={cat.id} onClick={() => handleCatClick(cat)}>
          <CatCard cat={cat} />
        </div>
      ))}
      {isModalOpen && (
        <CatFullCard cat={cat} closeModal={() => setIsModalOpen(false)} />
      )}
      <div className="w-full flex justify-center mt-2">
        <Button onClick={fetchMore} enabled={!loading}>
          Get More
        </Button>
      </div>
    </div>
  );
};

export default CatGalleryContainer;
