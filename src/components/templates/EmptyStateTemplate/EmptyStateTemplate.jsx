// src/components/templates/EmptyStateTemplate/EmptyStateTemplate.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import Icon from '../../atoms/Icon/Icon';
import Button from '../../atoms/Button/Button';

const EmptyStateTemplate = ({ icon, title, message, actionLabel, onAction }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Icon>{icon}</Icon>
      <Typography variant="h5" mt={2} mb={1}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        {message}
      </Typography>
      {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
    </Box>
  );
};

export default EmptyStateTemplate;
