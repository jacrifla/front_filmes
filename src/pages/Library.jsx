import { useState, useEffect, useCallback } from 'react';
import Watchlist from '../components/Watchlist';
import WatchedMovies from '../components/WatchedMovies';
import MediaDetailModal from '../components/MediaDetailModal';
import { watchlistService } from '../services/watchlistService';
import { useAuth } from '../hooks/useAuth';

export default function Library() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('watchlist');
  const [watchlist, setWatchlist] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [selectedMediaType, setSelectedMediaType] = useState(null);

  const refreshLists = useCallback(async () => {
    try {
      const allMedia = await watchlistService.getUserMediaWatchlist(token);
      setWatchlist(allMedia.filter((item) => item.status === 'watchlist'));
      setWatchedList(allMedia.filter((item) => item.status === 'watched'));
    } catch (error) {
      console.error('Erro ao buscar dados da lista:', error.message);
    }
  }, [token]);

  useEffect(() => {
    if (token) refreshLists();
  }, [token, refreshLists]);

  const handleCardClick = (media) => {
    setSelectedMediaId(media.tmdbId);
    setSelectedMediaType(media.type);
    setShowModal(true);
  };

  const handleAdd = async (media, newStatus) => {
    try {
      await watchlistService.addToWatchlist({
        token,
        tmdbId: media.tmdbId,
        type: media.type,
        title: media.title,
        imageUrl: media.imageUrl,
        status: newStatus,
      });

      await refreshLists();
    } catch (err) {
      console.error('Erro ao adicionar:', err.message);
    }
  };

  const handleRemove = async (media) => {
    try {
      await watchlistService.removeFromWatchlist({
        token,
        tmdbId: media.tmdbId,
        type: media.type,
      });

      await refreshLists();
    } catch (err) {
      console.error('Erro ao remover:', err.message);
    }
  };

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'watchlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('watchlist')}
          >
            Quero assistir ({watchlist?.length || 0})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'watched' ? 'active' : ''}`}
            onClick={() => setActiveTab('watched')}
          >
            Assistidos ({watchedList.length || 0})
          </button>
        </li>
      </ul>

      {activeTab === 'watchlist' ? (
        <Watchlist
          media={watchlist}
          onCardClick={handleCardClick}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      ) : (
        <WatchedMovies media={watchedList} onCardClick={handleCardClick} />
      )}

      <MediaDetailModal
        mediaId={selectedMediaId}
        mediaType={selectedMediaType}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
}
