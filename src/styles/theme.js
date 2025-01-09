// src/theme/index.js

import { createTheme } from '@mui/material/styles';

// === TOKENS E BASE COMPARTILHADA ===
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
    borderRadius: 8, // Ligeiramente menos arredondado que antes
  },
  // spacing original
  spacing: (factor) => `${0.25 * factor}rem`,
};

// === PALETTES DE CORES INSPIRADAS NO ADOBE PREMIERE ===
// Adicionei roxos profundos + rosas para realçar real “Premiere”
const palettes = {
  light: {
    mode: 'light',
    primary: { main: '#7E57C2', contrastText: '#FFFFFF' },  // Roxo claro
    secondary: { main: '#EC407A', contrastText: '#FFFFFF' }, // Rosa
    background: { default: '#F3F3F3', paper: '#FFFFFF' },
    text: { primary: '#2D2D2D', secondary: '#757575' },
    success: { main: '#66BB6A', contrastText: '#FFFFFF' },
    warning: { main: '#FFA726', contrastText: '#FFFFFF' },
    error: { main: '#EF5350', contrastText: '#FFFFFF' },
    divider: '#E0E0E0',
  },
  dark: {
    mode: 'dark',
    // Roxo-escuro
    primary: { main: '#8E24AA', contrastText: '#FFFFFF' },
    // Rosa-escuro
    secondary: { main: '#D81B60', contrastText: '#FFFFFF' },
    // Fundos bem escuros
    background: {
      default: '#1E1E1E', // Fundo principal
      paper: '#2A2A2A',   // Painéis / Cards
    },
    text: {
      primary: '#ECECEC',
      secondary: '#B9B9B9',
      disabled: '#7A7A7A',
    },
    success: { main: '#81C784', contrastText: '#000000' },
    warning: { main: '#FFB74D', contrastText: '#000000' },
    error: { main: '#E57373', contrastText: '#000000' },
    divider: '#424242',
  },
};

// === SOMBRAS COM ESTILO MAIS MARCANTE ===
const defaultShadows = [
  'none',
  '0px 1px 3px rgba(0,0,0,0.15)',
  '0px 3px 6px rgba(0,0,0,0.25)',
  '0px 5px 15px rgba(0,0,0,0.3)',
  '0px 8px 24px rgba(0,0,0,0.35)',
];

// === OVERRIDES DE COMPONENTES (Global e Material UI) ===
const componentOverrides = (theme) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2, 4),
        fontWeight: theme.typography.button.fontWeight,
        textTransform: 'capitalize',
        boxShadow: defaultShadows[1],
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
          boxShadow: defaultShadows[2],
        },
        '&:disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        boxShadow: defaultShadows[2],
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: defaultShadows[3],
        },
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        margin: theme.spacing(1, 0),
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: defaultShadows[1],
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
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none', // Remove background “paper” pattern
      },
    },
  },

  // [NOVO] Adicionando estilos globais via MuiCssBaseline, incluindo scrollbars
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        // FOR WEBKIT SCROLLBARS
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.default,
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.primary.dark,
          borderRadius: '4px',
          border: `1px solid ${theme.palette.background.paper}`,
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.primary.main,
        },

        // SCROLLBAR FIREFOX
        scrollbarWidth: 'thin',
        scrollbarColor: `${theme.palette.primary.dark} ${theme.palette.background.default}`,

        // Exemplo de estilo global
        margin: 0,
        padding: 0,
        // Cor de fundo do body, se quiser forçar igual ao theme
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        // Suaviza o texto
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      // Opcionalmente, style global para a .MuiTypography-root se quiser
      '*': {
        boxSizing: 'border-box',
      },
    },
  },
});

// === TIPOGRAFIA RESPONSIVA ===
const responsiveTypography = {
  h1: {
    fontSize: '2.5rem',
    '@media (max-width:600px)': {
      fontSize: '2rem',
    },
  },
  h2: {
    fontSize: '2rem',
    '@media (max-width:600px)': {
      fontSize: '1.75rem',
    },
  },
  body1: {
    fontSize: '1rem',
    '@media (max-width:600px)': {
      fontSize: '0.875rem',
    },
  },
  body2: {
    fontSize: '0.875rem',
    '@media (max-width:600px)': {
      fontSize: '0.75rem',
    },
  },
};

// === FUNÇÃO PARA GERAR O TEMA ===
export const getTheme = (mode = 'dark') => {
  const palette = mode === 'dark' ? palettes.dark : palettes.light;

  // Criar tema base
  const baseTheme = createTheme({
    palette,
    typography: {
      ...sharedTokens.typography,
      ...responsiveTypography,
    },
    shape: sharedTokens.shape,
    spacing: sharedTokens.spacing,
    shadows: defaultShadows,
  });

  // Mesclar com overrides de componentes
  return createTheme(baseTheme, {
    components: componentOverrides(baseTheme),
  });
};
