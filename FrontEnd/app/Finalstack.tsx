import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Drawer from './Drawer';
import Help from './Help';
import Contact from './Contact';

const Stack = createStackNavigator();

export default function Finalstack(){
    return(
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Drawer" component={Drawer} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    );
}