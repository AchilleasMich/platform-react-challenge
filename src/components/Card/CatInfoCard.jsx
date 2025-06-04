import React from "react";
import Button from "../Button/Button";

const CatInfoCard = ({ cat, breeds, loading, closeModal }) => {
  return (
    <div className="bg-white rounded-lg p-4 max-w-lg shadow-md">
      <img
        src={cat.url}
        alt={`Cat ${cat.id}`}
        className="w-full h-auto rounded"
      />
      {loading ? <p className="text-center text-gray-500">Loading...</p> : null}
      {breeds && breeds.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl mb-2">Breeds</h2>
          {breeds.map((breed) => (
            <div key={breed.id} className="mb-2 flex flex-col gap-2">
              <p className="text-xl font-bold">{breed.name}</p>
              <p>{breed.description}</p>
              <p>Origin: {breed.origin}</p>
            </div>
          ))}
        </div>
      )}
      {!breeds && !loading && (
        <p className="text-center text-gray-500 mt-4">
          No breed information available for this cat.
        </p>
      )}
      <Button onClick={closeModal}>Close</Button>
    </div>
  );
};

export default CatInfoCard;
