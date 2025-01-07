import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import Title from '../../atoms/Title/Title';
import IconButton from '../../atoms/IconButton/IconButton';
import Icon from '../../atoms/Icon/Icon';

const Header = ({ onSearch, children }) => {
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Título do Dashboard */}
        <Title variant="h6">Dashboard</Title>

        {/* Ações Personalizadas e Botão Novo Projeto */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {children}
          <IconButton onClick={onSearch}>
            <Icon name="search" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
