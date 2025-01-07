// src/components/atoms/Checkbox/Checkbox.jsx
import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const Checkbox = ({ label, checked, onChange, theme, ...props }) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          onChange={onChange}
          sx={{
            color: theme.palette.primary.main,
            '&.Mui-checked': { color: theme.palette.primary.main },
          }}
          {...props}
        />
      }
      label={label}
    />
  );
};

export default withThemeStyle(Checkbox);
