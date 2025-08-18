import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  Stack,
} from '@mui/material'

export default function Login() {
  const [dni, setDni] = useState('')
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    sessionStorage.setItem('dni', dni)
    navigate('/oferta')
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" width="100vw" bgcolor="white" fontFamily="sans-serif">
      <Box maxWidth={400} width="100%" px={2}>
        <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
          ¡Hola! Te damos la bienvenida a Banca Online
        </Typography>
        <Stack spacing={2} mt={4}>
          <FormControl fullWidth>
            <InputLabel id="tipo-doc-label">Tipo de documento</InputLabel>
            <Select labelId="tipo-doc-label" label="Tipo de documento" value="DNI" disabled>
              <MenuItem value="DNI">DNI</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Número de documento" variant="outlined" fullWidth value={dni} onChange={(e) => setDni(e.target.value)} />
          <TextField label="Usuario" variant="outlined" fullWidth value={usuario} onChange={(e) => setUsuario(e.target.value)} />
          <TextField label="Clave Digital" variant="outlined" type="password" fullWidth value={clave} onChange={(e) => setClave(e.target.value)} />
          <FormControlLabel control={<Checkbox />} label="Recordar mi documento y usuario" />
          <Link href="#" color="primary" underline="hover">
            🧮 Teclado virtual
          </Link>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin} disabled={!dni || !usuario || !clave}>
            Ingresar
          </Button>
          <Link href="#" color="primary" underline="hover" textAlign="center">
            ¿Olvidaste o bloqueaste tu Usuario y/o Clave Digital?
          </Link>
          <Typography variant="body2" textAlign="center">
            Si es la primera vez que ingresás a Banca Online,{' '}
            <Link href="#" color="primary" underline="hover">
              registrate
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}