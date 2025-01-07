// src/components/templates/AuthTemplate/AuthTemplate.jsx
import React, { useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import TextField from '../../atoms/TextField/TextField';
import Button from '../../atoms/Button/Button';

const AuthTemplate = ({ title = "Login", onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setError(null);
    onSubmit({ email, password }); // Passa os dados para o manipulador de envio
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      padding={4}
      sx={{
        backgroundImage: 'url(/auth-background.jpg)', // Você pode usar uma imagem de fundo
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'background.paper',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography variant="h4" align="center" mb={4} color="text.primary">
          {title}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          fullWidth
          margin="dense"
        />
        <TextField
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          fullWidth
          margin="dense"
        />

        <Button
          onClick={handleSubmit}
          fullWidth
          disabled={!email || !password} // Botão desativado até os campos serem preenchidos
          sx={{
            marginTop: 3,
          }}
        >
          Entrar
        </Button>

        <Typography
          variant="body2"
          align="center"
          mt={2}
          color="text.secondary"
          sx={{
            cursor: 'pointer',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          Esqueceu sua senha?
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthTemplate;
