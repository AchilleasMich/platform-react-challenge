import React from "react";
import Button from "../ui/Button";
import { catInfoShape } from "../../common/propTypes";
import { BreedInfo } from "../Breeds";

const CatInfoPage = ({ cat, breeds, loading, closeModal }) => {
  return (
    <div className="p-2 max-w-lg">
      <img
        src={cat.url}
        alt={`Cat ${cat.id}`}
        className="w-full h-auto rounded"
      />
      {loading ? <p className="text-center text-gray-500">Loading...</p> : null}
      <BreedInfo breeds={breeds} />
      {!breeds && !loading && (
        <p className="text-center text-gray-500 mt-4">
          No breed information available for this cat.
        </p>
      )}
      <Button onClick={closeModal}>Home</Button>
    </div>
  );
};

CatInfoPage.propTypes = {
  ...catInfoShape,
};

export default CatInfoPage;
