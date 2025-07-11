const API_URL = "https://api.thecatapi.com/v1";

export const BREEDS_URL = `${API_URL}/breeds`;
export const CATS_BASE_URL = `${API_URL}/images`;
export const CATS_URL = `${API_URL}/images/search`;
export const FAVORITES_URL = `${API_URL}/favourites`;

export const CATS_PER_PAGE = 10;
export const PAGE_SIZE = 10;

export const NOTIFICATION_TIMEOUT = 3000;
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
};
