import React from "react";
import InfoCard from "../components/Card/InfoCard";
import InfoPage from "../components/Pages/InfoPage";
import { useParams, useNavigate } from "react-router";
import useFetchCatInfo from "../hooks/useFetchCatInfo";

const CatContainer = ({ isModal }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { catInfo, loading } = useFetchCatInfo(id);

  const closeAction = isModal ? () => navigate(-1) : () => navigate("/");

  if (!catInfo) return null;

  if (isModal) {
    return (
      <InfoCard
        cat={catInfo}
        breeds={catInfo?.breeds}
        closeModal={closeAction}
        loading={loading}
      />
    );
  }

  return (
    <InfoPage
      cat={catInfo}
      breeds={catInfo?.breeds}
      closeModal={closeAction}
      loading={loading}
    />
  );
};

export default CatContainer;
