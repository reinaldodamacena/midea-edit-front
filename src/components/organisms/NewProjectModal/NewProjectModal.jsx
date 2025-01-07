import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  CircularProgress,
} from '@mui/material';
import TextField from '../../atoms/TextField/TextField';
import Select from '../../atoms/Select/Select';
import Button from '../../atoms/Button/Button';

const NewProjectModal = ({ open, onClose, onCreate }) => {
  const navigate = useNavigate(); // Hook para redirecionamento

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [mediaDirectory, setMediaDirectory] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [directories, setDirectories] = useState([]);
  const [loadingDirectories, setLoadingDirectories] = useState(false);

  const vehicles = [
    { value: 'TV', label: 'Televisão' },
    { value: 'Radio', label: 'Rádio' },
    { value: 'Internet', label: 'Internet' },
  ];

  const isFormValid = projectName && mediaDirectory && vehicle;

  // Simulação de dados para diretórios
  useEffect(() => {
    const fetchMockDirectories = async () => {
      setLoadingDirectories(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDirectories([
        { value: 'folder1', label: 'Pasta 1' },
        { value: 'folder2', label: 'Pasta 2' },
        { value: 'folder3', label: 'Pasta 3' },
      ]);
      setLoadingDirectories(false);
    };

    if (open) {
      fetchMockDirectories();
    }
  }, [open]);

  const handleCreate = () => {
    const newProject = {
      title: projectName,
      description: projectDescription,
      mediaDirectory,
      vehicle,
    };

    onCreate(newProject);

    // Redireciona para a página do projeto
    navigate(`/project/${projectName.replace(/\s+/g, '-').toLowerCase()}`);

    // Limpa os campos e fecha o modal
    setProjectName('');
    setProjectDescription('');
    setMediaDirectory('');
    setVehicle('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Criar Novo Projeto</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nome do Projeto"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            error={!projectName && open}
            helperText={!projectName && open ? 'O nome do projeto é obrigatório.' : ''}
          />
          <TextField
            label="Descrição do Projeto"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            multiline
            rows={3}
          />
          {loadingDirectories ? (
            <CircularProgress size={24} />
          ) : (
            <Select
              label="Diretório das Mídias"
              value={mediaDirectory}
              onChange={(e) => setMediaDirectory(e.target.value)}
              options={directories}
              required
              error={!mediaDirectory && open}
              helperText={!mediaDirectory && open ? 'O diretório das mídias é obrigatório.' : ''}
            />
          )}
          <Select
            label="Veículo"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            options={vehicles}
            required
            error={!vehicle && open}
            helperText={!vehicle && open ? 'O veículo é obrigatório.' : ''}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          sx={{ marginRight: 2 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          color="primary"
          disabled={!isFormValid}
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewProjectModal;
