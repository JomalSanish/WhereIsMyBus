
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Finalstack from './Finalstack';
import { useFonts } from 'expo-font';
import { View, Dimensions} from "react-native";
import * as Animatable from 'react-native-animatable';


Animatable.initializeRegistryWithDefinitions({
  zoomout: {
      from: { 
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height, 
        opacity: 1,
        borderRadius: 0,
    },
      to: { 
        width: 50,
        height: 50,
        opacity: 0.25,
        borderRadius: 1000, 
    },
  },
  mybounce: {
    0: {
      opacity: 0,
      scale: 0.3,
    },
    0.085: {
      scale: 1.1,
    },
    0.17: {
      scale: 0.9,
    },
    0.255: {
      opacity: 1,
      scale: 1.03,
    },
    0.34: {
      scale: 0.97,
    },
    0.425: {
      opacity: 1,
      scale: 1,
    },    //Bounce IN
    0.66: {
      opacity: 1,
      scale: 1,
    },
    0.745: {
      scale: 0.9,
    },
    0.83: {
      opacity: 1,
      scale: 1.11,
    },
    0.915: {
      scale: 1.11,
    },
    1: {
      opacity: 0,
      scale: 0.3,
    },    //Bounce Out
  }
});


const Stack = createStackNavigator();

export default function main(){

  const [ots,setots] = useState(true);

  const [fontsloaded, fonterro] = useFonts({
    'londrinasolid': require('../assets/fonts/LondrinaSolid-Light.ttf')
  });

  useEffect(() =>{
    setTimeout(() =>{
        setots(false);
    },2500)
},[]);

  return(
    <>
    {ots && (<View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: "absolute"}}>
      <Animatable.View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#148f57', zIndex: 10, position: "absolute"}} duration={500} animation={'zoomout'} delay={2000}>
          <Animatable.Image source={require('../assets/images/Frame 2 4.png')} style={{width: 95, height: 95}} duration={2500} animation={'mybounce'}/>
          <Animatable.Text style={{color: 'white', fontSize: 27, top: 5,fontFamily: 'londrinasolid'}} duration={2500} animation={'mybounce'}>Where's My Bus</Animatable.Text>
      </Animatable.View>
      </View>)}
    <Finalstack/>
    </>
  );
}



