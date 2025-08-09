import { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const useMovies = ({ type, query = '', movieId = '', page = 1 }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!type) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                let url = '';
                switch (type) {
                    case 'popular':
                        url = `${BASE_URL}/movie/popular?api_key=${apiKey}&language=es-ES&region=AR&page=${page}`;
                        break;
                    case 'now_playing':
                        url = `${BASE_URL}/movie/now_playing?api_key=${apiKey}&language=es-ES&page=${page}`;
                        break;
                    case 'search':
                        if (!query) return;
                        url = `${BASE_URL}/search/movie?api_key=${apiKey}&language=es-ES&query=${encodeURIComponent(query)}&page=${page}`;
                        break;
                    case 'top_rated':
                        url = `${BASE_URL}/movie/top_rated?api_key=${apiKey}&language=es-ES&page=${page}`;
                        break;
                    case 'details':
                        if (!movieId) return;
                        url = `${BASE_URL}/movie/${movieId}?api_key=${apiKey}&language=es-ES&append_to_response=videos`;
                        break;

                }

                const res = await axios.get(url);
                setData(res.data);
            } catch (err) {
                setError(err.message || 'Error fetching movies');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, query, movieId, page]);

    return { data, loading, error };
};


// Popular movies

// https://api.themoviedb.org/3/movie/popular

// Ultimos lanzamientos

// https://api.themoviedb.org/3/movie/now_playing

// Buscar peli

// https://api.themoviedb.org/3/search/movie

// Movie details

// https://api.themoviedb.org/3/movie/{movie_id}