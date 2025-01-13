import React from 'react';
import { Box, Typography } from '@mui/material';

const Marker = ({ position, label }) => (
  <Box
    sx={{
      position: 'absolute',
      left: `${position}px`,
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Typography variant="caption" sx={{ fontSize: '10px', color: 'gray' }}>
      {label}
    </Typography>
    <Box
      sx={{
        width: '1px',
        height: '20px',
        backgroundColor: 'gray',
      }}
    />
  </Box>
);

export default Marker;
