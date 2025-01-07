// src/components/atoms/LoadingSpinner/LoadingSpinner.jsx
import React from 'react';
import { CircularProgress } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const LoadingSpinner = ({ size = 40, theme, ...props }) => {
  return <CircularProgress size={size} color="primary" {...props} />;
};

export default withThemeStyle(LoadingSpinner);
