// src/components/atoms/ProgressBar/ProgressBar.jsx
import React from 'react';
import { LinearProgress } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const ProgressBar = ({ value, theme, ...props }) => {
  return (
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        backgroundColor: theme.palette.background.paper,
        '& .MuiLinearProgress-bar': {
          backgroundColor: theme.palette.primary.main,
        },
      }}
      {...props}
    />
  );
};

export default withThemeStyle(ProgressBar);
