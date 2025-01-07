// src/components/atoms/ButtonGroup/ButtonGroup.jsx
import React from 'react';
import { ButtonGroup as MuiButtonGroup } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const ButtonGroup = ({ children, theme, ...props }) => {
  return (
    <MuiButtonGroup
      sx={{
        '& .MuiButton-root': {
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
      }}
      {...props}
    >
      {children}
    </MuiButtonGroup>
  );
};

export default withThemeStyle(ButtonGroup);
