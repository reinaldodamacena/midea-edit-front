import React from 'react';
import { Box, Typography } from '@mui/material';
import NotificationPanel from '../../molecules/NotificationPanel/NotificationPanel';

const NotificationPanelOrganism = ({ notifications }) => {
  return (
    <Box sx={{ padding: 2, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        Notificações
      </Typography>
      <NotificationPanel notifications={notifications} />
    </Box>
  );
};

export default NotificationPanelOrganism;
