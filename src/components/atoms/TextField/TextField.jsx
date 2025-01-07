// src/components/atoms/TextField/TextField.jsx
import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const TextField = ({ label, theme, ...props }) => {
  return (
    <MuiTextField
      label={label}
      {...props}
      sx={{
        marginBottom: theme.spacing(2),
        '& .MuiInputBase-root': {
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
        },
        '& .MuiInputLabel-root': {
          color: theme.palette.text.secondary,
        },
      }}
    />
  );
};

export default withThemeStyle(TextField);
