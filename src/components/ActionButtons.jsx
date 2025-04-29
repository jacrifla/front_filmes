import React from 'react';

const ActionButtons = ({ media, onAdd, onRemove, status }) => {  
  return (
    <div className="d-flex justify-content-between my-2 gap-2">
      <button
        className={`btn btn-sm ${status === 'watched' ? 'btn-secondary' : 'btn-success'}`}
        onClick={() => onAdd(media, 'watched')}
        disabled={status === 'watched'}
      >
        Assistido
      </button>

      <button
        className={`btn btn-sm ${status === 'watchlist' ? 'btn-secondary' : 'btn-warning'}`}
        onClick={() => onAdd(media, 'watchlist')}
        disabled={status === 'watchlist'}
      >
        Quero ver
      </button>

      <button
        className="btn btn-sm btn-danger"
        onClick={() => onRemove(media)}
      >
        Remover
      </button>
    </div>
  );
};

export default ActionButtons;
