// src/components/organisms/NotificationPanelOrganism/NotificationPanelOrganism.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import NotificationPanel from '../../molecules/NotificationPanel/NotificationPanel';

const NotificationPanelOrganism = ({ notifications }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Notificações
      </Typography>
      <NotificationPanel notifications={notifications} />
    </Box>
  );
};

export default NotificationPanelOrganism;
