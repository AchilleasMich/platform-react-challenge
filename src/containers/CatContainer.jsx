import React from "react";
import CatInfoCard from "../components/Card/CatInfoCard";
import CatInfoPage from "../components/Pages/CatInfoPage";
import { useParams, useNavigate } from "react-router";
import useFetchCatInfo from "../hooks/useFetchCatInfo";
import PropTypes from "prop-types";

const CatContainer = ({ isModal }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { catInfo, loading } = useFetchCatInfo(id);

  const closeAction = isModal ? () => navigate(-1) : () => navigate("/");

  if (!catInfo) return null;

  if (isModal) {
    return (
      <CatInfoCard
        cat={catInfo}
        breeds={catInfo?.breeds}
        closeModal={closeAction}
        loading={loading}
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
