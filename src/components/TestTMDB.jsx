
import { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/tmdb';

function TestTMDB() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPopularMovies();
        console.log(data);
        
        setMovies(data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes populares:', error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Filmes Populares</h2>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.release_date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestTMDB;
