import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Divider from '../../atoms/Divider/Divider';
import IconButton from '../../atoms/IconButton/IconButton';
import Icon from '../../atoms/Icon/Icon';
import { Link } from 'react-router-dom';

const Sidebar = ({ videos, onSelectVideo, onDeleteVideo }) => {
  const menuItems = [
    { name: 'Dashboard', label: 'Dashboard', link: '/dashboard' },
    { name: 'UploadFile', label: 'Upload', link: '/upload' },
    { name: 'Settings', label: 'Configurações', link: '/settings' },
    { name: 'Logout', label: 'Sair', link: '/logout' },
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
      {/* Navegação */}
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

      {/* Lista de Vídeos */}
      <Box>
        <Typography variant="h6" sx={{ marginY: 2 }}>
          Vídeos
        </Typography>
        <List>
          {videos && videos.length > 0 ? (
            videos.map((video, index) => (
              <ListItem
                button
                key={index}
                onClick={() => onSelectVideo(video)}
                sx={{
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <ListItemText primary={video.name} />
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteVideo(video.id);
                  }}
                >
                  <Icon name="Delete" size={20} />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nenhum vídeo disponível
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
