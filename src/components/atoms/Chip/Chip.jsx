// src/components/atoms/Chip/Chip.jsx
import React from 'react';
import { Chip as MuiChip } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const Chip = ({ label, color = 'primary', theme, ...props }) => {
  return (
    <MuiChip
      label={label}
      {...props}
      sx={{
        backgroundColor: theme.palette[color]?.main || theme.palette.primary.main,
        color: theme.palette[color]?.contrastText || theme.palette.primary.contrastText,
        fontWeight: theme.typography.button.fontWeight,
        borderRadius: theme.shape.borderRadius,
      }}
    />
  );
};

export default withThemeStyle(Chip);
