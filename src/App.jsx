import React from "react";
import Header from "./components/Header";
import CatsGalleryContainer from "./containers/CatsGalleryContainer";
import { Route, Routes, useLocation } from "react-router";
import CatContainer from "./containers/CatContainer";
import Modal from "./components/Modal/Modal";
import CatLayout from "./components/Layout/CatLayout";
import BreedsContainer from "./containers/BreedsContainer";
import BreedContainer from "./containers/BreedContainer";

const App = () => {
  const location = useLocation();
  const state = location.state;
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-4 flex justify-center items-start">
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<CatsGalleryContainer />} />
          <Route
            path="/cat/:id"
            element={
              <CatLayout>
                <CatContainer />
              </CatLayout>
            }
          />
          <Route path="/breeds" element={<BreedsContainer />} />
          <Route path="/favorites" element={<div>Favorites Page</div>} />
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
