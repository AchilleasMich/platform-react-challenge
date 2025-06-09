import React from "react";
import useFetchBreeds from "../hooks/useFetchBreeds";
import { Link, useLocation } from "react-router";
import BreedCard from "../components/Card/BreedCard";

const BreedsContainer = () => {
  const { breeds, loading } = useFetchBreeds();

  const location = useLocation() || null;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cat Breeds</h1>
      {loading ? (
        <p>Loading breeds...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {breeds.map((breed) => (
            <BreedCard key={breed.id} breed={breed} location={location} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BreedsContainer;
