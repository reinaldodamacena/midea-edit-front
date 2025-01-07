import React from 'react';
import { Box, Grid, Divider } from '@mui/material';
import Header from '../../organisms/Header/Header';
import Sidebar from '../../organisms/Sidebar/Sidebar';
import FilterBar from '../../molecules/FilterBar/FilterBar';
import ProjectList from '../../organisms/ProjectList/ProjectList';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import Button from '../../atoms/Button/Button'; // Usando o átomo Button
import Typography from '../../atoms/Title/Title'; // Usando o átomo Title para tipografia

const DashboardTemplate = ({
    projects,
    filters,
    onFilterChange,
    onSearch,
    onProjectSelect,
    onNewProject,
    isLoading,
}) => {
    return (
        <Grid container>
            {/* Sidebar */}
            <Grid
                item
                xs={12}
                sm={3}
                md={2}
                sx={{
                    height: '100vh',
                    backgroundColor: 'background.paper',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Sidebar />
            </Grid>

            {/* Conteúdo Principal */}
            <Grid
                item
                xs={12}
                sm={9}
                md={10}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                }}
            >
                {/* Header com botão "Novo Projeto" */}
                <Header onSearch={onSearch}>
                    <Button
                        onClick={onNewProject}
                        variant="contained"
                        color="primary"
                        sx={{
                            marginLeft: 2,
                        }}
                    >
                        Novo Projeto
                    </Button>
                </Header>


                {/* Filtro e Lista de Projetos */}
                <Box
                    flex={1}
                    padding={3}
                    bgcolor="background.default"
                    sx={{
                        overflowY: 'auto', // Scroll para conteúdos longos
                    }}
                >
                    <FilterBar filters={filters} onFilterChange={onFilterChange} onSearch={onSearch} />
                    <Divider sx={{ my: 5 }} />

                    {/* Estado de Carregamento ou Lista Vazia */}
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                            <LoadingSpinner size={50} />
                        </Box>
                    ) : projects.length === 0 ? (
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
                            <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary' }}>
                                Nenhum projeto encontrado
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Adicione um novo projeto para começar!
                            </Typography>
                        </Box>
                    ) : (
                        <ProjectList projects={projects} onProjectSelect={onProjectSelect} />
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default DashboardTemplate;
