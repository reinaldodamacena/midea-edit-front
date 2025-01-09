import React from 'react';
import { Box, Slider, Typography } from '@mui/material';
import IconButton from '../../atoms/IconButton/IconButton';
import Icon from '../../atoms/Icon/Icon';

const ToolBarActions = React.memo(({ onPlay, onPause, zoomLevel, onChangeZoom, isPlaying }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <IconButton onClick={onPlay} disabled={isPlaying}>
        <Icon name="PlayArrow" />
      </IconButton>
      <IconButton onClick={onPause} disabled={!isPlaying}>
        <Icon name="Pause" />
      </IconButton>
      <Typography variant="body2">Zoom:</Typography>
      <Slider
        value={zoomLevel}
        min={0}
        max={100}
        step={1}
        onChange={(e, value) => onChangeZoom(value)}
        sx={{ width: 200 }}
      />
      <Typography variant="body2">{`${zoomLevel}%`}</Typography>
    </Box>
  );
});

export default ToolBarActions;
