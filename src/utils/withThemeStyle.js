// src/utils/withThemeStyle.js
import React from 'react';
import { useTheme } from '@mui/material';

const withThemeStyle = (Component) => (props) => {
  const theme = useTheme();
  return <Component {...props} theme={theme} />;
};

export default withThemeStyle;
