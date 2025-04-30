export default function WatchedMovies({ media, onCardClick }) {
  return (
    <div className="row">
      {media.length > 0 ? (
        media.map((item) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            key={item.tmdbId}
          >
            <div className="card bg-secondary text-light shadow h-100 d-flex flex-column">
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.imageUrl}`}
                alt={item.title}
                className="card-img-top"
                style={{ cursor: 'pointer' }}
                onClick={() => onCardClick(item)}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Você não tem filmes assistidos ainda.</p>
      )}
    </div>
  );
}
