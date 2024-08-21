
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import Drawer from './Drawer';
import Help from './Help';
import Contact from './Contact';
import { useFonts } from 'expo-font';



const Stack = createStackNavigator();

export default function main(){

  const [ots,setots] = useState(true);

  const [fontsloaded, fonterro] = useFonts({
    'londrinasolid': require('../assets/fonts/LondrinaSolid-Light.ttf')
  });

  useEffect(() =>{
    setTimeout(() =>{
        setots(false);
        console.log(setots);
    },1500)
},[]);

  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {ots && (<Stack.Screen name="SplashScreen" component={Splash} />)}
      <Stack.Screen name="Drawer" component={Drawer} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
}

