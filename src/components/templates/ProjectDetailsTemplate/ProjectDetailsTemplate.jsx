// src/components/templates/ProjectDetailsTemplate/ProjectDetailsTemplate.jsx
import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../../organisms/Header/Header';
import TimelinePanel from '../../organisms/TimelinePanel/TimelinePanel';
import EditorPanel from '../../organisms/EditorPanelOrganism/EditorPanelOrganism';
import NotificationPanel from '../../organisms/NotificationPanelOrganism/NotificationPanelOrganism';

const ProjectDetailsTemplate = ({ events, videoProps, notifications }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Box padding={2}>
          <TimelinePanel events={events} videoProps={videoProps} />
          <EditorPanel />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <NotificationPanel notifications={notifications} />
      </Grid>
    </Grid>
  );
};

export default ProjectDetailsTemplate;
