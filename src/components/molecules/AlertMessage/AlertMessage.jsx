// src/components/molecules/AlertMessage/AlertMessage.jsx
import React from 'react';
import { Box } from '@mui/material';
import Alert from '../../atoms/Alert/Alert';
import Button from '../../atoms/Button/Button';

const AlertMessage = ({ message, severity, actionLabel, onAction }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Alert message={message} severity={severity} />
      {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
    </Box>
  );
};

export default AlertMessage;
