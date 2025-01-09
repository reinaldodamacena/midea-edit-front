import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TimelinePanel from '../../organisms/TimelinePanel/TimelinePanel';
import MediaControlPanel from '../../organisms/MediaControlPanel/MediaControlPanel';
import NotificationPanelOrganism from '../../organisms/NotificationPanelOrganism/NotificationPanelOrganism';
import VideoPlayer from '../../molecules/VideoPlayer/VideoPlayer';
import Sidebar from '../../organisms/Sidebar/Sidebar';

const EditTemplate = ({
  cuts,
  currentTime,
  duration,
  notifications,
  videos,
  selectedVideo,
  onPlayPause,
  onStop,
  onEditCut,
  onWatchCut,
  onDeleteVideo,
  onSelectVideo,
  onCutVideo,
  onMoveClip,
  onResizeClip,
  onUpdateTime,
}) => {
  return (
    <Grid container sx={{ height: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Sidebar com Arquivos de Vídeo */}
      <Grid
        item
        xs={2}
        sx={{
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <Sidebar videos={videos} onSelectVideo={onSelectVideo} onDeleteVideo={onDeleteVideo} />
      </Grid>

      {/* Área Principal */}
      <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* Player de Vídeo */}
        <Box
          sx={{
            flex: 2,
            padding: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {selectedVideo ? (
            <VideoPlayer url={selectedVideo.url} currentTime={currentTime} duration={selectedVideo.duration} />
          ) : (
            <Typography variant="h6" color="text.secondary">
              Nenhum vídeo selecionado
            </Typography>
          )}
        </Box>

        {/* Timeline */}
        <Box
          sx={{
            flex: 1,
            padding: 2,
            backgroundColor: 'background.default',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <TimelinePanel
            videos={videos}
            cuts={cuts}
            currentTime={currentTime}
            onUpdateTime={onUpdateTime}
            onMoveClip={onMoveClip}
            onResizeClip={onResizeClip}
            onCutClip={onCutVideo}
          />
        </Box>
      </Grid>

      
    </Grid>
  );
};

export default EditTemplate;
