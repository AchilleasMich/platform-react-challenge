import React from "react";

const CatFullCard = ({ cat, closeModal }) => {
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

export default CatFullCard;
