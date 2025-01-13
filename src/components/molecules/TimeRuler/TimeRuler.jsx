import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import throttle from 'lodash/throttle';
import Cursor from '../../atoms/Cursor/Cursor';

const TimeRuler = ({
  duration = 0, // Duração total em segundos
  zoom = 50, // Controle de zoom (em %)
  currentTime = 0, // Tempo atual em segundos
  boxWidth = 600, // Largura visível da timeline
  onScrub, // Callback para scrub na timeline
}) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0); // Posição do scroll

  // Pixels por segundo ajustados pelo zoom
  const pixelsPerSecond = useMemo(() => {
    const basePixelsPerSecond = 10; // Pixels por segundo no zoom base (100%)
    return basePixelsPerSecond * (zoom / 100); // Ajuste com base no zoom
  }, [zoom]);

  // Intervalo de marcadores
  const markerInterval = useMemo(() => {
    const markerSpacing = 50; // Espaçamento mínimo entre marcadores em pixels
    const spacingInSeconds = markerSpacing / pixelsPerSecond;

    // Garantir uma densidade mínima de marcadores
    const minMarkersOnScreen = 10; // Mínimo de 10 marcadores visíveis
    const maxInterval = duration / minMarkersOnScreen;

    return Math.min(maxInterval, Math.ceil(spacingInSeconds / 10) * 10); // Ajuste dinâmico
  }, [pixelsPerSecond, duration]);

  // Renderizar os marcadores no Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || pixelsPerSecond <= 0) return;

    const ctx = canvas.getContext('2d');
    const visibleWidth = boxWidth; // Apenas a largura visível
    const canvasHeight = 60;

    canvas.width = visibleWidth;
    canvas.height = canvasHeight;

    const visibleStartTime = scrollOffset / pixelsPerSecond;
    const visibleEndTime = (scrollOffset + visibleWidth) / pixelsPerSecond;

    ctx.clearRect(0, 0, visibleWidth, canvasHeight);

    ctx.fillStyle = '#FFF';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'gray';

    for (
      let time = Math.max(0, Math.floor(visibleStartTime / markerInterval) * markerInterval);
      time <= Math.min(duration, visibleEndTime);
      time += markerInterval
    ) {
      const position = (time * pixelsPerSecond) - scrollOffset;

      // Desenho de marcadores principais
      ctx.beginPath();
      ctx.moveTo(position, 20);
      ctx.lineTo(position, canvasHeight);
      ctx.stroke();

      // Função para formatar o tempo em "MM:SS"
      const formatTimeLabel = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60); // Calcular minutos
        const seconds = timeInSeconds % 60; // Calcular segundos restantes
        return `${minutes}:${String(seconds).padStart(2, '0')}`; // Formatar para "MM:SS"
      };

      // Renderizar texto do marcador principal
      const label = formatTimeLabel(time); // Obter o rótulo formatado
      ctx.fillText(label, position, 10); // Desenhar o rótulo no canvas


      // Adicionar subdivisões (marcadores menores)
      const subInterval = markerInterval / 4; // Exemplo: 4 subdivisões por intervalo
      for (let subTime = time + subInterval; subTime < time + markerInterval; subTime += subInterval) {
        const subPosition = (subTime * pixelsPerSecond) - scrollOffset;
        ctx.beginPath();
        ctx.moveTo(subPosition, 40); // Marcadores menores
        ctx.lineTo(subPosition, canvasHeight);
        ctx.stroke();
      }
    }
  }, [scrollOffset, pixelsPerSecond, markerInterval, duration, boxWidth]);

  // Calcular tempo a partir da posição X do mouse
  const calcTimeFromX = useCallback(
    (clientX) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect || pixelsPerSecond <= 0) return 0;
      const relativeX = clientX - rect.left + scrollOffset;
      return Math.max(0, Math.min(relativeX / pixelsPerSecond, duration));
    },
    [pixelsPerSecond, scrollOffset, duration]
  );

  // Posição do cursor com base no tempo atual
  const currentTimePosition = useMemo(() => {
    return Math.max(0, Math.min(currentTime * pixelsPerSecond - scrollOffset, boxWidth));
  }, [currentTime, pixelsPerSecond, scrollOffset, boxWidth]);

  // Manipuladores de eventos
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    const newTime = calcTimeFromX(e.clientX);
    onScrub?.(newTime);
  }, [calcTimeFromX, onScrub]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const newTime = calcTimeFromX(e.clientX);
      onScrub?.(newTime);
    },
    [isDragging, calcTimeFromX, onScrub]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleScroll = useCallback((e) => {
    setScrollOffset(e.target.scrollLeft);
  }, []);
    // Manipular eventos de teclado para mover o marcador
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') {
          const newTime = Math.min(currentTime + 15, duration);
          onScrub?.(newTime);
        } else if (e.key === 'ArrowLeft') {
          const newTime = Math.max(currentTime - 15, 0);
          onScrub?.(newTime);
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [currentTime, duration, onScrub]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: `${boxWidth}px`,
        height: '61px',
        background: '#1e1e1e',
        borderBottom: '1px solid #444',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}
      onScroll={handleScroll}
      onMouseDown={handleMouseDown} // Permitir iniciar o arraste ao clicar em qualquer lugar
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          backgroundColor: '#333',
        }}
      />
      <Cursor position={currentTimePosition} />
    </Box>
  );
};

export default TimeRuler;
