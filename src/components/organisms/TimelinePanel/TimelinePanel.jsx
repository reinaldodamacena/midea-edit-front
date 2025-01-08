import React, { useState, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import Timeline from '../../molecules/Timeline/Timeline';
import TimeRuler from '../../molecules/TimeRuler/TimeRuler';
import ToolBarActions from '../../molecules/ToolBarActions/ToolBarActions';

const TimelinePanel = ({ videos = [], onPlay, onPause, onMoveClip, onResizeClip, onCutClip }) => {
  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const theme = useTheme();

  const totalDuration = useMemo(
    () => videos.reduce((sum, video) => sum + video.duration, 0),
    [videos]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vx',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
      }}
    >
      {/* Toolbar horizontal */}
      <Box
        sx={{
          height: '60px',
          padding: 1,
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[1],
        }}
      >
        <ToolBarActions
          onPlay={() => {
            setIsPlaying(true);
            onPlay();
          }}
          onPause={() => {
            setIsPlaying(false);
            onPause();
          }}
          onCut={onCutClip}
          onZoomIn={() => setZoom((prev) => Math.min(prev + 0.5, 5))}
          onZoomOut={() => setZoom((prev) => Math.max(prev - 0.5, 0.5))}
          zoomLevel={zoom}
          onChangeZoom={setZoom}
          isPlaying={isPlaying}
        />
      </Box>

      {/* Time Ruler */}
      <Box
        sx={{
          height: '50px',
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[1],
        }}
      >
        <TimeRuler duration={totalDuration} zoom={zoom} />
      </Box>

      {/* Timeline */}
      <Box
        sx={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          padding: 2,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1],
        }}
      >
        <Timeline
          videos={videos}
          zoom={zoom}
          onMoveClip={onMoveClip}
          onResizeClip={onResizeClip}
          onCutClip={onCutClip}
        />
      </Box>
    </Box>
  );
};

export default TimelinePanel;
