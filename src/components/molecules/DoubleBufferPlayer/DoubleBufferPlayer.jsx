import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

/**
 * DoubleBufferPlayer
 * Evita flicker ao trocar de vídeos, usando 2 ReactPlayers.
 */
const DoubleBufferPlayer = ({
  videos = [],
  currentTime = 0,
  isPlaying = false,
  onProgress,
  onEndedAll,
  ...props
}) => {
  const [visiblePlayer, setVisiblePlayer] = useState('A');

  const playerARef = useRef(null);
  const playerBRef = useRef(null);

  const [playerAIndex, setPlayerAIndex] = useState(0);
  const [playerBIndex, setPlayerBIndex] = useState(1);

  const [localTimeA, setLocalTimeA] = useState(0);
  const [localTimeB, setLocalTimeB] = useState(0);

  const totalDuration = videos.reduce((acc, v) => acc + (v.duration || 0), 0);

  // Verifica se chegou ao final de tudo
  useEffect(() => {
    if (currentTime >= totalDuration && totalDuration > 0) {
      onEndedAll?.();
    }
  }, [currentTime, totalDuration, onEndedAll]);

  // Converte currentTime => (activeIndex, localOffset)
  const [activeIndex, localOffset] = (() => {
    let sum = 0;
    for (let i = 0; i < videos.length; i++) {
      const nextSum = sum + (videos[i].duration || 0);
      if (currentTime < nextSum) {
        return [i, currentTime - sum];
      }
      sum = nextSum;
    }
    return [videos.length - 1, 0];
  })();

  // Ao mudar activeIndex, inverte o player visível
  useEffect(() => {
    setVisiblePlayer((prev) => (prev === 'A' ? 'B' : 'A'));
  }, [activeIndex]);

  // Ajusta player A e B
  useEffect(() => {
    const nextIndex = activeIndex + 1 < videos.length ? activeIndex + 1 : activeIndex;
    if (visiblePlayer === 'A') {
      setPlayerAIndex(activeIndex);
      setLocalTimeA(localOffset);
      setPlayerBIndex(nextIndex);
      setLocalTimeB(0);
    } else {
      setPlayerBIndex(activeIndex);
      setLocalTimeB(localOffset);
      setPlayerAIndex(nextIndex);
      setLocalTimeA(0);
    }
  }, [activeIndex, localOffset, visiblePlayer, videos.length]);

  const urlA = playerAIndex < videos.length ? videos[playerAIndex].url : null;
  const urlB = playerBIndex < videos.length ? videos[playerBIndex].url : null;

  // Sincroniza localTime com o player real
  useEffect(() => {
    if (visiblePlayer === 'A' && playerARef.current) {
      const actual = playerARef.current.getCurrentTime?.() || 0;
      if (Math.abs(actual - localTimeA) > 0.25) {
        playerARef.current.seekTo(localTimeA, 'seconds');
      }
    } else if (visiblePlayer === 'B' && playerBRef.current) {
      const actual = playerBRef.current.getCurrentTime?.() || 0;
      if (Math.abs(actual - localTimeB) > 0.25) {
        playerBRef.current.seekTo(localTimeB, 'seconds');
      }
    }
  }, [visiblePlayer, localTimeA, localTimeB]);

  // handleProgress => emite tempo global
  const handleProgressA = (prog) => {
    if (visiblePlayer === 'A') {
      const sumPrev = videos.slice(0, playerAIndex).reduce((s, v) => s + (v.duration || 0), 0);
      const globalTime = sumPrev + prog.playedSeconds;
      onProgress?.(globalTime);
    }
  };
  const handleProgressB = (prog) => {
    if (visiblePlayer === 'B') {
      const sumPrev = videos.slice(0, playerBIndex).reduce((s, v) => s + (v.duration || 0), 0);
      const globalTime = sumPrev + prog.playedSeconds;
      onProgress?.(globalTime);
    }
  };

  const handleEndedA = () => {
    if (visiblePlayer === 'A') {
      // (seu pai ajusta currentTime ou onEndedAll)
    }
  };
  const handleEndedB = () => {
    if (visiblePlayer === 'B') {
      // ...
    }
  };

  if (!videos.length) return null;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '6px',
      overflow: 'hidden', // bordas suaves
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      backgroundColor: '#000', // para garantir fundo escuro
    }}>
      {/* Player A */}
      <div style={{
        position: 'absolute',
        inset: 0,
        transition: 'opacity 0.3s ease',
        opacity: visiblePlayer === 'A' ? 1 : 0,
        pointerEvents: visiblePlayer === 'A' ? 'auto' : 'none',
      }}>
        {urlA && (
          <ReactPlayer
            ref={playerARef}
            url={urlA}
            playing={isPlaying && visiblePlayer === 'A'}
            controls={false}
            onProgress={handleProgressA}
            onEnded={handleEndedA}
            width="100%"
            height="100%"
            {...props}
          />
        )}
      </div>

      {/* Player B */}
      <div style={{
        position: 'absolute',
        inset: 0,
        transition: 'opacity 0.3s ease',
        opacity: visiblePlayer === 'B' ? 1 : 0,
        pointerEvents: visiblePlayer === 'B' ? 'auto' : 'none',
      }}>
        {urlB && (
          <ReactPlayer
            ref={playerBRef}
            url={urlB}
            playing={isPlaying && visiblePlayer === 'B'}
            controls={false}
            onProgress={handleProgressB}
            onEnded={handleEndedB}
            width="100%"
            height="100%"
            {...props}
          />
        )}
      </div>
    </div>
  );
};

export default DoubleBufferPlayer;
