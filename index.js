import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../navigation/AppNavigator';

export default function IndexPage() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}