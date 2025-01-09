import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Timeline from '../../molecules/Timeline/Timeline';
import ToolBarActions from '../../molecules/ToolBarActions/ToolBarActions';

const TimelinePanel = ({ videos, onPlay, onPause, onMoveClip }) => {
  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Tempo atual
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Toolbar */}
      <ToolBarActions
        onPlay={() => {
          setIsPlaying(true);
          onPlay();
        }}
        onPause={() => {
          setIsPlaying(false);
          onPause();
        }}
        zoomLevel={zoom}
        onZoomIn={() => setZoom((prev) => Math.min(prev + 0.5, 5))}
        onZoomOut={() => setZoom((prev) => Math.max(prev - 0.5, 0.5))}
        onChangeZoom={setZoom}
        isPlaying={isPlaying}
      />

      {/* Timeline */}
      <Timeline
        videos={videos}
        zoom={zoom}
        currentTime={currentTime}
        onMoveClip={onMoveClip}
      />
    </Box>
  );
};

export default TimelinePanel;
