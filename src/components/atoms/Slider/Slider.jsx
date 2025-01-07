// src/components/atoms/Slider/Slider.jsx
import React from 'react';
import { Slider as MuiSlider } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const Slider = ({ value, min = 0, max = 100, step = 1, onChange, theme, ...props }) => {
  return (
    <MuiSlider
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      sx={{
        color: theme.palette.primary.main,
        '& .MuiSlider-thumb': {
          backgroundColor: theme.palette.primary.contrastText,
        },
        '& .MuiSlider-track': {
          backgroundColor: theme.palette.primary.main,
        },
      }}
      {...props}
    />
  );
};

export default withThemeStyle(Slider);
