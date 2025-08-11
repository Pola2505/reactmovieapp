import Router from './routes/Router';

import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#393E46',
        color: 'white',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
        <CssBaseline />
        <Router />

    </Box>
    </FavoritesProvider>
    
  )
}

export default App;
