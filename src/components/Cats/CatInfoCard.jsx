import React from "react";
import Button from "../ui/Button";
import { catInfoShape } from "../../common/propTypes";
import { BreedInfo } from "../Breeds";
import PropTypes from "prop-types";

const CatInfoCard = ({
  cat,
  breeds,
  loading,
  closeModal,
  onAddToFavorites,
}) => {
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
      <div className="flex justify-between mt-4">
        <Button onClick={closeModal}>Close</Button>
        <Button onClick={() => onAddToFavorites && onAddToFavorites(cat.id)}>
          Add to Favorites
        </Button>
      </div>
    </div>
  );
};

CatInfoCard.propTypes = {
  ...catInfoShape,
  onAddToFavorites: PropTypes.func,
};

export default CatInfoCard;
