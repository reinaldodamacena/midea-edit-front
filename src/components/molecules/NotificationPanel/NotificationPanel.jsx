import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Badge from '../../atoms/Badge/Badge';

const NotificationPanel = ({ notifications }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Notificações
        </Typography>
        {notifications.length > 0 && <Badge count={notifications.length} />}
      </Box>
      <Box sx={{ marginTop: 2 }}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Box key={notification.id} sx={{ paddingY: 1 }}>
              <Typography variant="body2">{notification.message}</Typography>
              {index < notifications.length - 1 && <Divider sx={{ marginY: 1 }} />}
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nenhuma notificação no momento.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default NotificationPanel;
