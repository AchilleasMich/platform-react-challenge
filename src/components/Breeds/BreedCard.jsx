import React from "react";
import { Link } from "react-router";
import { breedShape } from "../../common/propTypes";
import PropTypes from "prop-types";

const BreedCard = ({ breed, location = {} }) => {
  return (
    <div
      key={breed.id}
      className="bg-white rounded-lg p-4 max-w-lg shadow-md border-gray-200 hover:shadow-lg transition-shadow duration-200"
    >
      <Link
        to={"/breed/" + breed.id}
        className="block mb-2 underline text-blue-600 hover:text-blue-800"
        state={{ backgroundLocation: location }}
      >
        <h2 className="text-lg font-semibold mb-2">{breed.name}</h2>
      </Link>
      <p className="text-gray-700 text-sm">{breed.description}</p>
    </div>
  );
};

BreedCard.propTypes = {
  ...breedShape,
  location: PropTypes.object,
};

export default BreedCard;
