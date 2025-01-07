// src/components/molecules/NotificationPanel/NotificationPanel.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import Badge from '../../atoms/Badge/Badge';

const NotificationPanel = ({ notifications }) => {
  return (
    <Box>
      <Typography variant="h6">Notificações</Typography>
      <Box sx={{ marginTop: 2 }}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Typography key={notification.id} variant="body2">
              {notification.message}
            </Typography>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nenhuma notificação no momento.
          </Typography>
        )}
      </Box>
      <Badge count={notifications.length} />
    </Box>
  );
};

export default NotificationPanel;
