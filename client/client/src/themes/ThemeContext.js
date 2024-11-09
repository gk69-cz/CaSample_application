import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create Context for Theme
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light'); // Default theme

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === 'light' && {
        primary: {
          main: '#1976d2', // Light theme primary color
        },
        background: {
          default: '#ffffff',
        },
      }),
      ...(themeMode === 'dark' && {
        primary: {
          main: '#90caf9', // Dark theme primary color
        },
        background: {
          default: '#121212', // Dark background color
        },
      }),
    },
  });

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
