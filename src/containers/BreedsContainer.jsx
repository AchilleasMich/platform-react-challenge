import React from "react";
import { useLocation } from "react-router";
import { BreedCard } from "@components/Breeds";
import useFetch from "@hooks/useFetch";
import { BREEDS_URL } from "@common/constants";

const SkeletonCard = () => (
  <div className="animate-pulse bg-red-300 rounded-lg h-48 w-full mb-4" />
);

const BreedsContainer = () => {
  const { data: breeds, loading } = useFetch(BREEDS_URL, { defaultValue: [] });

  const location = useLocation() || null;

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cat Breeds</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cat Breeds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {breeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} location={location} />
        ))}
      </div>
    </div>
  );
};

export default BreedsContainer;
