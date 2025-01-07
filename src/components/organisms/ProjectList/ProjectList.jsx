// src/components/organisms/ProjectList/ProjectList.jsx
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Card from '../../molecules/Card/Card';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';

const ProjectList = ({ projects, onProjectSelect, isLoading }) => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Exibição de Estado de Carregamento */}
      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <LoadingSpinner size={50} />
        </Box>
      )}

      {/* Exibição de Estado Vazio */}
      {!isLoading && projects.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          flexDirection="column"
          sx={{
            color: 'text.primary', // Garantindo que a cor use o contraste do tema
            textAlign: 'center', // Centralizando o texto
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Nenhum projeto encontrado
          </Typography>
          <Typography variant="body2">
            Adicione um novo projeto para começar!
          </Typography>
        </Box>
      )}


      {/* Lista de Projetos */}
      {!isLoading && projects.length > 0 && (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
              <Card
                title={project.title}
                description={project.description}
                actionLabel="Abrir"
                onAction={() => onProjectSelect(project.id)}
                sx={{
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProjectList;
