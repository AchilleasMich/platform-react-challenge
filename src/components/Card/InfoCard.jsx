import React from "react";

const InfoCard = ({ cat, breeds, closeModal, loading }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={closeModal}
    >
      {/* Blurred background */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/30"
        aria-hidden="true"
      />
      {/* Modal content */}
      <div
        className="relative bg-white rounded-lg p-4 max-w-lg z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={cat.url}
          alt={`Cat ${cat.id}`}
          className="w-full h-auto rounded"
        />
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : null}
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
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
