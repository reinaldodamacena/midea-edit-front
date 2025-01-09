// src/components/organisms/TimelinePanel/TimelinePanel.jsx
import React from 'react';
import { Box, useTheme } from '@mui/material';
import ToolBarActions from '../../molecules/ToolBarActions/ToolBarActions';
import DraggableTimeline from '../../molecules/DraggableTimeline/DraggableTimeline';

const TimelinePanel = ({
  videos,
  cuts,
  currentTime,
  zoom,
  isPlaying,
  onPlay,
  onPause,
  onChangeZoom,
  onUpdateTime,
  onReorder, // Nova prop para reorder
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <ToolBarActions
        onPlay={onPlay}
        onPause={onPause}
        isPlaying={isPlaying}
        zoomLevel={zoom}
        onChangeZoom={onChangeZoom}
      />

      <DraggableTimeline
        videos={videos}
        currentTime={currentTime}
        zoom={zoom}
        onScrub={onUpdateTime}
        onReorder={onReorder}
      />
    </Box>
  );
};

export default TimelinePanel;
