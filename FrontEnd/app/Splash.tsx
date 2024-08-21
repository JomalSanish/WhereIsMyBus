import { useEffect } from "react";
import React from "react";
import { View , Image, StatusBar, Text} from "react-native";
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';
import { ZoomIn } from "react-native-reanimated";

export default function Splash(){

    const [fontsloaded, fonterro] = useFonts({
        'londrinasolid': require('../assets/fonts/LondrinaSolid-Light.ttf')
      });

    useEffect(() =>{
        StatusBar.setBarStyle("light-content", true);
        StatusBar.setBackgroundColor("#121212", true);
      });

    return(
        <View style={{flex: 1, backgroundColor: '#121212'}}>
            <Animatable.View style={{width: '100%', height: '100%', alignItems: 'center', backgroundColor: '#148f57'}} duration={1500} animation={'bounceIn'} direction="alternate-reverse" easing={'ease-in-out-cubic'}>
                <Animatable.Image source={require('../assets/images/Frame 2 4.png')} style={{width: 95, height: 95, top: '40%'}} duration={1500} animation={'bounceIn'}/>
                <Animatable.Text style={{color: 'white', fontSize: 27, top: '41%',fontFamily: 'londrinasolid'}} duration={1500} animation={'bounceInUp'}>Where's My Bus</Animatable.Text>
            </Animatable.View>
        </View>
    );
}