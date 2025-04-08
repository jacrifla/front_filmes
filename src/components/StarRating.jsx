import React, { useState } from "react";
import useRating from "../hooks/useRating";

function StarRating({ tmdbId, userId }) {
  const [hovered, setHovered] = useState(0);
  const { rating, isLoading, handleRating } = useRating(tmdbId, userId);

  if (isLoading) return <div>Carregando avaliação...</div>;

  return (
    <div className="d-flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: (hovered || rating) >= star ? "#ffc107" : "#e4e5e9",
            fontSize: "1.5rem",
          }}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
