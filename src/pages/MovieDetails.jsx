import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h2>Detalhes do Filme</h2>
      <p>ID do filme: {id}</p>
      {/* Aqui vai vir os detalhes puxados da TMDB */}
    </div>
  );
}
