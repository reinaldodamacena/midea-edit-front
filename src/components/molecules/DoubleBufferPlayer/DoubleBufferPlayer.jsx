import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

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

  // Monitorando o estado do player
  console.log('Current Time:', currentTime);
  console.log('Visible Player:', visiblePlayer);
  console.log('Player A Index:', playerAIndex, 'Player B Index:', playerBIndex);

  // Verifica se chegou ao final
  useEffect(() => {
    if (currentTime >= totalDuration && totalDuration > 0) {
      console.log('Playback ended');
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

  // Atualiza o player visível
  useEffect(() => {
    setVisiblePlayer((prev) => (prev === 'A' ? 'B' : 'A'));
    console.log('Switched to Player:', visiblePlayer === 'A' ? 'B' : 'A');
  }, [activeIndex]);

  // Ajusta players
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

  // Sincroniza tempos locais
  useEffect(() => {
    if (visiblePlayer === 'A' && playerARef.current) {
      const actual = playerARef.current.getCurrentTime?.() || 0;
      if (Math.abs(actual - localTimeA) > 0.25) {
        console.log('Seeking Player A to:', localTimeA);
        playerARef.current.seekTo(localTimeA, 'seconds');
      }
    } else if (visiblePlayer === 'B' && playerBRef.current) {
      const actual = playerBRef.current.getCurrentTime?.() || 0;
      if (Math.abs(actual - localTimeB) > 0.25) {
        console.log('Seeking Player B to:', localTimeB);
        playerBRef.current.seekTo(localTimeB, 'seconds');
      }
    }
  }, [visiblePlayer, localTimeA, localTimeB]);

  // Progresso dos players
  const handleProgressA = (prog) => {
    if (visiblePlayer === 'A') {
      const sumPrev = videos.slice(0, playerAIndex).reduce((s, v) => s + (v.duration || 0), 0);
      const globalTime = sumPrev + prog.playedSeconds;
      console.log('Progress Player A:', globalTime);
      onProgress?.(globalTime);
    }
  };

  const handleProgressB = (prog) => {
    if (visiblePlayer === 'B') {
      const sumPrev = videos.slice(0, playerBIndex).reduce((s, v) => s + (v.duration || 0), 0);
      const globalTime = sumPrev + prog.playedSeconds;
      console.log('Progress Player B:', globalTime);
      onProgress?.(globalTime);
    }
  };

  if (!videos.length) return null;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '6px',
      overflow: 'hidden',
      backgroundColor: '#000',
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
