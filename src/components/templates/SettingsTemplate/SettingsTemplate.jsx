// src/components/templates/SettingsTemplate/SettingsTemplate.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import ListItem from '../../molecules/ListItem/ListItem';

const SettingsTemplate = ({ settings, onToggleSetting }) => {
  return (
    <Box padding={4}>
      <Typography variant="h4" mb={4}>
        Configurações
      </Typography>
      {settings.map((setting) => (
        <ListItem
          key={setting.name}
          icon={setting.icon}
          text={setting.label}
          actionLabel={setting.value ? 'Ativado' : 'Desativado'}
          onAction={() => onToggleSetting(setting.name)}
        />
      ))}
    </Box>
  );
};

export default SettingsTemplate;
