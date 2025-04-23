import { useState } from 'react';
import WatchedMovies from '../components/WatchedMovies';
import Watchlist from '../components/Watchlist';

export default function Library() {
  const [activeTab, setActiveTab] = useState('watched');

  return (
    <div className="container mt-4">
      <h2>Minha Biblioteca</h2>

      <ul className="nav nav-tabs mt-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'watched' ? 'active' : ''}`}
            onClick={() => setActiveTab('watched')}
          >
            Assistidos
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'watchlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('watchlist')}
          >
            Quero Assistir
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3">
        {activeTab === 'watched' && <WatchedMovies />}
        {activeTab === 'watchlist' && <Watchlist />}
      </div>
    </div>
  );
}
