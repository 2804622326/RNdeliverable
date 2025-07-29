// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PointsProvider } from './context/PointsContext';

// The navigation stack/tabs are defined in `navigation/AppNavigator`
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  // Render the full navigator so the app can switch between screens
  return (
    <PointsProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PointsProvider>
  );
}