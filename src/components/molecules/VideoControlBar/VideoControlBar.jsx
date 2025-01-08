import React from 'react';
import { Box, Typography } from '@mui/material';
import Slider from '../../atoms/Slider/Slider';
import ButtonGroup from '../../atoms/ButtonGroup/ButtonGroup';
import Button from '../../atoms/Button/Button';

const VideoControlBar = ({ onPlayPause, onStop, currentTime = 0, duration = 100 }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
      <ButtonGroup>
        <Button onClick={onPlayPause}>Play/Pause</Button>
        <Button onClick={onStop}>Stop</Button>
      </ButtonGroup>
      <Slider
        value={currentTime}
        min={0}
        max={duration}
        aria-label="Controle de tempo do vídeo"
        aria-valuenow={currentTime}
      />
      <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
        {currentTime}s / {duration}s
      </Typography>
    </Box>
  );
};

export default VideoControlBar;
