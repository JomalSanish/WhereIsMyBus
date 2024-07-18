import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Index from './index';
import BusList from './BusList';
import BusDetails from './BusDetails';
import Login from './Login';
import Help from './Help';
import Contact from './Contact';
import { drawerStyles } from './styles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="BusList" component={BusList} />
      <Stack.Screen name="BusDetails" component={BusDetails} />
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        )}
        screenOptions={{
          drawerStyle: drawerStyles.drawerContent,
          drawerLabelStyle: drawerStyles.drawerText,
        }}
      >
        <Drawer.Screen name="Home" component={MainStack} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Help" component={Help} />
        <Drawer.Screen name="Contact" component={Contact} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
