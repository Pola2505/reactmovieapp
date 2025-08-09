
import { Paper, Typography, List, Skeleton } from '@mui/material';
import MovieListItem from './MovieListItem';

export default function MovieSection({ title, data, loading, sx }) {
  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 2, width: 1, height: '100%', ...sx }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        <List dense>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={56} sx={{ mb: 1, borderRadius: 1 }} />
          ))}
        </List>
      </Paper>
    );
  }

  const items = data?.results ?? [];
  return (
    <Paper elevation={2} sx={{ p: 2, width: 1, height: '100%', display: 'flex', flexDirection: 'column', ...sx }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
      <List
        dense
        disablePadding
        sx={{ flex: 1, overflowY: 'auto', scrollbarGutter: 'stable both-edges', pr: 1 }}
      >
        {items.slice(0, 12).map((m) => (
          <MovieListItem key={m.id} movie={m} />
        ))}
      </List>
    </Paper>
  );
}
