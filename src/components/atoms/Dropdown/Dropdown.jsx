// src/components/atoms/Dropdown/Dropdown.jsx
import React from 'react';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const Dropdown = ({ label, value, options, onChange, theme, ...props }) => {
  return (
    <FormControl
      fullWidth
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
      {...props}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        sx={{
          '& .MuiSelect-select': {
            padding: theme.spacing(1),
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default withThemeStyle(Dropdown);
