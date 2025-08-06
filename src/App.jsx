import Router from './routes/Router';

import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

function App() {
  return (
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
    
  )
}

export default App;
