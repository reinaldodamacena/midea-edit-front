import React from 'react';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';

const FilterBar = ({ filters = [], onFilterChange, onSearch }) => {
  return (
    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
      {filters.length > 0 ? (
        filters.map((filter, index) => (
          <TextField
            key={index}
            label={filter.label}
            select
            value={filter.value || ''} // Evita erros de valor não definido
            onChange={(e) => onFilterChange(filter.name, e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            {filter.options.length > 0 ? (
              filter.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Nenhuma opção disponível</MenuItem>
            )}
          </TextField>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          Nenhum filtro disponível.
        </Typography>
      )}
      <Button variant="contained" onClick={onSearch}>
        Buscar
      </Button>
    </Box>
  );
};

export default FilterBar;
