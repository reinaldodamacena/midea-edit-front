// src/components/atoms/Tooltip/Tooltip.jsx
import React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const Tooltip = ({ title, children, theme, ...props }) => {
  return (
    <MuiTooltip
      title={title}
      {...props}
      sx={{
        tooltip: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: theme.typography.body2.fontSize,
        },
      }}
    >
      {children}
    </MuiTooltip>
  );
};

export default withThemeStyle(Tooltip);
