// src/components/molecules/ChipGroup/ChipGroup.jsx
import React from 'react';
import { Box } from '@mui/material';
import Chip from '../../atoms/Chip/Chip';

const ChipGroup = ({ items }) => {
  return (
    <Box display="flex" gap={1} flexWrap="wrap">
      {items.map((item, index) => (
        <Chip key={index} label={item.label} color={item.color} />
      ))}
    </Box>
  );
};

export default ChipGroup;
