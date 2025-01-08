import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const TimeRuler = React.memo(({ duration, zoom }) => {
  const theme = useTheme();
  const markerInterval = useMemo(() => Math.max(5 / zoom, 1), [zoom]);
  const markers = useMemo(
    () => Array.from({ length: Math.ceil(duration / markerInterval) }, (_, i) => i * markerInterval),
    [duration, markerInterval]
  );

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {markers.map((marker, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: `${(marker / duration) * 100}%`,
            textAlign: 'center',
          }}
        >
          <Typography variant="caption">{`${marker.toFixed(1)}s`}</Typography>
          <Box
            sx={{
              height: '20px',
              width: '1px',
              backgroundColor: theme.palette.divider,
            }}
          />
        </Box>
      ))}
    </Box>
  );
});

export default TimeRuler;
