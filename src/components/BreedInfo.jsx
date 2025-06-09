import React from "react";
import { breedListShape } from "../common/propTypes";

const BreedInfo = ({ breeds }) => {
  if (!breeds || breeds.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No breed information available.
      </p>
    );
  }

  return (
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
  );
};

BreedInfo.propTypes = {
  ...breedListShape,
};

export default BreedInfo;
