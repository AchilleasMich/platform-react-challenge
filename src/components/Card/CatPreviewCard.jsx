import React from "react";
import PropTypes from "prop-types";

const CatPreviewCard = ({ cat }) => {
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

CatPreviewCard.propTypes = {
  cat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default CatPreviewCard;
