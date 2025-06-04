import React from "react";
import CatFullCard from "./CatFullCard";

const CatCard = ({ cat }) => {
  return (
    <>
      <div className="w-80 h-[30rem] bg-blue-500 flex items-center justify-center rounded-2xl overflow-hidden cursor-pointer">
        <img
          src={cat.url}
          alt={`Cat ${cat.id}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
};

export default CatCard;
