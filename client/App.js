import React from 'react';
import AppNavigator from './routes/HomeStack';
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  
  return (
    <NavigationContainer>
      <AppNavigator headerMode="none"/>
    </NavigationContainer>
  );
}
