import React from "react";
import Button from "../Button/Button";
import { catInfoShape } from "../../common/propTypes";
import BreedInfo from "../BreedInfo";

const CatInfoCard = ({ cat, breeds, loading, closeModal }) => {
  return (
    <div className="bg-white rounded-lg p-4 max-w-lg shadow-md">
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
      <Button onClick={closeModal}>Close</Button>
    </div>
  );
};

CatInfoCard.propTypes = {
  ...catInfoShape,
};

export default CatInfoCard;
