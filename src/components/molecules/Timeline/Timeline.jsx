// src/components/molecules/Timeline/Timeline.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import Chip from '../../atoms/Chip/Chip';
import Button from '../../atoms/Button/Button';

const Timeline = ({ cuts = [], onEdit, onWatch }) => {
  // Garantir que `cuts` seja pelo menos um array vazio
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {cuts.length > 0 ? (
        cuts.map((cut) => (
          <Box
            key={cut.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="body1">{cut.name}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button onClick={() => onWatch(cut.id)}>Assistir</Button>
              <Button onClick={() => onEdit(cut.id)} variant="outlined">
                Editar
              </Button>
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          Nenhum corte disponível.
        </Typography>
      )}
    </Box>
  );
};

export default Timeline;
