// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './styles/theme';
import { useThemeContext } from './context/ThemeContext';

// Páginas
import UploadMediaPage from './pages/UploadMediaPage';
import DashboardPage from './pages/DashboardPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import EditPage from './pages/EditPage';

function App() {
  const { mode } = useThemeContext(); // Obtém o modo atual do tema (claro/escuro)
  const theme = getTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/upload" element={<UploadMediaPage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
