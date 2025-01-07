// src/components/molecules/ListItem/ListItem.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import Icon from '../../atoms/Icon/Icon';
import Button from '../../atoms/Button/Button';

const ListItem = ({ icon, text, actionLabel, onAction }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <Icon>{icon}</Icon>
        <Typography variant="body1">{text}</Typography>
      </Box>
      {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
    </Box>
  );
};

export default ListItem;
