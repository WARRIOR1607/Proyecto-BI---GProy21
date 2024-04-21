import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {theme} from './appbar'; // Importa el tema desde appbar.js
import { ThemeProvider } from '@mui/material/styles';
import { BasicButtonProps } from '../../interfaces';

export default function BasicButtons({buttonText,enviarSolicitud}:BasicButtonProps) {
  const handleClick = () => {
    // Capturar el texto del campo de texto y enviarlo al backend
    const texto = document.getElementById('fullWidth')?.textContent || '';
    enviarSolicitud(texto);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ marginLeft: '25px', maxWidth: '100%', width: 100 }}>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={handleClick}>{buttonText}</Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
