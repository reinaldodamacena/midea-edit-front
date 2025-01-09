import React from 'react';
import ReactPlayer from 'react-player';
import { Box } from '@mui/material';

/**
 * Exemplo de componente Player SEM controles nativos e SEM toggles internos
 */
const VideoPlayer = ({
  url,
  playing,
  onProgress,
  onEnded,
}) => {
  return (
    <Box
      sx={{
        // Se quiser impedir completamente cliques no vídeo:
        pointerEvents: 'none'
      }}
    >
      <ReactPlayer
        url={url}
        playing={playing}
        controls={false}   // Remove barra nativa
        onProgress={onProgress}
        onEnded={onEnded}
        width="100%"
        height="100%"
        // Impede que ReactPlayer trate play/pause internamente
        // (esses eventos deixam de atrapalhar):
        onPlay={() => {}}
        onPause={() => {}}
      />
    </Box>
  );
};

export default VideoPlayer;
