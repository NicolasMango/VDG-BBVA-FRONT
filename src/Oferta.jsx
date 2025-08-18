import { useEffect, useState } from 'react'
import { Box, Typography, Card, CardContent, Button } from '@mui/material'

export default function Oferta() {
  const [oferta, setOferta] = useState(null)
  const dni = sessionStorage.getItem('dni')

  useEffect(() => {
    if (dni) {
      fetch(`/api/oferta/${dni}`)
        .then(res => res.json())
        .then(data => setOferta(data))
        .catch(err => console.error(err))
    }
  }, [dni])

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" bgcolor="white" px={2} py={4} fontFamily="sans-serif" width="100vw" boxSizing="border-box">
      <Typography variant="h4" fontWeight={700} gutterBottom textAlign="center">
        Oferta para DNI: {dni}
      </Typography>
      {oferta ? (
        <Box width="100%" maxWidth="1200px">
          <Box display="flex" justifyContent="center" gap={4} mt={4} flexWrap="wrap">
            {oferta.ofertas_generadas.map((of, i) => (
              <Card
                key={i}
                variant="outlined"
                sx={{ width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {of.titulo}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {of.cuerpo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontStyle="italic">
                    Motivo: {of.motivo_interno}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Confianza: {of.score_confianza}/10
                  </Typography>
                </CardContent>
                <Box p={2}>
                  <Button variant="text" color="primary">
                    {of.cta}
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      ) : (
        <Typography>Cargando oferta...</Typography>
      )}
    </Box>
  )
}