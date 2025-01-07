// src/components/atoms/Badge/Badge.jsx
import React from 'react';
import { Badge as MuiBadge } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const Badge = ({ children, count, theme, ...props }) => {
  return (
    <MuiBadge
      badgeContent={count}
      color="primary"
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        },
      }}
      {...props}
    >
      {children}
    </MuiBadge>
  );
};

export default withThemeStyle(Badge);
