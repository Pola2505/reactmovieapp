import { IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export default function FavoriteButton({ movie, size = "medium", colorActive = "error.main" }) {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const active = isFavorite(movie.id);

  return (
    <Tooltip title={active ? "Quitar de favoritos" : "Agregar a favoritos"}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation(); 
          toggleFavorite(movie);
        }}
        aria-label="favorito"
        size={size}
        sx={{
          color: active ? colorActive : "rgba(255,255,255,0.85)",
          "&:hover": { color: active ? "error.light" : "white" },
        }}
      >
        {active ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
}
