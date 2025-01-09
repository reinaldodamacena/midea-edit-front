import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const VideoFrames = React.memo(({ videoUrl, zoom = 50, height = 80, boxWidth = 600 }) => {
  const canvasRef = useRef(null);
  const theme = useTheme();

  // Estado opcional para sinalizar se estamos gerando frames
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoUrl) return; // Se não houver URL, não faz nada

    let isCancelled = false; // Para controlar cleanup
    const renderFrames = async () => {
      try {
        setLoading(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = 'anonymous';
        video.muted = true;

        // Carrega e espera metadados
        await video.play().catch(() => {
          // Pode falhar silenciosamente se autoplay não for permitido, mas garante carregamento.
          video.pause();
        });
        video.pause();

        const duration = video.duration;
        if (duration === Infinity || isNaN(duration) || duration <= 0) {
          // Se não tivermos uma duração válida, não desenha nada
          setLoading(false);
          return;
        }

        const totalFrames = Math.min(Math.ceil((boxWidth * zoom) / 120), 20);
        const totalWidth = boxWidth * zoom;
        const frameWidth = totalWidth / totalFrames;

        // Ajusta o canvas
        canvas.width = totalWidth;
        canvas.height = height;

        let currentTime = 0;
        const interval = duration / totalFrames;

        const drawFrame = () => {
          if (isCancelled) return;

          video.currentTime = currentTime;
          video.addEventListener(
            'seeked',
            function handler() {
              // Se o componente desmontou no meio do caminho, para tudo
              if (isCancelled) {
                video.removeEventListener('seeked', handler);
                return;
              }
              const x = (currentTime / duration) * totalWidth;
              context.clearRect(x, 0, frameWidth, height);
              context.drawImage(video, x, 0, frameWidth, height);

              currentTime += interval;
              if (currentTime < duration) {
                drawFrame();
              }
              video.removeEventListener('seeked', handler);
            },
            { once: true }
          );
        };

        // Inicia o desenho
        drawFrame();
      } catch (error) {
        console.error('Erro ao gerar frames:', error);
      } finally {
        setLoading(false);
      }
    };

    renderFrames();

    // Cleanup
    return () => {
      isCancelled = true;
    };
  }, [videoUrl, zoom, height, boxWidth]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: `${boxWidth * zoom}px`,
        height: `${height}px`,
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
      }}
    >
      {loading && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: theme.palette.text.secondary,
            pointerEvents: 'none',
          }}
        >
          Carregando miniaturas...
        </Typography>
      )}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
});

export default VideoFrames;
