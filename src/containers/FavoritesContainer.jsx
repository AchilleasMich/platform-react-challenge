import React, { useState } from "react";
import useFetchFavorites from "@hooks/useFetchFavorites";
import Button from "@components/ui/Button";

const FavoritesContainer = () => {
  const { favorites, removeFavorite } = useFetchFavorites();
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (id) => {
    setRemovingId(id);
    if (removeFavorite) {
      await removeFavorite(id);
    }
    setRemovingId(null);
  };

  return (
    <div className="flex flex-col items-center max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Favorites</h1>
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full overflow-y-auto"
        style={{ maxHeight: "70vh" }}
      >
        {favorites && favorites.length > 0 ? (
          favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              {fav.image && (
                <img
                  src={fav.image.url}
                  alt={fav.id}
                  className="w-32 h-32 object-cover rounded mb-4"
                />
              )}
              <Button
                onClick={() => handleRemove(fav.id)}
                disabled={removingId === fav.id}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {removingId === fav.id ? "Removing..." : "Remove"}
              </Button>
            </div>
          ))
        ) : (
          <p>No favorites available.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesContainer;
