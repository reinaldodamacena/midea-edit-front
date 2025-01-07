// src/components/organisms/Sidebar/Sidebar.jsx
import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import Icon from '../../atoms/Icon/Icon';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', label: 'Dashboard', link: '/dashboard' },
    { name: 'UploadFile', label: 'Upload', link: '/upload' },
    { name: 'Settings', label: 'Configurações', link: '/settings' },
    { name: 'Logout', label: 'Sair', link: '/logout' }, // Exemplo de item adicional
  ];

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
        backgroundColor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button component={Link} to={item.link} key={index}>
              <ListItemIcon>
                <Icon name={item.name} size={24} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Box>
  );
};

export default Sidebar;
