// src/components/atoms/Divider/Divider.jsx
import React from 'react';
import { Divider as MuiDivider } from '@mui/material';
import withThemeStyle from '../../../utils/withThemeStyle';

const Divider = ({ theme, ...props }) => {
  return (
    <MuiDivider
      {...props}
      sx={{
        backgroundColor: theme.palette.divider,
        margin: theme.spacing(2, 0),
      }}
    />
  );
};

export default withThemeStyle(Divider);
