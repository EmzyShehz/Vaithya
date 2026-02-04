import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { materialTheme } from './materialTheme';

interface MaterialThemeWrapperProps {
  children: React.ReactNode;
  [key: string]: any; // Allow any props but don't pass them through
}

// This wrapper filters out Figma's internal data attributes before passing to ThemeProvider
export function MaterialThemeWrapper({ children, ...rest }: MaterialThemeWrapperProps) {
  // Only pass children to ThemeProvider, filter out all Figma data attributes
  return (
    <ThemeProvider theme={materialTheme}>
      {children}
    </ThemeProvider>
  );
}