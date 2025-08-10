
import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useMovies } from "../hooks/useMovies";

const CARD_W = 220;
const CARD_H = 360;

const getPosterImg = (p) =>
  p ? `https://image.tmdb.org/t/p/w500/${p}` : "";
const truncateTitle = (str, n = 20) =>
  str?.length > n ? str.slice(0, n) + "…" : str;

export default function SearchMovies() {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");   
  const [query, setQuery] = useState("");   

 
  const { data, loading, error } = useMovies({
    type: query ? "search" : null,
    query,
    page,
  });

  const items = data?.results ?? [];
  const totalPages = useMemo(
    () => Math.min(data?.total_pages ?? 0, 500),
    [data]
  );

  
  useEffect(() => {
    setPage(1);
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(input.trim());
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{ mb: 3, textAlign: "center" }}
      >
        Buscar películas
      </Typography>

    
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
          gap: 1,
        }}
      >
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe el nombre de la película…"
          size="medium"
          sx={{ width: { xs: "100%", sm: 520 } }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={onSubmit}
          sx={{ display: { xs: "none", sm: "inline-flex" }, borderRadius: 2 }}
        >
          Buscar
        </Button>
      </Box>

     
      {!query && (
        <Typography sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}>
          Escribe algo y presiona <strong>Enter</strong> para buscar.
        </Typography>
      )}
      {error && (
        <Box sx={{ mb: 2, color: "error.main", textAlign: "center" }}>
          Ocurrió un error al buscar.
        </Box>
      )}

     
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {loading && query
          ? Array.from({ length: 12 }).map((_, i) => (
              <Grid key={i} item xs="auto">
                <Card
                  sx={{
                    width: CARD_W,
                    height: CARD_H,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    height={220}
                    sx={{ borderRadius: "8px 8px 0 0" }}
                  />
                  <Skeleton variant="text" sx={{ mx: 2, mt: 1 }} />
                  <Box sx={{ mt: "auto", p: 1.5, pt: 0 }}>
                    <Skeleton
                      variant="rectangular"
                      height={32}
                      sx={{ borderRadius: 2 }}
                    />
                  </Box>
                </Card>
              </Grid>
            ))
          : items.map((m) => (
              <Grid key={m.id} item xs="auto">
                <Card
                  sx={{
                    width: CARD_W,
                    height: CARD_H,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardActionArea component={RouterLink} to={`/movie/${m.id}`}>
                    <CardMedia
                      component="img"
                      image={getPosterImg(m.poster_path || m.backdrop_path)}
                      alt={m.title}
                      height="220"
                      loading="lazy"
                      sx={{ objectFit: "cover" }}
                    />
                  </CardActionArea>

                  <CardContent sx={{ pt: 1.25, pb: 0, px: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      title={m.title}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                        minHeight: 24,
                      }}
                    >
                      {truncateTitle(m.title, 20)}
                    </Typography>
                  </CardContent>

                  <Box
                    sx={{
                      mt: "auto",
                      p: 1.5,
                      pt: 0,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      component={RouterLink}
                      to={`/movie/${m.id}`}
                      sx={{ borderRadius: 2 }}
                    >
                      Ver detalles
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
      </Grid>

      
      {query && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_e, v) => setPage(v)}
            color="primary"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      )}

    
      {query && !loading && items.length === 0 && (
        <Typography sx={{ textAlign: "center", color: "text.secondary", mt: 4 }}>
          No se encontraron resultados para “{query}”.
        </Typography>
      )}
    </Container>
  );
}
