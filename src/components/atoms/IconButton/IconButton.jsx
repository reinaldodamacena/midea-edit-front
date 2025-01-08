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
        transition: 'background-color 0.3s ease', // Suaviza a interação de hover
        ...props.sx,
      }}
      size={size}
    >
      {children}
    </MuiIconButton>
  );
};

export default withThemeStyle(IconButton);
