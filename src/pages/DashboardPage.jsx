// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import DashboardTemplate from '../components/templates/DashboardTemplate/DashboardTemplate';
import NewProjectModal from '../components/organisms/NewProjectModal/NewProjectModal';

const DashboardPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Projeto 1', description: 'Descrição do projeto 1', status: 'Ativo' },
    { id: 2, title: 'Projeto 2', description: 'Descrição do projeto 2', status: 'Concluído' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query) => {
    console.log('Buscando projetos com:', query);
  };

  const handleFilterChange = (filterName, value) => {
    console.log(`Filtro alterado: ${filterName} -> ${value}`);
  };

  const handleProjectSelect = (id) => {
    console.log('Projeto selecionado:', id);
  };

  const handleNewProject = () => {
    setIsModalOpen(true);
  };

  const handleCreateProject = (newProject) => {
    const newId = projects.length + 1;
    setProjects([...projects, { id: newId, ...newProject }]);
    console.log('Novo projeto criado:', newProject);
  };

  return (
    <>
      <DashboardTemplate
        projects={projects}
        filters={[{ name: 'status', label: 'Status', options: ['Ativo', 'Concluído', 'Pendente'] }]}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onProjectSelect={handleProjectSelect}
        onNewProject={handleNewProject}
      />
      <NewProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </>
  );
};

export default DashboardPage;
