import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProjectsProvider } from './src/context/ProjectsContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProjectsProvider>
        <AppNavigator />
        <StatusBar style="dark" />
      </ProjectsProvider>
    </SafeAreaProvider>
  );
}
