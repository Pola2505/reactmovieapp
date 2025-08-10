import {
  ListItem, ListItemAvatar, Avatar, ListItemText,
  ListItemButton, IconButton, Tooltip
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router';

const imgThumb = (p) => (p ? `https://image.tmdb.org/t/p/w92/${p}` : undefined);

export default function MovieListItem({ movie }) {
  const navigate = useNavigate();
  if (!movie) return null;

  const handleOpenDetail = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <Tooltip title="Ver detalles">
          <IconButton
            edge="end"
            onClick={handleOpenDetail}
            aria-label="ver detalles"
            sx={{ color: '#40C1AD' }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
      }
      sx={{
        py: 0.5,
        '&.MuiListItem-divider': {
          borderBottomColor: '#393E46', 
        }
      }}
    >

      <ListItemButton onClick={handleOpenDetail} sx={{ py: 0.5 }}>
        <ListItemAvatar>
          <Avatar
            variant="rounded"
            src={imgThumb(movie.poster_path || movie.backdrop_path)}
            alt={movie.title}
            sx={{ width: 40, height: 56, mr: 1, borderRadius: '5px' }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={movie.title}
        />
      </ListItemButton>
    </ListItem>
  );
}
