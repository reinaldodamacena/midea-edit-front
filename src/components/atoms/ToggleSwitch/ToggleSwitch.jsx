// src/components/atoms/ToggleSwitch/ToggleSwitch.jsx
import React from 'react';
import { Switch as MuiSwitch, FormControlLabel } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const ToggleSwitch = ({ label, checked, onChange, theme, ...props }) => {
  return (
    <FormControlLabel
      control={
        <MuiSwitch
          checked={checked}
          onChange={onChange}
          sx={{
            '& .MuiSwitch-thumb': {
              color: theme.palette.primary.main,
            },
            '& .MuiSwitch-track': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
          {...props}
        />
      }
      label={label}
    />
  );
};

export default withThemeStyle(ToggleSwitch);
