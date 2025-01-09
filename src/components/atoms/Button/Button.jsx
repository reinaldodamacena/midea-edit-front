// src/components/atoms/Button/Button.jsx
import React from 'react';
import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Button = ({ children, button, ...props }) => {
  // "button" não será repassada ao StyledButton
  // pois a removemos do ...props
  // Se precisar usar "button" internamente, você pode logicar aqui
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
