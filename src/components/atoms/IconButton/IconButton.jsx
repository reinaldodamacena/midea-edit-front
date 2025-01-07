// src/components/atoms/IconButton/IconButton.jsx
import React from 'react';
import { IconButton as MuiIconButton } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const IconButton = ({ children, size = 'medium', theme, ...props }) => {
  return (
    <MuiIconButton
      {...props}
      sx={{
        color: theme?.palette?.text?.primary || 'inherit',
        '&:hover': {
          backgroundColor: theme?.palette?.action?.hover || 'rgba(0, 0, 0, 0.04)',
        },
        ...props.sx,
      }}
      size={size}
    >
      {children}
    </MuiIconButton>
  );
};

export default withThemeStyle(IconButton);
