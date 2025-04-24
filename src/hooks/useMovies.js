import { useState, useEffect } from 'react';
import tmdbService from '../services/tmdbService';
import { watchlistService } from '../services/watchlistService';
import * as ratingService from '../services/ratingService';
import { toast } from 'react-toastify';

const useMovies = (user, token) => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState([]);
    const [watchlistMap, setWatchlistMap] = useState({});

    const loadMoreMovies = async () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    }

    // Fetch TMDB
    useEffect(() => {
        const prevScrollY = window.scrollY;

        setLoading(true);
        tmdbService
            .getPopularMovies(page)
            .then((data) => {
                setMovies((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
                setTotalPages(data.total_pages);
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setLoading(false)

                if (page > 1) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: prevScrollY,
                            behavior: 'auto'
                        });
                    }, 0);
                }
            });
    }, [page]);

    // Fetch Ratings
    useEffect(() => {
        if (!user || !token) return;
        ratingService
            .getRatingsByUser(user.id, token)
            .then((res) => setRatings(res))
            .catch((err) => toast.error(err.message));
    }, [user, token]);

    useEffect(() => {
        if (!user || !token) return;

        const fetchWatchlist = async () => {
            try {
                const data = await watchlistService.getUserWatchlist(token);
                const map = {};
                data.forEach((item) => {
                    map[item.tmdbId] = item.status;
                });
                setWatchlistMap(map);
            } catch (err) {
                toast.error(`Erro ao carregar lista do usuário. ${err}`);
            }
        };

        fetchWatchlist();
    }, [user, token]);

    // Handlers integrados com watchlistService
    const handleAddToWatchlist = async (movie, status = 'watchlist') => {
        try {
            await watchlistService.addToWatchlist({
                token,
                tmdbId: movie.id,
                type: 'movie',
                title: movie.title,
                imageUrl: movie.poster_path,
                status,
            });

            setWatchlistMap((prev) => ({
                ...prev,
                [movie.id]: status,
            }));

            const actionText = status === 'watched' ? 'marcado como assistido' : 'adicionado à sua lista de desejo';
            toast.success(`"${movie.title}" foi ${actionText}!`);
        } catch (err) {
            toast.error(err.message);
        }
    };


    const handleRemoveFromWatchlist = async (movie) => {
        try {
            await watchlistService.removeFromWatchlist({
                token,
                tmdbId: movie.id,
                type: 'movie',
            });

            setWatchlistMap(prev => {
                const next = { ...prev };
                delete next[movie.id];
                return next;
            });

            toast.info(`"${movie.title}" removido da sua lista.`);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleRateMovie = async (movieId, rating) => {
        if (!user || !token)
            return toast.error('Você precisa estar logado para avaliar.');
        try {
            await ratingService.addOrUpdateRating({
                token,
                userId: user.id,
                tmdbId: movieId,
                type: 'movie',
                rating,
                comment: '',
            });
            toast.success(
                `Você avaliou com ${rating} estrela${rating > 1 ? 's' : ''}!`
            );
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleComment = async (movieId, comment) => {
        if (!user || !token)
            return toast.error('Você precisa estar logado para comentar.');

        // recupera nota anterior (ou 0)
        const existing = ratings.find((r) => r.tmdbId === movieId);
        const prevRating = existing?.rating || 0;

        try {
            const updated = await ratingService.addOrUpdateRating({
                token,
                userId: user.id,
                tmdbId: movieId,
                type: 'movie',
                rating: prevRating,
                comment,
            });

            toast.success('Comentário salvo!');
            // atualiza localmente o estado para re-renderizar
            setRatings((rs) => {
                const others = rs.filter((r) => r.tmdbId !== movieId);
                return [...others, updated];
            });
        } catch (err) {
            toast.error(err.message);
        }
    };

    return {
        movies,
        page,
        totalPages,
        loading,
        ratings,
        watchlistMap,
        handleAddToWatchlist,
        handleRemoveFromWatchlist,
        handleRateMovie,
        handleComment,
        setPage,
        loadMoreMovies,
    };
};

export default useMovies;
