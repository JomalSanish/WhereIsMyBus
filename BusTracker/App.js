import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import DriverScreen from './screens/DriverScreen';
import AdminScreen  from './screens/AdminScreen';
import DeveloperScreen from './screens/DeveloperScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Driver" component={DriverScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Developer" component={DeveloperScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
