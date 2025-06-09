import React from "react";
import PropTypes from "prop-types";

const CatLayout = ({ children }) => {
  return (
    <div className="max-w-xl mx-auto mt-4 mb-16 px-4">
      <div className="bg-white rounded-xl p-4 shadow-xl w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

CatLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CatLayout;
