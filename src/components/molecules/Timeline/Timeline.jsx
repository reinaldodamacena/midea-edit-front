import React, { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import VideoFrames from '../../atoms/VideoFrames/VideoFrames';
import TimeRuler from '../../molecules/TimeRuler/TimeRuler';

const Timeline = React.memo(({ videos, zoom, currentTime, onMoveClip }) => {
  const theme = useTheme();

  // Duração total da timeline
  const totalDuration = useMemo(
    () => videos.reduce((sum, video) => sum + video.duration, 0),
    [videos]
  );

  // Largura total da timeline com base no zoom
  const totalWidth = useMemo(() => totalDuration * zoom * 120, [totalDuration, zoom]);

  // Calcula a largura de cada vídeo com base no zoom
  const videoWidths = useMemo(
    () => videos.map((video) => (video.duration / totalDuration) * totalWidth),
    [videos, totalDuration, totalWidth]
  );

  const handleDragStart = (e, videoId) => {
    e.dataTransfer.setData('videoId', videoId);
  };

  const handleDrop = (e, targetPosition) => {
    const videoId = e.dataTransfer.getData('videoId');
    if (videoId && onMoveClip) {
      onMoveClip(videoId, targetPosition); // Move o clipe para a posição desejada
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 1,
        height: 'auto',
        backgroundColor: theme.palette.background.paper,
        overflowX: 'auto',
      }}
    >
      {/* TimeRuler */}
      <TimeRuler
        duration={totalDuration}
        zoom={zoom}
        currentTime={currentTime}
        boxWidth={totalWidth} // Largura total sincronizada
      />

      {/* Renderiza os Clipes */}
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          gap: 0,
          padding: 0,
        }}
      >
        {videos.map((video, index) => (
          <Box
            key={video.id}
            draggable
            onDragStart={(e) => handleDragStart(e, video.id)}
            onDragOver={(e) => e.preventDefault()} // Permite o drop
            onDrop={(e) => handleDrop(e, video.startTime)} // Calcula o Snap
            sx={{
              position: 'relative',
              width: `${videoWidths[index]}px`, // Largura proporcional
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.default,
              boxShadow: theme.shadows[1],
              cursor: 'grab',
              '&:hover': {
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <VideoFrames
              videoUrl={video.url}
              zoom={zoom}
              boxWidth={videoWidths[index]} // Passa a largura sincronizada ao zoom
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default Timeline;
