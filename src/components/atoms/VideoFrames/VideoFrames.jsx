import React, { useRef, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';

const VideoFrames = React.memo(({ videoUrl, zoom = 1, height = 80, boxWidth = 600 }) => {
  const canvasRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const renderFrames = async () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const video = document.createElement('video');
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';
      video.muted = true;

      video.onloadedmetadata = () => {
        const duration = video.duration;
        const totalFrames = Math.ceil((boxWidth * zoom) / 120); // Calcula o total de frames ajustado ao zoom
        const frameWidth = (boxWidth * zoom) / totalFrames; // Ajusta a largura de cada frame proporcional ao zoom

        canvas.width = boxWidth * zoom; // Canvas ajustado ao zoom
        canvas.height = height;

        let currentTime = 0;
        const interval = duration / totalFrames; // Intervalo de tempo entre frames

        const drawFrame = () => {
          video.currentTime = currentTime;

          video.addEventListener(
            'seeked',
            function handler() {
              const x = (currentTime / duration) * (boxWidth * zoom); // Posiciona o frame proporcional ao zoom
              context.clearRect(x, 0, frameWidth, height); // Limpa antes de desenhar
              context.drawImage(video, x, 0, frameWidth, height); // Renderiza o frame
              currentTime += interval; // Incrementa o tempo

              if (currentTime < duration) {
                drawFrame();
              }
              video.removeEventListener('seeked', handler);
            },
            { once: true }
          );
        };

        drawFrame();
      };
    };

    renderFrames();
  }, [videoUrl, zoom, height, boxWidth]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: `${boxWidth * zoom}px`, // Ajusta a largura proporcional ao zoom
        height: `${height}px`,
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
});

export default VideoFrames;
