
import { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router';
import {
  Box, Container, Grid, Card, CardActionArea, CardMedia,
  CardContent, Typography, Button, Skeleton, Pagination
} from '@mui/material';
import { useMovies } from '../hooks/useMovies';

const CARD_W = 220;
const CARD_H = 320;

const getPosterImg = (p) => (p ? `https://image.tmdb.org/t/p/w500/${p}` : '');
const truncateTitle = (str, n = 20) => (str?.length > n ? str.slice(0, n) + '…' : str);

export default function NewMovies() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useMovies({ type: 'now_playing', page });

  const items = data?.results ?? [];
  const totalPages = useMemo(() => Math.min(data?.total_pages ?? 1, 500), [data]);

  const handlePageChange = (_e, value) => setPage(value);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 6, mt: 2, textAlign: 'center', letterSpacing: '1px' }}>
        Últimos  lanzamientos
      </Typography>

      {error && (
        <Box sx={{ mb: 2, color: 'error.main', textAlign: 'center' }}>
          Un error ocurrió al cargar las películas.
        </Box>
      )}

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="stretch"
      >
        {(loading ? Array.from({ length: 12 }) : items).map((m, i) => (
          <Grid key={m?.id ?? i} item xs="auto">
            <Card
              sx={{
                width: CARD_W,
                height: CARD_H,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#222831'
              }}
            >
              {loading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    height={220}
                    sx={{ borderRadius: '8px 8px 0 0' }}
                  />
                  <Skeleton variant="text" sx={{ mx: 2, mt: 1 }} />
                  <Box sx={{ mt: 'auto', p: 1.5, pt: 0 }}>
                    <Skeleton variant="rectangular" height={32} sx={{ borderRadius: 2 }} />
                  </Box>
                </>
              ) : (
                <>
                  <CardActionArea component={RouterLink} to={`/movie/${m.id}`}>
                    <CardMedia
                      component="img"
                      image={getPosterImg(m.poster_path || m.backdrop_path)}
                      alt={m.title}
                      height="220"
                      loading="lazy"
                      sx={{ objectFit: 'cover' }}
                    />
                  </CardActionArea>

                  <CardContent sx={{ pt: 1.25, pb: 0, px: 2, bgcolor: '#222831' }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      title={m.title}
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'center',
                        minHeight: 24,
                        color: 'white'
                      }}
                    >
                      {truncateTitle(m.title, 20)}
                    </Typography>
                  </CardContent>

                  <Box sx={{ mt: 'auto', p: 1.5, pt: 0, display: 'flex', justifyContent: 'center', bgcolor: '#222831' }}>
                    <Button
                      size="small"
                      variant="contained"
                      component={RouterLink}
                      to={`/movie/${m.id}`}
                      sx={{ borderRadius: 2, backgroundColor: '#40C1AD' }}
                    >
                      Ver detalles
                    </Button>
                  </Box>
                </>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="#40C1AD"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'white',
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: '#40C1AD',
              color: 'white',
              '&:hover': {
                backgroundColor: '#36a492',
              },
            },
          }}
        />
      </Box>
    </Container>
  );
}
