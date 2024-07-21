import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './index';
import BusList from './BusList';
import BusDetails from './BusDetails';
import Contact from './Contact';
import Help from './Help';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BusList" component={BusList} />
      <Stack.Screen name="BusDetails" component={BusDetails} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={StackNavigator} />
        <Drawer.Screen name="Contact" component={Contact} />
        <Drawer.Screen name="Help" component={Help} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
