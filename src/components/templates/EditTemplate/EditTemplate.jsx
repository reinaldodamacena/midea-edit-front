import React from 'react';
import { Box, Grid, Divider } from '@mui/material';
import TimelinePanel from '../../organisms/TimelinePanel/TimelinePanel';
import MediaControlPanel from '../../organisms/MediaControlPanel/MediaControlPanel';
import NotificationPanelOrganism from '../../organisms/NotificationPanelOrganism/NotificationPanelOrganism';

const EditTemplate = ({
  cuts,
  currentTime,
  duration,
  notifications,
  onPlayPause,
  onStop,
  onEditCut,
  onWatchCut,
}) => {
  return (
    <Grid container sx={{ height: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Barra Lateral */}
      <Grid
        item
        xs={2}
        sx={{
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ padding: 2 }}>
          <h4>Ferramentas</h4>
          {/* Aqui podemos adicionar botões de funcionalidades */}
        </Box>
      </Grid>

      {/* Área Principal */}
      <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* Área de Preview */}
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
          <Box
            sx={{
              width: '80%',
              height: '60%',
              backgroundColor: 'black', // Placeholder para o preview
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            {/* Aqui deve ser integrado o player de vídeo */}
            <span style={{ color: 'white' }}>Preview do Vídeo</span>
          </Box>
        </Box>

        {/* Controles de Reprodução */}
        <Box
          sx={{
            padding: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <MediaControlPanel
            currentTime={currentTime}
            duration={duration}
            onPlayPause={onPlayPause}
            onStop={onStop}
          />
        </Box>

        {/* Timeline */}
        <Box sx={{ flex: 1, padding: 2 }}>
          <TimelinePanel cuts={cuts} onEdit={onEditCut} onWatch={onWatchCut} />
        </Box>
      </Grid>

      {/* Painel de Notificações */}
      <Grid
        item
        xs={12}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: 'background.paper',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
          padding: 2,
        }}
      >
        <NotificationPanelOrganism notifications={notifications} />
      </Grid>
    </Grid>
  );
};

export default EditTemplate;
