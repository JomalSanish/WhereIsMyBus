import React, { useEffect} from 'react';
import { StatusBar, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './input';
import BusList from './BusList';
import BusDetails from './BusDetails';
import { Dimensions } from 'react-native';
import { darkTheme } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BusList" component={BusList} />
        <Stack.Screen name="BusDetails" component={BusDetails} />
      </Stack.Navigator>
  );
}

export default function AppNavigator() {

  const [fontsloaded, fonterro] = useFonts({
    'londrinasolid': require('../assets/fonts/LondrinaSolid-Light.ttf')
  });

  const navigation = useNavigation();

  useEffect(() =>{
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor("#121212", true);
  });

  const CustomDrawer = props => {
    return (
      <View>
        <View style={{height: '17%', backgroundColor: '#121212', padding: 40}}>
          <Image source={require('../assets/images/Frame 2 4.png')} style={{width: 95, height: 95, top: -7, right: 10}}/>
          <Text style={styles.drawermenuhe}>Where's My Bus</Text>
        </View>
        <View style={{height: '100%', backgroundColor: '#148f57', paddingHorizontal: 16}}>
          <TouchableOpacity style={{padding: 20}} onPress={() => navigation.navigate('Help')}>
            <Image source={require('../assets/images/information.png')} style={darkTheme.drawermenuic}/>
            <Text style={styles.drawermenust}>More Information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 20}} onPress={() => navigation.navigate('Contact')}>
          <Image source={require('../assets/images/envelope.png')} style={darkTheme.drawermenuic}/>
            <Text style={styles.drawermenust}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 20}}>
          <Image source={require('../assets/images/download.png')} style={darkTheme.drawermenuic}/>
            <Text style={styles.drawermenust}>Update Apk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 20}}>
          <Image source={require('../assets/images/settings.png')} style={darkTheme.drawermenuic}/>
            <Text style={styles.drawermenust}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 20}}>
          <Image source={require('../assets/images/favorites.png')} style={darkTheme.drawermenuic}/>
            <Text style={styles.drawermenust}>Rate App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 20}}>
          <Image source={require('../assets/images/flag.png')} style={darkTheme.drawermenuic}/>
            <Text style={styles.drawermenust}>More About College</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (

    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{drawerStyle:{width: Dimensions.get('window').width}}}>
      <Drawer.Screen name="HomeD" component={StackNavigator} options={{title: "Where's My Bus", headerStyle: {backgroundColor: "#121212"},headerTintColor: 'white'}} />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  drawermenust: {
    textAlign: 'left', 
    color: 'white', 
    fontSize: 20,
    fontFamily: 'londrinasolid',
    left: 30,
  },
  drawermenuhe: {
    textAlign: 'right',  
    fontFamily: 'londrinasolid',
    color: 'white', 
    fontSize: 37, 
    top: -70,  
  },
});