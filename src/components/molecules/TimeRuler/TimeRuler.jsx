import React, { useRef, useState, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import throttle from 'lodash/throttle';

const TimeRuler = React.memo(({
  duration = 0,
  zoom = 50,
  currentTime = 0,
  boxWidth = 600,
  onScrub,
}) => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const rulerRef = useRef(null);

  const throttledScrub = useRef(
    throttle((time) => {
      onScrub?.(time);
    }, 80)
  ).current;

  const markerInterval = useMemo(() => {
    if (zoom >= 75) return 0.5;
    if (zoom >= 50) return 1;
    if (zoom >= 25) return 5;
    return 10;
  }, [zoom]);

  const markers = useMemo(() => {
    if (duration <= 0) return [];
    const num = Math.ceil(duration / markerInterval);
    return Array.from({ length: num + 1 }, (_, i) => i * markerInterval);
  }, [duration, markerInterval]);

  const minorTickInterval = markerInterval / 10;
  const minorTicks = useMemo(() => {
    if (duration <= 0 || minorTickInterval <= 0) return [];
    const numTicks = Math.ceil(duration / minorTickInterval);
    return Array.from({ length: numTicks + 1 }, (_, i) => i * minorTickInterval);
  }, [duration, minorTickInterval]);

  const calcTimeFromX = (clientX) => {
    if (!rulerRef.current || duration <= 0) return 0;
    const rect = rulerRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(relativeX, boxWidth));
    return (clampedX / boxWidth) * duration;
  };

  const currentTimePosition = useMemo(() => {
    if (isDragging) return dragX;
    if (duration > 0) {
      return (currentTime / duration) * boxWidth;
    }
    return 0;
  }, [isDragging, dragX, currentTime, duration, boxWidth]);

  const handleClick = (e) => {
    if (!onScrub) return;
    const newTime = calcTimeFromX(e.clientX);
    onScrub(newTime);
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragX(e.clientX - rulerRef.current.getBoundingClientRect().left);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - rulerRef.current.getBoundingClientRect().left;
    setDragX(newX);
    throttledScrub(calcTimeFromX(e.clientX));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Box
      ref={rulerRef}
      sx={{
        position: 'relative',
        width: `${boxWidth}px`,
        height: '50px',
        // Gradiente sutil
        background: `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        boxShadow: theme.shadows[2],
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Minor ticks */}
      {minorTicks.map((tick) => {
        const left = (tick / duration) * boxWidth;
        return (
          <Box
            key={`minor-${tick}`}
            sx={{
              position: 'absolute',
              left: `${left}px`,
              height: '8px',
              width: '1px',
              bottom: 10,
              backgroundColor: theme.palette.divider,
              transform: 'translateX(-50%)',
            }}
          />
        );
      })}

      {/* Major markers */}
      {markers.map((marker) => {
        const left = (marker / duration) * boxWidth;
        return (
          <Box
            key={`major-${marker}`}
            sx={{
              position: 'absolute',
              left: `${left}px`,
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {marker % 1 === 0 ? `${marker}s` : `${(marker * 1000).toFixed(0)}ms`}
            </Typography>
            <Box
              sx={{
                width: '1px',
                height: '20px',
                backgroundColor: theme.palette.text.secondary,
              }}
            />
          </Box>
        );
      })}

      {/* Indicador (Playhead) */}
      <Box
        sx={{
          position: 'absolute',
          left: `${currentTimePosition}px`,
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: theme.palette.primary.main,
          cursor: 'grab',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Bolinha/Handle */}
        <Box
          sx={{
            position: 'absolute',
            left: '-5px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
          }}
        />
      </Box>
    </Box>
  );
});

export default TimeRuler;
