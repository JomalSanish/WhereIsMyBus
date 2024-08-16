import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, Button, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { darkTheme } from './styles';

export default function BusDetails() {
  const route = useRoute();
  const { bus } = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearestStop, setNearestStop] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setCurrentLocation(currentLocation);

      // Find the nearest stop
      let nearest = null;
      let minDistance = Infinity;
      for (const stop of bus.stops) {
        const distance = getDistance(currentLocation, stop.location);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = stop.location;
        }
      }
      setNearestStop(nearest);
    })();
  }, [bus]);

  const getDistance = (loc1, loc2) => {
    const toRadian = (angle) => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);
    const R = 6371; // Earth radius in km

    const dLat = distance(loc2.latitude, loc1.latitude);
    const dLon = distance(loc2.longitude, loc1.longitude);

    const lat1 = toRadian(loc1.latitude);
    const lat2 = toRadian(loc2.latitude);

    // Haversine formula
    const a = Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    return R * c;
  };

  if (!currentLocation) {
    return (
      <View style={darkTheme.container}>
        <Text style={darkTheme.text}>Fetching current location...</Text>
      </View>
    );
  }

  const handlepress = () => {
    Linking.openURL("https://maps.google.com/?q=" + nearestStop.latitude + "," + nearestStop.longitude);
  };

  return (
    <View style={darkTheme.container}>
      <Text style={darkTheme.title}>{bus.name} Current Location</Text>
      <FlatList
        data={bus.stops}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.stopItem}>
            <Text style={darkTheme.text}>{item.name}</Text>
            {item.name === bus.stops[bus.stops.length - 1].name && (
              <Image
                source={require('./assets/current-location-icon.png')}
                style={styles.icon}
              />
            )}
          </View>
        )}
      />
      <Button title={"Show Nearest Stop"} color="#00afd6" onPress={handlepress}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#00afd6',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
});
