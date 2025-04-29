import { useState, useEffect, useCallback } from 'react';
import tmdbService from '../services/tmdbService'
import { watchlistService } from '../services/watchlistService';
import * as ratingService from '../services/ratingService';
import { toast } from 'react-toastify';

export default function useMedia(user, token, type = 'movie') {
  const [media, setMedia] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [watchlistMap, setWatchlistMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // === FETCH GENRES ===
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = type === 'movie' 
        ? await tmdbService.getGenres(type)
        : await tmdbService.getSeriesGenres(type);
               
        setGenres(data);
      } catch (err) {
        toast.error('Erro ao carregar gêneros.');
        console.error(err);
      }
    };

    fetchGenres();
  }, [type]);

  // === FETCH MEDIA ===
  const fetchMedia = useCallback(async (pageToLoad = 1, genreId = selectedGenre) => {
    setLoading(true);
    try {
      const params = { page: pageToLoad };
      if (genreId) params.with_genres = genreId;

      const data = type === 'series'
        ? await tmdbService.getPopularSeriesWithParams(params)
        : await tmdbService.getPopularMoviesWithParams(params);

      setMedia(prev => pageToLoad === 1 ? data.results : [...prev, ...data.results]);
      setTotalPages(data.total_pages);
    } catch (err) {
      toast.error('Erro ao carregar conteúdo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [type, selectedGenre]);

  useEffect(() => {
    fetchMedia(page);
  }, [fetchMedia, page]);

  const loadMoreMedia = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  // === FETCH RATINGS ===
  useEffect(() => {
    if (!user || !token) return;
    ratingService.getRatingsByUser(user.id, token)
      .then(setRatings)
      .catch(err => toast.error(err.message));
  }, [user, token]);

  // === FETCH WATCHLIST ===
  useEffect(() => {
    if (!user || !token) return;

    const fetchWatchlist = async () => {
      try {
        const data = await watchlistService.getUserWatchlist(token);
        const map = data.reduce((acc, item) => {
          if (item.type === type) acc[item.tmdbId] = item.status;
          return acc;
        }, {});
        setWatchlistMap(map);
      } catch (err) {
        toast.error(`Erro ao carregar lista do usuário. ${err}`);
      }
    };

    fetchWatchlist();
  }, [user, token, type]);

  // === HANDLERS ===
  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSelectedGenre(value);
    setPage(1);
    fetchMedia(1, value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      setSearching(false);
      setPage(1);
      fetchMedia(1);
      return;
    }

    setLoading(true);
    setSearching(true);

    try {
      const results = type === 'movie'
        ? await tmdbService.searchMovies(query, 1)
        : await tmdbService.searchSeries(query, 1);

      setMedia(results);
      setTotalPages(1);
    } catch (err) {
      toast.error('Erro ao buscar conteúdo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async (item, status = 'watchlist') => {
    try {
      await watchlistService.addToWatchlist({
        token,
        tmdbId: item.id,
        type,
        title: item.title || item.name,
        imageUrl: item.poster_path,
        status,
      });

      setWatchlistMap(prev => ({ ...prev, [item.id]: status }));
      toast.success(`"${item.title || item.name}" ${status === 'watched' ? 'marcado como assistido' : 'adicionado à lista de desejos'}!`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRemoveFromWatchlist = async (item) => {
    try {
      await watchlistService.removeFromWatchlist({
        token,
        tmdbId: item.id,
        type,
      });

      setWatchlistMap(prev => {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      });

      toast.info(`"${item.title || item.name}" removido da lista.`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRateMedia = async (itemId, rating) => {
    if (!user || !token) {
      toast.error('Você precisa estar logado para avaliar.');
      return;
    }

    try {
      await ratingService.addOrUpdateRating({
        token,
        userId: user.id,
        tmdbId: itemId,
        type,
        rating,
        comment: '',
      });

      toast.success(`Você avaliou com ${rating} estrela${rating > 1 ? 's' : ''}!`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleComment = async (itemId, comment) => {
    if (!user || !token) {
      toast.error('Você precisa estar logado para comentar.');
      return;
    }

    const existing = ratings.find(r => r.tmdbId === itemId);
    const prevRating = existing?.rating || 0;

    try {
      const updated = await ratingService.addOrUpdateRating({
        token,
        userId: user.id,
        tmdbId: itemId,
        type,
        rating: prevRating,
        comment,
      });

      setRatings(rs => [...rs.filter(r => r.tmdbId !== itemId), updated]);
      toast.success('Comentário salvo!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    media,
    page,
    totalPages,
    loading,
    ratings,
    watchlistMap,
    handleAddToWatchlist,
    handleRemoveFromWatchlist,
    handleRateMedia,
    handleComment,
    setPage,
    loadMoreMedia,
    searchQuery,
    setSearchQuery,
    handleSearchSubmit,
    searching,
    genres,
    handleGenreChange,
    selectedGenre,
  };
}
