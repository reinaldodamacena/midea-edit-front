import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

/**
 * Toca vários vídeos em sequência como se fosse uma timeline única,
 * mas com pré-carregamento do próximo clipe em um <video> oculto.
 *
 * Props:
 *  - videos: [{url, duration}, ...]
 *  - currentTime: tempo global (0 até soma das durações)
 *  - isPlaying: boolean (controle externo de play/pause)
 *  - onUpdateTime: callback(newGlobalTime)
 *  - onEndedAll: callback() quando terminar todos
 */
const TimelinePlayerPreload = ({
  videos = [],
  currentTime = 0,
  isPlaying = false,
  onUpdateTime,
  onEndedAll,
  ...playerProps
}) => {
  // Refs
  const mainPlayerRef = useRef(null);   // ReactPlayer principal
  const preloadRef = useRef(null);      // <video> invisível

  // Índice do vídeo atual
  const [activeIndex, setActiveIndex] = useState(0);

  // Soma total das durações
  const totalDuration = videos.reduce((acc, v) => acc + (v.duration || 0), 0);

  // Efeito principal: descobre qual vídeo está ativo, faz seek se necessário
  useEffect(() => {
    // Mesmo que não haja vídeos, esse Hook é chamado (mas com if internos)
    if (!videos.length) {
      return; // Evita lógica se não há vídeos
    }

    // Se currentTime passou do total, já encerrou
    if (currentTime >= totalDuration && totalDuration > 0) {
      onEndedAll?.();
      return;
    }

    // Descobrir em qual vídeo estamos
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
    setActiveIndex(foundIndex);

    // Se já temos o Player montado, calcula tempo local
    if (mainPlayerRef.current) {
      const localTimeShouldBe = currentTime - sum;
      const actualLocalTime = mainPlayerRef.current.getCurrentTime();

      if (Math.abs(actualLocalTime - localTimeShouldBe) > 0.2) {
        mainPlayerRef.current.seekTo(localTimeShouldBe, 'seconds');
      }
    }
  }, [currentTime, videos, totalDuration, onEndedAll]);

  // Efeito para pré-carregar o próximo vídeo no <video> invisível
  // (executa mesmo que o nextVideoUrl seja undefined, mas sai cedo).
  useEffect(() => {
    if (!videos.length) {
      return;
    }
    if (!preloadRef.current || !nextVideoUrl) {
      return;
    }
    preloadRef.current.src = nextVideoUrl;
    preloadRef.current.load();
  }, [videos, activeIndex]); // ajustaremos a dependência melhor abaixo

  // Handler de progresso no ReactPlayer
  const handleProgress = (progress) => {
    if (!videos.length) return;
    const localSeconds = progress.playedSeconds;

    let sumPrev = 0;
    for (let i = 0; i < activeIndex; i++) {
      sumPrev += videos[i].duration;
    }
    const globalTime = sumPrev + localSeconds;

    if (onUpdateTime && Math.abs(globalTime - currentTime) > 0.1) {
      onUpdateTime(globalTime);
    }
  };

  // Handler de término de vídeo atual
  const handleEnded = () => {
    const nextI = activeIndex + 1;
    if (nextI < videos.length) {
      // Passa ao próximo
      let sumPrev = 0;
      for (let i = 0; i < nextI; i++) {
        sumPrev += videos[i].duration;
      }
      setActiveIndex(nextI);
      onUpdateTime?.(sumPrev);
    } else {
      onEndedAll?.();
    }
  };

  // -----------------------------------------
  // Agora, definimos nextVideoUrl ANTES do return
  // para que useEffect possa depender dele
  // -----------------------------------------
  const nextIndex = activeIndex + 1 < videos.length ? activeIndex + 1 : null;
  const nextVideoUrl = nextIndex !== null ? videos[nextIndex].url : null;

  // Precisamos corrigir a dependência do effect de preload 
  // para reagir a "nextVideoUrl", mas sem condicionar o hook
  useEffect(() => {
    if (!videos.length) return;
    if (!preloadRef.current || !nextVideoUrl) return;

    preloadRef.current.src = nextVideoUrl;
    preloadRef.current.load();
  }, [nextVideoUrl, videos.length]);

  // Se não há vídeos, depois dos Hooks, retornamos null
  if (!videos.length) {
    return null;
  }

  // Vídeo atual
  const activeVideo = videos[activeIndex];

  return (
    <>
      {/* Player principal */}
      <ReactPlayer
        ref={mainPlayerRef}
        url={activeVideo.url}
        playing={isPlaying}
        controls={false}
        onPlay={() => {}}
        onPause={() => {}}
        onProgress={handleProgress}
        onEnded={handleEnded}
        {...playerProps}
      />

      {/* <video> invisível para pré-carregar o próximo clipe */}
      {nextVideoUrl && (
        <video
          ref={preloadRef}
          style={{ display: 'none' }}
          preload="auto"
        />
      )}
    </>
  );
};

export default TimelinePlayerPreload;
