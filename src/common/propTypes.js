import PropTypes from "prop-types";

export const catShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

export const breedShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  origin: PropTypes.string,
});

export const breedListShape = PropTypes.arrayOf(breedShape);

export const catListShape = PropTypes.arrayOf(catShape);

export const catInfoShape = PropTypes.shape({
  cat: catShape.isRequired,
  breeds: PropTypes.arrayOf(breedShape),
  loading: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
});
