import React, { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import VideoFrames from '../../atoms/VideoFrames/VideoFrames';

const Timeline = React.memo(({ videos, zoom, onMoveClip }) => {
  const theme = useTheme();

  const videoWidths = useMemo(
    () => videos.map((video) => video.duration * zoom * 120),
    [videos, zoom]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        padding: 1,
        height: '10%',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {videos.map((video, index) => (
        <Box
          key={video.id}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('videoId', video.id)}
          sx={{
            position: 'relative',
            width: `${videoWidths[index]}px`,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[1],
            cursor: 'grab',
            '&:hover': {
              boxShadow: theme.shadows[4],
            },
          }}
        >
          <VideoFrames videoUrl={video.url} zoom={zoom} frameInterval={5} />
        </Box>
      ))}
    </Box>
  );
});

export default Timeline;
