// src/components/atoms/Select/Select.jsx
import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const Select = ({ label, value, options, onChange, ...props }) => {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      margin="dense"
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
