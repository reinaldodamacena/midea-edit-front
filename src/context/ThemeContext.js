// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Cria o contexto
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Recupera o tema inicial do localStorage ou define como 'dark'
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'dark');

  // Alterna entre os temas
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Atualiza o localStorage sempre que o tema muda
  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const value = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);
