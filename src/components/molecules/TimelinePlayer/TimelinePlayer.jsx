import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

/**
 * Toca vários vídeos em sequência como se fosse uma timeline única.
 * 
 * Necessita:
 *   - videos: [{url, duration (segundos)}, ...]
 *   - currentTime: tempo global (0 até soma das durações)
 *   - isPlaying: bool controlado externamente
 *   - onUpdateTime: callback(newTimeGlobal), ao progredir no vídeo
 *   - onEndedAll: callback() se quiser saber quando termina tudo
 */
const TimelinePlayer = ({
  videos = [],
  currentTime = 0,
  isPlaying = false,
  onUpdateTime,
  onEndedAll,
  ...playerProps
}) => {
  const playerRef = useRef(null);

  // Índice do vídeo atualmente em reprodução
  const [activeIndex, setActiveIndex] = useState(0);

  // Soma total das durações
  const totalDuration = videos.reduce((acc, v) => acc + (v.duration || 0), 0);

  useEffect(() => {
    if (!videos.length) return;

    // Se currentTime passou do total, já encerrou
    if (currentTime >= totalDuration && totalDuration > 0) {
      onEndedAll?.();
      return;
    }

    // Descobrir em qual vídeo estamos, baseado em currentTime
    let sum = 0;
    let foundIndex = 0;
    for (let i = 0; i < videos.length; i++) {
      const nextSum = sum + videos[i].duration;
      if (currentTime < nextSum) {
        foundIndex = i;
        break;
      }
      sum = nextSum;
    }

    // Define o vídeo ativo
    setActiveIndex(foundIndex);

    // Se o player já está montado, calculamos "tempo local" desse vídeo
    if (playerRef.current) {
      const localTimeShouldBe = currentTime - sum;

      // Verifica o tempo local atual
      const actualLocalTime = playerRef.current.getCurrentTime(); // Retorna Number
      // Se a diferença for grande (ex.: > 0.2s), reposiciona
      if (Math.abs(actualLocalTime - localTimeShouldBe) > 0.2) {
        playerRef.current.seekTo(localTimeShouldBe, 'seconds');
      }
    }
  }, [currentTime, videos, totalDuration, onEndedAll]);

  // Progresso do player no vídeo atual
  const handleProgress = (progress) => {
    if (!videos.length) return;
    const localSeconds = progress.playedSeconds;

    // Soma durations dos vídeos anteriores
    let sumPrev = 0;
    for (let i = 0; i < activeIndex; i++) {
      sumPrev += videos[i].duration;
    }
    const globalTime = sumPrev + localSeconds;

    // Para evitar floods, só chama onUpdateTime se mudou significativamente
    if (onUpdateTime && Math.abs(globalTime - currentTime) > 0.1) {
      onUpdateTime(globalTime);
    }
  };

  // Quando o vídeo atual termina
  const handleEnded = () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex < videos.length) {
      // Passa ao próximo vídeo
      let sumPrev = 0;
      for (let i = 0; i < nextIndex; i++) {
        sumPrev += videos[i].duration;
      }
      setActiveIndex(nextIndex);
      onUpdateTime?.(sumPrev);
    } else {
      // Terminou todos
      onEndedAll?.();
    }
  };

  if (!videos.length) return null;
  const activeVideo = videos[activeIndex];

  return (
    <ReactPlayer
      ref={playerRef}
      // URL do vídeo ativo
      url={activeVideo.url}
      // Estado de play/pause vem de fora
      playing={isPlaying}

      // Remove qualquer controle nativo para evitar conflito
      controls={false}
      // Neutraliza onPlay/onPause
      onPlay={() => {}}
      onPause={() => {}}

      // Callbacks principais
      onProgress={handleProgress}
      onEnded={handleEnded}

      // Evite passar key dinâmica que mude a cada re-render,
      // senão o componente pode remountar
      {...playerProps}
    />
  );
};

export default TimelinePlayer;
