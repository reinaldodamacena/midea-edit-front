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
          fontSize: '0.75rem',
          fontWeight: 'bold',
          minWidth: '20px',
          height: '20px',
        },
      }}
      {...props}
      aria-label={`Você tem ${count} notificações`}
    >
      {children}
    </MuiBadge>
  );
};

export default withThemeStyle(Badge);
