import React from "react";
import InfoCard from "../components/Card/InfoCard";

const CatContainer = ({ cat, closeModal }) => {
  const [catInfo, setCatInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.thecatapi.com/v1/images/${cat.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cat info");
        return res.json();
      })
      .then((data) => {
        setCatInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [cat]);

  return (
    <InfoCard
      cat={cat}
      breeds={catInfo?.breeds}
      closeModal={closeModal}
      loading={loading}
    />
  );
};

export default CatContainer;
