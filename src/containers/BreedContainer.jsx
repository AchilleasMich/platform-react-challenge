import React from "react";
import useFetchCats from "@hooks/useFetchCats";
import Button from "@components/ui/Button";

const BreedsContainer = () => {
  const { fetchedCats, loading, fetchMore } = useFetchCats();

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
