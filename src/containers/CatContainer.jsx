import React from "react";
import { CatInfoCard, CatInfoPage } from "@components/Cats";
import { useParams, useNavigate } from "react-router";
import useFetchCatInfo from "@hooks/useFetchCatInfo";
import PropTypes from "prop-types";
import { apiPost } from "@utils/client";
import { FAVORITES_URL } from "../common/constants";
import useNotification from "@hooks/useNotification";

const CatContainer = ({ isModal }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { catInfo, loading } = useFetchCatInfo(id);

  const notify = useNotification();

  const closeAction = isModal ? () => navigate(-1) : () => navigate("/");

  const handleAddToFavorites = (id) => {
    const addToFavorites = async () => {
      try {
        const res = await apiPost(FAVORITES_URL, { image_id: id });
        if (res.status === 200) {
          notify.success("Added to favorites successfully");
        } else {
          throw new Error("Failed to add to favorites");
        }
      } catch (error) {
        notify.error("Failed to add to favorites: " + error.message);
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
