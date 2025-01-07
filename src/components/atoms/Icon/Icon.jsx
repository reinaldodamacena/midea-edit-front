// src/components/atoms/Icon/Icon.jsx
import React from 'react';
import { SvgIcon } from '@mui/material';
import * as Icons from '@mui/icons-material'; // Importa todos os ícones dinamicamente
import withThemeStyle from '../../../utils/withThemeStyle';

const Icon = ({ name, size = 24, theme, ...props }) => {
  const MaterialIcon = Icons[name]; // Busca o ícone pelo nome no namespace

  if (!MaterialIcon) {
    console.warn(`Ícone com o nome "${name}" não encontrado em @mui/icons-material.`);
    return null; // Retorna `null` se o ícone não for encontrado
  }

  return (
    <SvgIcon
      {...props}
      component={MaterialIcon}
      sx={{
        fontSize: size,
        color: theme?.palette?.text?.primary || '#000', // Fallback para preto
      }}
    />
  );
};

export default withThemeStyle(Icon);
