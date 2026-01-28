import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { materialTheme } from './materialTheme';

interface MaterialThemeWrapperProps {
  children: React.ReactNode;
}

// This wrapper filters out Figma's internal data attributes before passing to ThemeProvider
export function MaterialThemeWrapper({ children }: MaterialThemeWrapperProps) {
  // Only accept children prop, ignore all other props from Figma
  return (
    <ThemeProvider theme={materialTheme}>
      {children}
    </ThemeProvider>
  );
}