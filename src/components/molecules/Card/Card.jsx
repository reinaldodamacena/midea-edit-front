// src/components/molecules/Card/Card.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import Divider from '../../atoms/Divider/Divider';
import Button from '../../atoms/Button/Button';

const Card = ({ title, description, onAction, actionLabel }) => {
  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        padding: 2,
        backgroundColor: 'background.paper',
        boxShadow: 1,
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Divider />
      <Typography variant="body2" color="text.secondary" mb={2}>
        {description}
      </Typography>
      <Button onClick={onAction}>{actionLabel}</Button>
    </Box>
  );
};

export default Card;
