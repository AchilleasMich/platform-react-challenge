import React from "react";
import Header from "./components/Header";
import CatsGalleryContainer from "./containers/CatsGalleryContainer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-4 flex justify-center items-start">
        <CatsGalleryContainer />
      </main>
    </div>
  );
};

export default App;
