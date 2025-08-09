import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function TrailerDialog({ open, onClose, videoKey }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
        aria-label="Cerrar"
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {videoKey ? (
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0
              }}
            />
          </div>
        ) : (
          <div style={{ padding: 24 }}>No hay trailer disponible.</div>
        )}
      </DialogContent>
    </Dialog>
  );
}