import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import VideoFrames from '../../atoms/VideoFrames/VideoFrames';

/**
 * SortableClip
 * 
 * Props:
 *  - video: { id, name, url, duration }
 *  - width: largura calculada com base na duração e zoom
 */
const SortableClip = ({ video, width }) => {
  const theme = useTheme(); // Acessa o tema atual
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: video.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: `${width}px`,
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    cursor: 'grab',
    overflow: 'hidden',
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* Exibição dos frames do vídeo */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <VideoFrames
          videoUrl={video.url}
          zoom={width / 100} // Ajusta zoom proporcionalmente
          boxWidth={width} // Largura calculada do clipe
        />
      </Box>

      {/* Nome do clipe */}
      <Box
        sx={{
          height: '20px',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: theme.spacing(0, 1),
          }}
        >
          {video.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default SortableClip;
