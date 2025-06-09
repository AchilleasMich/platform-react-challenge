import React from "react";
import { Route, Routes, useLocation } from "react-router";
import Modal from "@components/ui/Modal";
import { CatLayout, Header } from "@components/ui/Layout";

import {
  CatContainer,
  BreedsContainer,
  BreedContainer,
  FavoritesContainer,
  CatsGalleryContainer,
} from "@containers";

const App = () => {
  const location = useLocation();
  const state = location.state;
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-4 flex justify-center items-start">
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<CatsGalleryContainer />} />
          <Route path="/cat/:id" element={<CatContainer />} />
          <Route path="/breeds" element={<BreedsContainer />} />
          <Route path="/favorites" element={<FavoritesContainer />} />
          <Route path="/breed/:id" element={<BreedContainer />} />
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/cat/:id"
              element={
                <Modal>
                  <CatContainer isModal={true} />
                </Modal>
              }
            />
            <Route
              path="/breed/:id"
              element={
                <Modal>
                  <BreedContainer isModal={true} />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default App;
