import React from "react";
import Button from "@components/ui/Button";
import useFetch from "@hooks/useFetch";
import { CATS_URL } from "@common/constants";

const BreedsContainer = () => {
  const {
    data: fetchedCats,
    loading,
    fetchMore,
    error,
  } = useFetch(CATS_URL, {
    defaultValue: [],
    pagination: true,
    accumulate: true,
  });

  return (
    <div className="flex flex-col items-center max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Cat Images</h1>
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full overflow-y-auto"
        style={{ maxHeight: "70vh" }}
      >
        {fetchedCats && fetchedCats.length > 0 ? (
          fetchedCats.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              {cat.url && (
                <img
                  src={cat.url}
                  alt={cat.id}
                  className="w-32 h-32 object-cover rounded mb-4"
                />
              )}
            </div>
          ))
        ) : (
          <p>No cat images available.</p>
        )}
      </div>
      <Button onClick={fetchMore}>More</Button>
    </div>
  );
};

export default BreedsContainer;
