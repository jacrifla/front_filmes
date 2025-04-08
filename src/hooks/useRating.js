// src/hooks/useRating.js
import { useEffect, useState } from "react";
import { addRating, updateRating, getRatingByUserAndMovie } from "../services/ratingService";

export default function useRating(tmdbId, userId) {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await getRatingByUserAndMovie(tmdbId, userId);
        const nota = response?.data?.nota ?? 0;
        setRating(nota);
      } catch (err) {
        console.error("Erro ao buscar avaliação:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRating();
  }, [tmdbId, userId]);

  const handleRating = async (nota) => {
    try {
      setRating(nota);
      if (rating > 0) {
        await updateRating({ usuario_id: userId, tmdb_id: tmdbId, nota });
      } else {
        await addRating({ usuario_id: userId, tmdb_id: tmdbId, nota });
      }
    } catch (err) {
      console.error("Erro ao salvar avaliação:", err);
    }
  };

  return { rating, isLoading, handleRating, setRating };
}
