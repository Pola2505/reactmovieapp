import { Box, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#222831',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
      }}
    >
      <Typography variant="body2">
        © 2025 MovieApp. Todos los derechos reservados.
      </Typography>
    </Box>
  )
}
