import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import databaseService from './src/services/database';

export default function App() {
  useEffect(() => {
    // Initialize database when app starts
    databaseService.initialize().catch(console.error);
  }, []);

  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}

