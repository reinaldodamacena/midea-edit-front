// src/components/atoms/Alert/Alert.jsx
import React from 'react';
import { Alert as MuiAlert } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const Alert = ({ message, severity = 'info', theme, ...props }) => {
  return (
    <MuiAlert
      severity={severity}
      {...props}
      sx={{
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette[severity]?.main || theme.palette.info.main,
        color: theme.palette[severity]?.contrastText || theme.palette.text.primary,
      }}
    >
      {message}
    </MuiAlert>
  );
};

export default withThemeStyle(Alert);
