import { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import {
  Box, Container, Typography, Chip, Button, Skeleton
} from '@mui/material';
import { useMovies } from '../hooks/useMovies';
import TrailerDialog from '../components/TrailerDialog';

const imgBackdrop = (p) => (p ? `https://image.tmdb.org/t/p/original/${p}` : '');
const getPosterImg = (p) => (p ? `https://image.tmdb.org/t/p/w500/${p}` : '');

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
          background: {
            xs: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.3) 100%)',
            md: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.35) 100%)',
          },
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', py: { xs: 3, md: 8 } }}>
       
        <Box
          sx={{
            position: { xs: 'static', md: 'absolute' },
            top: { md: 24 },
            right: { md: 24 },
            zIndex: 2,
            display: 'flex',
            justifyContent: { xs: 'flex-end', md: 'flex-start' },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Button
            variant="contained"
            onClick={() => setOpenTrailer(true)}
            disabled={!trailerKey}
            sx={{ borderRadius: 2, backgroundColor: '#40C1AD', '&:hover': { backgroundColor: '#36a492' }}}
          >
            Ver trailer
          </Button>
        </Box>

      
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'center' },
              justifyContent: 'center',
              gap: { xs: 2, md: 4 },
              minHeight: { xs: 400, md: 500 },
            }}
          >
            <Skeleton
              variant="rectangular"
              width={{ xs: 260, sm: 300, md: 360 }}
              height={{ xs: 380, md: 500 }}
              sx={{ borderRadius: 2 }}
            />
            <Box sx={{ width: { xs: '100%', md: 560 }, maxWidth: 600 }}>
              <Skeleton variant="text" height={48} />
              <Skeleton variant="text" height={24} width="60%" />
              <Skeleton variant="rectangular" height={160} sx={{ mt: 2, borderRadius: 2 }} />
            </Box>
          </Box>
        ) : movie ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' }, 
              alignItems: { xs: 'center', md: 'flex-start' },
              justifyContent: 'center',
              gap: { xs: 2, sm: 3, md: 4 },
              minHeight: { md: '70vh' },
            }}
          >
         
            <Box sx={{ flex: { md: '0 0 auto' } }}>
              <Box
                component="img"
                src={getPosterImg(movie.poster_path)}
                alt={movie.title}
                sx={{
                  width: { xs: 260, sm: 300, md: 360 },
                  height: 'auto',
                  maxHeight: { md: '80vh' },
                  borderRadius: 2,
                  boxShadow: 3,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>

           
            <Box
              sx={{
                flex: { md: '0 1 560px' },
                color: 'common.white',
                textAlign: { xs: 'center', md: 'left' },
                px: { xs: 1, md: 0 },
              }}
            >
              <Typography
                variant="h3"
                fontWeight={800}
                sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' } }}
              >
                {movie.title}{' '}
                {movie.release_date && (
                  <Typography
                    component="span"
                    variant="h4"
                    color="grey.300"
                    sx={{ fontSize: { xs: '1.25rem', md: '2rem' } }}
                  >
                    ({new Date(movie.release_date).getFullYear()})
                  </Typography>
                )}
              </Typography>

              {movie.tagline && (
                <Typography
                  variant="subtitle1"
                  color="grey.300"
                  sx={{ mt: 0.5, fontSize: { xs: '0.95rem', md: '1rem' } }}
                >
                  {movie.tagline}
                </Typography>
              )}

              <Typography
                variant="body1"
                color="grey.100"
                sx={{
                  mt: 2,
                  maxWidth: { md: '80ch' },
                  display: '-webkit-box',
                  WebkitLineClamp: { xs: 6, md: 8 },
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                {movie.overview || 'Sin descripción.'}
              </Typography>

              {movie.genres?.length > 0 && (
                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                  }}
                >
                  {movie.genres.map(g => (
                    <Chip key={g.id} label={g.name} size="small" />
                  ))}
                </Box>
              )}

              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  color: 'grey.200',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
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
