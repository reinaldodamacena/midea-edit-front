// src/components/organisms/MediaControlPanel/MediaControlPanel.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import VideoControlBar from '../../molecules/VideoControlBar/VideoControlBar';

const MediaControlPanel = ({ currentTime, duration, onPlayPause, onStop }) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Controles de Reprodução
      </Typography>
      <VideoControlBar
        currentTime={currentTime}
        duration={duration}
        onPlayPause={onPlayPause}
        onStop={onStop}
      />
    </Box>
  );
};

export default MediaControlPanel;
