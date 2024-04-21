// En FullWidthTextField.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField({ onSubmit }:any) {
  const [texto, setTexto] = useState('');

  const handleChange = (event:any) => {
    setTexto(event.target.value);
  };

  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      onSubmit(texto);
    }
  };

  return (
    <Box
      sx={{
        width: 700,
        maxWidth: '100%',
        marginLeft: '20px',
        '& .MuiTextField-root': { m: 1, width: '700' },
      }}
    >
      <TextField
        fullWidth
        multiline
        label="Tu Review"
        id="fullWidth"
        value={texto}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </Box>
  );
}
