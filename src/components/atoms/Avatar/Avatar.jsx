// src/components/atoms/Avatar/Avatar.jsx
import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const Avatar = ({ src, alt, size = 40, theme, ...props }) => {
  return (
    <MuiAvatar
      src={src}
      alt={alt}
      {...props}
      sx={{
        width: size,
        height: size,
        backgroundColor: theme.palette.background.paper,
      }}
    />
  );
};

export default withThemeStyle(Avatar);
