import React from 'react';
import ReactPlayer from 'react-player';

const VideoTest = ({ url }) => {
  return (
    <div>
      <h1>Teste de Reprodução de Vídeo</h1>
      <ReactPlayer url={url} controls width="100%" height="100%" />
    </div>
  );
};

export default VideoTest;
