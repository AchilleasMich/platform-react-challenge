import React from "react";
import useFetchBreeds from "../hooks/useFetchBreeds";
import { Link, useLocation } from "react-router";

const BreedsContainer = () => {
  const { breeds, loading } = useFetchBreeds();

  const location = useLocation();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cat Breeds</h1>
      {loading ? (
        <p>Loading breeds...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {breeds.map((breed) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default BreedsContainer;
