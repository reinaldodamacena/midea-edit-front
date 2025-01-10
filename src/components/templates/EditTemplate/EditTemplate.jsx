import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Sidebar from '../../organisms/Sidebar/Sidebar';
import TimelinePanel from '../../organisms/TimelinePanel/TimelinePanel';
import DoubleBufferPlayer from '../../molecules/DoubleBufferPlayer/DoubleBufferPlayer';

const EditTemplate = ({ videos: initialVideos, onSelectVideo, onDeleteVideo, cuts }) => {
  const [videos, setVideos] = useState(initialVideos || []);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(2);

  // Sincronizar estado interno com as props quando `initialVideos` mudar
  useEffect(() => {
    setVideos(initialVideos || []);
  }, [initialVideos]);

  const totalDuration = videos.reduce((acc, v) => acc + (v.duration || 0), 0);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleUpdateTime = (newTime) => {
    if (newTime >= totalDuration) {
      setIsPlaying(false);
      setCurrentTime(totalDuration);
    } else {
      setCurrentTime(newTime);
    }
  };

  const handleProgress = (globalTime) => {
    if (globalTime >= totalDuration) {
      setIsPlaying(false);
      setCurrentTime(totalDuration);
    } else {
      setCurrentTime(globalTime);
    }
  };

  const handleEndedAll = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleReorder = (newList) => {
    setVideos(newList);
  };

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      {/* Sidebar */}
      <Grid
        item
        xs={2}
        sx={{
          backgroundColor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          boxShadow: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Sidebar videos={videos} onSelectVideo={onSelectVideo} onDeleteVideo={onDeleteVideo} />
      </Grid>

      {/* Área principal */}
      <Grid
        item
        xs={10}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.default',
        }}
      >
        {/* Player */}
        <Box
          sx={{
            flex: 2,
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 2,
          }}
        >
          {!videos.length ? (
            <Typography variant="h6" color="text.secondary">
              Nenhum vídeo disponível
            </Typography>
          ) : (
            <Box
              sx={{
                width: '80%',
                height: '80%',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
              }}
            >
              <DoubleBufferPlayer
                videos={videos}
                currentTime={currentTime}
                isPlaying={isPlaying}
                onProgress={handleProgress}
                onEndedAll={handleEndedAll}
                width="100%"
                height="100%"
              />
            </Box>
          )}
        </Box>

        {/* Timeline */}
        <Box sx={{ flex: 0, p: 1 }}>
          <TimelinePanel
            videos={videos}
            cuts={cuts}
            currentTime={currentTime}
            zoom={zoom}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onChangeZoom={setZoom}
            onUpdateTime={handleUpdateTime}
            onReorder={handleReorder}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditTemplate;
