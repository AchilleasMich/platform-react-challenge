import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, children, className = "", ...rest }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 transition ${className}`}
    {...rest}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  rest: PropTypes.object,
};

export default Button;
