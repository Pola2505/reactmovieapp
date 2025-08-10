
import { Box, Container } from '@mui/material';
import { useMovies } from '../hooks/useMovies';
import HeroCarousel from '../components/HeroCarousel';
import MovieSection from '../components/MovieSection';

export default function Home() {
  const nowPlaying = useMovies({ type: 'now_playing', page: 1 });
  const popular    = useMovies({ type: 'popular', page: 1 });
  const topRated   = useMovies({ type: 'top_rated', page: 1 });

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <HeroCarousel data={nowPlaying.data} loading={nowPlaying.loading} />

      
      <Box
        sx={{
          display: 'flex',
          gap: 10,                 
          alignItems: 'stretch', 
          mt: 6,
          mx: {xs: '0', md: '2', lg: '10'}, 
          mb: 6, 
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <MovieSection
          title="Películas Populares"
          data={popular.data}
          loading={popular.loading}
          sx={{ flex: 1, width: {xs: '100%', md: '300px', lg: '200px'}}}      
        />
        <MovieSection
          title="Películas Mejor Puntadas"
          data={topRated.data}
          loading={topRated.loading}
          sx={{ flex: 1, width: {xs: '100%', md: '300px', lg: '200px'}}}    
        />
      </Box>
    </Container>
  );
}
