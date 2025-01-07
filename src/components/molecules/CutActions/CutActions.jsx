// src/components/molecules/CutActions/CutActions.jsx
import React from 'react';
import { Box } from '@mui/material';
import IconButton from '../../atoms/IconButton/IconButton';
import Icon from '../../atoms/Icon/Icon';

const CutActions = ({ onEdit, onWatch, onDelete }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <IconButton onClick={onWatch}>
        <Icon name="play_circle" />
      </IconButton>
      <IconButton onClick={onEdit}>
        <Icon name="edit" />
      </IconButton>
      <IconButton onClick={onDelete}>
        <Icon name="delete" />
      </IconButton>
    </Box>
  );
};

export default CutActions;
