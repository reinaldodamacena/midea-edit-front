// src/components/atoms/Title/Title.jsx
import React from 'react';
import { Typography } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const Title = ({ children, variant = 'h1', align = 'left', theme, ...props }) => {
  return (
    <Typography
      variant={variant}
      align={align}
      {...props}
      sx={{
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(2),
      }}
    >
      {children}
    </Typography>
  );
};

export default withThemeStyle(Title);
