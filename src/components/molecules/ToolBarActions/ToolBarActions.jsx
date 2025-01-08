import React from 'react';
import { Box, Slider, Typography } from '@mui/material';
import IconButton from '../../atoms/IconButton/IconButton';
import Icon from '../../atoms/Icon/Icon';

const ToolBarActions = React.memo(({
  onPlay,
  onPause,
  onCut,
  onZoomIn,
  onZoomOut,
  zoomLevel,
  onChangeZoom,
  isPlaying = false,
  isCutEnabled = true,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        padding: 2,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* Controles de Reprodução */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={onPlay}
          aria-label="Play Video"
          disabled={isPlaying}
          sx={{ color: isPlaying ? 'action.disabled' : 'primary.main' }}
        >
          <Icon name="PlayArrow" />
        </IconButton>
        <IconButton
          onClick={onPause}
          aria-label="Pause Video"
          disabled={!isPlaying}
          sx={{ color: !isPlaying ? 'action.disabled' : 'primary.main' }}
        >
          <Icon name="Pause" />
        </IconButton>
        <IconButton
          onClick={onCut}
          aria-label="Cut Video"
          disabled={!isCutEnabled}
          sx={{
            color: isCutEnabled ? 'error.main' : 'action.disabled',
          }}
        >
          <Icon name="ContentCut" />
        </IconButton>
      </Box>

      {/* Controle de Zoom */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2">Zoom:</Typography>
        <IconButton
          onClick={onZoomOut}
          aria-label="Zoom Out"
          disabled={zoomLevel <= 0.5}
        >
          <Icon name="ZoomOut" />
        </IconButton>
        <Slider
          value={zoomLevel}
          min={0.5}
          max={5}
          step={0.1}
          onChange={(e, value) => onChangeZoom(value)}
          sx={{ width: '150px' }}
        />
        <IconButton
          onClick={onZoomIn}
          aria-label="Zoom In"
          disabled={zoomLevel >= 5}
        >
          <Icon name="ZoomIn" />
        </IconButton>
        <Typography variant="body2">{`${zoomLevel.toFixed(1)}x`}</Typography>
      </Box>
    </Box>
  );
});

export default ToolBarActions;
