
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'

import { Box } from '@mui/material'

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
        <NavBar/>
        <Footer />
    </Box>
    
  )
}

export default App;
