import React from 'react';
import { SvgIcon } from '@mui/material';
import * as Icons from '@mui/icons-material'; // Importa todos os ícones dinamicamente
import withThemeStyle from '../../../utils/withThemeStyle';

const Icon = ({ name, size = 24, theme, ...props }) => {
  const MaterialIcon = Icons[name] || Icons.HelpOutline; // Fallback para ícone padrão

  return (
    <SvgIcon
      {...props}
      component={MaterialIcon}
      sx={{
        fontSize: size,
        color: theme?.palette?.text?.primary || '#000',
      }}
      aria-hidden="true" // Marca como decorativo
    />
  );
};

export default withThemeStyle(Icon);
