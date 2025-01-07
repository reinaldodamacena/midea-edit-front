// src/components/molecules/VideoControlBar/VideoControlBar.jsx
import React from 'react';
import { Box } from '@mui/material';
import Slider from '../../atoms/Slider/Slider';
import ButtonGroup from '../../atoms/ButtonGroup/ButtonGroup';
import Button from '../../atoms/Button/Button';

const VideoControlBar = ({ onPlayPause, onStop, currentTime, duration }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <ButtonGroup>
        <Button onClick={onPlayPause}>Play/Pause</Button>
        <Button onClick={onStop}>Stop</Button>
      </ButtonGroup>
      <Slider value={currentTime} min={0} max={duration} />
      <Box>
        <span>
          {currentTime}s / {duration}s
        </span>
      </Box>
    </Box>
  );
};

export default VideoControlBar;
