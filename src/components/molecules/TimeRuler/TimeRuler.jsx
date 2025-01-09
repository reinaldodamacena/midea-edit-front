import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const TimeRuler = React.memo(({ duration = 0, zoom = 1, currentTime = 0, boxWidth = 600 }) => {
  const theme = useTheme();

  // Define o intervalo entre marcadores com base no zoom
  const markerInterval = useMemo(() => {
    if (zoom >= 3) return 0.1; // Milissegundos (100ms)
    if (zoom >= 2) return 1; // Segundos
    if (zoom >= 1) return 10; // A cada 10 segundos
    return 20; // A cada 20 segundos
  }, [zoom]);

  // Gera os marcadores baseados na duração total e no intervalo
  const markers = useMemo(() => {
    if (duration <= 0) return []; // Evita problemas com duração zero
    return Array.from(
      { length: Math.ceil(duration / markerInterval) + 1 },
      (_, i) => i * markerInterval
    );
  }, [duration, markerInterval]);

  // Calcula a posição do indicador de tempo atual
  const currentTimePosition = useMemo(() => {
    if (duration <= 0) return 0; // Evita divisão por zero
    return (currentTime / duration) * (boxWidth * zoom);
  }, [currentTime, duration, boxWidth, zoom]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: `${boxWidth * zoom}px`, // Largura proporcional ao zoom
        height: '60px',
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Renderização dos Marcadores de Tempo */}
      {markers.map((marker, index) => {
        const isMajorMarker = Math.round(marker * 10) % 10 === 0; // Marcadores principais são múltiplos de 10
        const left = `${(marker / duration) * (boxWidth * zoom)}px`; // Posição ajustada com base no zoom e duração

        return (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              left: left,
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
            }}
          >
            {/* Texto para Marcadores Principais */}
            {isMajorMarker && (
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 'bold',
                }}
              >
                {zoom >= 3
                  ? `${(marker * 1000).toFixed(0)}ms` // Exibe em milissegundos
                  : `${marker.toFixed(0)}s`} {/* Indicador de Tempo Atual */}
              </Typography>
            )}
            <Box
              sx={{
                height: isMajorMarker ? '50px' : '25px',
                width: '2px',
                backgroundColor: theme.palette.text.disabled,
              }}
            />
          </Box>
        );
      })}

      {/* Indicador de Tempo Atual */}
      {duration > 0 && (
        <Box
          sx={{
            position: 'absolute',
            left: `${currentTimePosition}px`,
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: theme.palette.primary.main,
            boxShadow: `0 0 4px ${theme.palette.primary.main}`,
          }}
        />
      )}
    </Box>
  );
});

export default TimeRuler;
