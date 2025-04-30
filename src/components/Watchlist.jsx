import ActionButtons from './ActionButtons';

export default function Watchlist({ media, onCardClick, onAdd, onRemove }) {
    
  return (
    <div className="row">
      {media.length > 0 ? (
        media.map((item) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            key={item.tmdbId}
          >
            <div className="card bg-dark text-light shadow h-100 d-flex flex-column">
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.imageUrl}`}
                alt={item.title}
                className="card-img-top"
                style={{ cursor: 'pointer' }}
                onClick={() => onCardClick(item)}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{item.title}</h5>
                <ActionButtons
                  media={item}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  status={item.status}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Sua lista está vazia.</p>
      )}
    </div>
  );
}
