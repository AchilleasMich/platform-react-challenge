import React, { useState, useEffect } from "react";

const TOTAL_CATS = 1000;
const CATS_PER_PAGE = 10;

const App = () => {
  const [cats, setCats] = useState([]);

  const handleGetMore = () => {
    const getCats = async () => {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      if (!response.ok) {
        console.error("Failed to fetch cats");
        return;
      }
      const data = await response.json();
      console.log(data);
      setCats([...cats, ...data]);
    };
    getCats();
  };

  useEffect(() => {
    const getCats = async () => {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      if (!response.ok) {
        console.error("Failed to fetch cats");
        return;
      }
      const data = await response.json();
      console.log(data);
      setCats(data);
    };
    getCats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 sticky top-0 z-10 flex justify-center">
        <div className="max-w-7xl mx-auto text-xl font-semibold text-gray-800">
          Cat Gallery
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex justify-center items-start">
        <div className="flex flex-wrap justify-center max-w-screen-xl gap-4">
          {cats.map((cat) => (
            <div
              key={cat.id}
              className="w-80 h-[30rem] bg-blue-500 flex items-center justify-center rounded-2xl overflow-hidden"
            >
              <img
                src={cat.url}
                alt={`Cat ${cat.id}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          <div className="w-full flex justify-center mt-2">
            <button
              onClick={handleGetMore}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 transition"
            >
              Get More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
