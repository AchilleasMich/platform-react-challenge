import React from "react";
import CatInfoCard from "../components/Card/CatInfoCard";
import CatInfoPage from "../components/Pages/CatInfoPage";
import { useParams, useNavigate } from "react-router";
import useFetchCatInfo from "../hooks/useFetchCatInfo";
import PropTypes from "prop-types";
import { apiPost } from "../utils/client";
import { FAVORITES_URL } from "../constants";

const CatContainer = ({ isModal }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { catInfo, loading } = useFetchCatInfo(id);

  const closeAction = isModal ? () => navigate(-1) : () => navigate("/");

  const handleAddToFavorites = (id) => {
    console.log("Add to favorites clicked", id);
    const addToFavorites = async () => {
      try {
        const res = await apiPost(FAVORITES_URL, { image_id: id });
        const data = await res.json();
        console.log("Added to favorites:", data);
        // Optionally, you can show a success message or update the UI
      } catch (error) {
        console.error("Error adding to favorites:", error);
        // Optionally, handle the error (e.g., show an error message)
      }
    };
    addToFavorites();
  };

  if (!catInfo) return null;

  if (isModal) {
    return (
      <CatInfoCard
        cat={catInfo}
        breeds={catInfo?.breeds}
        closeModal={closeAction}
        loading={loading}
        onAddToFavorites={(id) => handleAddToFavorites(id)}
      />
    );
  }

  return (
    <CatInfoPage
      cat={catInfo}
      breeds={catInfo?.breeds}
      closeModal={closeAction}
      loading={loading}
    />
  );
};

CatContainer.propTypes = {
  isModal: PropTypes.bool,
};

export default CatContainer;
