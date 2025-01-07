// src/components/atoms/VideoPlayer/VideoPlayer.jsx
import React from 'react';
import ReactPlayer from 'react-player';
import withThemeStyle from '../../../utils/withThemeStyle';

const VideoPlayer = ({ url, width = '100%', height = 'auto', theme, ...props }) => {
  return (
    <div
      style={{
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <ReactPlayer url={url} width={width} height={height} controls {...props} />
    </div>
  );
};

export default withThemeStyle(VideoPlayer);
