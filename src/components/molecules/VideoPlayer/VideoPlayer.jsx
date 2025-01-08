import React from 'react';
import ReactPlayer from 'react-player';
import withThemeStyle from '../../../utils/withThemeStyle';
import { Box, Typography } from '@mui/material';

const VideoPlayer = ({ url, width = '100%', height = 'auto', theme, ...props }) => {
  return (
    <Box
      sx={{
        borderRadius: '0px', // Bordas retas
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
      }}
    >
      {url ? (
        <ReactPlayer
          url={url}
          width="80%"
          height="80%"
          controls
          {...props}
          style={{ borderRadius: '0px' }} // Bordas retas para o player interno
        />
      ) : (
        <Typography variant="body1" color="text.secondary">
          Nenhum vídeo carregado
        </Typography>
      )}
    </Box>
  );
};

export default withThemeStyle(VideoPlayer);
