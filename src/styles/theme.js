// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

// Tokens Globais
const sharedTokens = {
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2 },
    h2: { fontSize: '2rem', fontWeight: 500, lineHeight: 1.3 },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: (factor) => `${0.25 * factor}rem`,
};

// Paletas de Cores Inspiradas no Adobe Premiere
const palettes = {
  light: {
    mode: 'light',
    primary: { main: '#6A1B9A', contrastText: '#FFFFFF' }, // Roxo Adobe Premiere
    secondary: { main: '#0288D1', contrastText: '#FFFFFF' }, // Azul Adobe Premiere
    background: { default: '#EAEAEA', paper: '#FFFFFF' },
    text: { primary: '#333333', secondary: '#666666', disabled: '#BDBDBD' },
    success: { main: '#4CAF50', contrastText: '#FFFFFF' },
    warning: { main: '#FFB300', contrastText: '#FFFFFF' },
    error: { main: '#E53935', contrastText: '#FFFFFF' },
    divider: '#E0E0E0',
  },
  dark: {
    mode: 'dark',
    primary: { main: '#8E24AA', contrastText: '#FFFFFF' }, // Roxo Adobe Premiere
    secondary: { main: '#1976D2', contrastText: '#FFFFFF' }, // Azul Adobe Premiere
    background: { default: '#1E1E1E', paper: '#252525' }, // Preto suave para evitar cansaço visual
    text: { primary: '#FFFFFF', secondary: '#BDBDBD', disabled: '#757575' },
    success: { main: '#81C784', contrastText: '#000000' },
    warning: { main: '#FFB74D', contrastText: '#000000' },
    error: { main: '#E57373', contrastText: '#000000' },
    divider: '#424242',
  },
};

// Sombreamentos Modernos e Suaves
const defaultShadows = [
  'none',
  '0px 1px 3px rgba(0, 0, 0, 0.1)',
  '0px 3px 6px rgba(0, 0, 0, 0.15)',
  '0px 5px 15px rgba(0, 0, 0, 0.2)',
];

// Estilização Global dos Componentes
const componentOverrides = (theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2, 4),
        fontWeight: theme.typography.button.fontWeight,
        textTransform: 'capitalize',
        boxShadow: defaultShadows[1],
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
          boxShadow: defaultShadows[2],
        },
        '&:disabled': {
          backgroundColor: theme.palette.text.disabled,
          color: theme.palette.text.primary,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        boxShadow: defaultShadows[3],
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          boxShadow: defaultShadows[2],
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: defaultShadows[1],
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.divider,
      },
    },
  },
});

// Tipografia Responsiva
const responsiveTypography = {
  h1: { fontSize: '2.5rem', '@media (max-width:600px)': { fontSize: '2rem' } },
  h2: { fontSize: '2rem', '@media (max-width:600px)': { fontSize: '1.75rem' } },
  body1: { fontSize: '1rem', '@media (max-width:600px)': { fontSize: '0.875rem' } },
  body2: { fontSize: '0.875rem', '@media (max-width:600px)': { fontSize: '0.75rem' } },
};

// Função para Gerar o Tema
export const getTheme = (mode) => {
  const palette = mode === 'dark' ? palettes.dark : palettes.light;

  return createTheme({
    palette,
    typography: { ...sharedTokens.typography, ...responsiveTypography },
    shape: sharedTokens.shape,
    spacing: sharedTokens.spacing,
    shadows: defaultShadows,
    components: componentOverrides({
      palette,
      typography: sharedTokens.typography,
      shape: sharedTokens.shape,
      spacing: sharedTokens.spacing,
      shadows: defaultShadows,
    }),
  });
};
