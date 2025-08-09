
import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import {
  Box, Container, Typography, Chip, Button, Skeleton
} from '@mui/material';
import { useMovies } from '../hooks/useMovies';
import TrailerDialog from '../components/TrailerDialog';

const imgBackdrop = (p) => (p ? `https://image.tmdb.org/t/p/original/${p}` : '');
const getPosterImg   = (p) => (p ? `https://image.tmdb.org/t/p/w500/${p}` : '');

export default function MovieDetail() {
  const { id } = useParams();

  const { data: movie, loading, error } = useMovies({ type: 'details', movieId: id });

  const [openTrailer, setOpenTrailer] = useState(false);

  const trailerKey = useMemo(() => {
    const vids = movie?.videos?.results ?? [];
    const preferred =
      vids.find(v => v.site === 'YouTube' && v.type === 'Trailer') ||
      vids.find(v => v.site === 'YouTube');
    return preferred?.key || null;
  }, [movie]);

  if (error) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography color="error">Hubo un problema cargando la película.</Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: movie?.backdrop_path ? `url(${imgBackdrop(movie.backdrop_path)})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute', inset: 0,
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', py: { xs: 4, md: 8 } }}>
        
        <Box sx={{ position: 'absolute', top: { xs: 12, md: 24 }, right: { xs: 12, md: 24 }, zIndex: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOpenTrailer(true)}
            disabled={!trailerKey}
            sx={{ borderRadius: 2 }}
          >
            Ver trailer
          </Button>
        </Box>

       
        {loading ? (
          <Box sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center', gap: 4, minHeight: 500
          }}>
            <Skeleton variant="rectangular" width={360} height={500} sx={{ borderRadius: 2 }} />
            <Box sx={{ flex: '0 1 560px' }}>
              <Skeleton variant="text" height={60} />
              <Skeleton variant="text" height={24} width="60%" />
              <Skeleton variant="rectangular" height={180} sx={{ mt: 2, borderRadius: 2 }} />
            </Box>
          </Box>
        ) : movie ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',   
              alignItems: 'flex-start',
              gap: 4,                      
              minHeight: '70vh',
            }}
          >
           
            <Box sx={{ flex: '0 0 360px' }}>
              <Box
                component="img"
                src={getPosterImg(movie.poster_path)}
                alt={movie.title}
                sx={{
                  width: '360px',
                  height: 'auto',
                  maxHeight: '80vh',
                  borderRadius: 2,
                  boxShadow: 3,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>

            
            <Box sx={{ flex: '0 1 560px', color: 'common.white' }}>
              <Typography variant="h3" fontWeight={800}>
                {movie.title}{' '}
                {movie.release_date && (
                  <Typography component="span" variant="h4" color="grey.300">
                    ({new Date(movie.release_date).getFullYear()})
                  </Typography>
                )}
              </Typography>

              {movie.tagline && (
                <Typography variant="subtitle1" color="grey.300" sx={{ mt: 0.5 }}>
                  {movie.tagline}
                </Typography>
              )}

              <Typography
                variant="body1"
                color="grey.100"
                sx={{
                  mt: 2,
                  maxWidth: '80ch',
                  display: '-webkit-box',
                  WebkitLineClamp: 8,      
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {movie.overview || 'Sin descripción.'}
              </Typography>

              {movie.genres?.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {movie.genres.map(g => (
                    <Chip key={g.id} label={g.name} size="small" />
                  ))}
                </Box>
              )}

              <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2, color: 'grey.200' }}>
                {movie.runtime ? <span>Duración: {movie.runtime} min</span> : null}
                {movie.vote_average != null ? <span>TMDB: {movie.vote_average.toFixed(1)}/10</span> : null}
                {movie.release_date ? <span>Estreno: {movie.release_date}</span> : null}
              </Box>
            </Box>
          </Box>
        ) : null}
      </Container>

      <TrailerDialog open={openTrailer} onClose={() => setOpenTrailer(false)} videoKey={trailerKey} />
    </Box>
  );
}