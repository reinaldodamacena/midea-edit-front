import React from 'react';
import { Box } from '@mui/material';
import TextField from '../../atoms/TextField/TextField';
import Button from '../../atoms/Button/Button';

const SearchBar = ({ value, onChange, onSearch, placeholder = 'Digite sua busca...', sx = {} }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{
        width: '100%',
        ...sx,
      }}
    >
      <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}     
        fullWidth
        aria-label="Campo de busca"
      />
      <Button
        onClick={onSearch}
        variant="contained"
        color="primary"
        aria-label="Botão de pesquisar"
      >
        Pesquisar
      </Button>
    </Box>
  );
};

export default SearchBar;

       
