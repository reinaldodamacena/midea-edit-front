// src/components/molecules/Timeline/Timeline.jsx
import React, { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import VideoFrames from '../../atoms/VideoFrames/VideoFrames';
import TimeRuler from '../TimeRuler/TimeRuler';

const Timeline = React.memo(({
  videos,
  zoom = 50,
  currentTime = 0,
  onUpdateTime, // callback
}) => {
  const theme = useTheme();

  const normalizedZoom = zoom / 100;
  const totalDuration = useMemo(() => {
    if (!videos?.length) return 0;
    return videos.reduce((sum, v) => sum + (v.duration || 0), 0);
  }, [videos]);

  const totalWidth = useMemo(() => {
    if (totalDuration <= 0) return 0;
    return totalDuration * normalizedZoom * 100;
  }, [totalDuration, normalizedZoom]);

  const videoWidths = useMemo(() => {
    if (!videos?.length || totalDuration === 0) return [];
    return videos.map((vid) => {
      const frac = vid.duration / totalDuration;
      return frac * totalWidth;
    });
  }, [videos, totalDuration, totalWidth]);

  const handleScrub = (newTime) => {
    onUpdateTime?.(newTime);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 1,
        backgroundColor: theme.palette.background.paper,
        overflowX: 'auto',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* TimeRuler */}
      <TimeRuler
        duration={totalDuration}
        zoom={zoom}
        currentTime={currentTime}
        boxWidth={totalWidth}
        onScrub={handleScrub}
      />

      {/* Lista de vídeos (frames) */}
      <Box
        sx={{
          display: 'flex',
          gap: 0,
          padding: 0,
          width: `${totalWidth}px`,
          overflow: 'hidden',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {videos.map((video, idx) => (
          <Box
            key={video.id}
            sx={{
              position: 'relative',
              width: `${videoWidths[idx]}px`,
              height: '100px',
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[1],
            }}
          >
            <VideoFrames
              videoUrl={video.url}
              zoom={zoom}
              boxWidth={videoWidths[idx]}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default Timeline;
