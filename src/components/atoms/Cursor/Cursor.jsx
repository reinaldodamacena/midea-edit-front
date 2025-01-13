import React from 'react';
import { Box } from '@mui/material';

const Cursor = ({ position, onMouseDown }) => (
  <Box
    sx={{
      position: 'absolute',
      left: `${position}px`,
      top: 0,
      bottom: 0,
      width: '2px',
      backgroundColor: 'primary.main',
      cursor: 'grab',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10, // Garante que o cursor fique acima de outros elementos
    }}
    onMouseDown={onMouseDown}
  >
    {/* Ponto circular do cursor */}
    <Box
      sx={{
        position: 'absolute',
        left: '-5px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: 'primary.main',
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
      }}
    />
    {/* Área clicável maior para melhor usabilidade */}
    <Box
      sx={{
        position: 'absolute',
        left: '-10px',
        top: 0,
        bottom: 0,
        width: '20px',
        cursor: 'grab',
      }}
    />
  </Box>
);

export default Cursor;
