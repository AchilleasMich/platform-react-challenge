import React from "react";
import { Link } from "react-router";

const Header = () => (
  <header className="bg-white shadow p-4 sticky top-0 z-10 flex justify-center">
    <div className="max-w-7xl mx-auto flex items-center gap-6 text-xl font-semibold text-gray-800">
      <Link to="/" className="hover:text-blue-600 transition-colors">
        Cat Gallery
      </Link>
      <div className="flex gap-4 ml-8 text-base font-normal">
        <Link
          to="/breeds"
          className="px-3 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          Breeds
        </Link>
        <Link
          to="/favorites"
          className="px-3 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          Favorites
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
