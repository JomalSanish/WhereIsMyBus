import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, Button, Linking } from 'react-native';
import { useRoute, useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import { darkTheme } from './styles';
import SwapIcondark from '@/assets/Svg/SwapIcon(Dark)';

export default function BusDetails() {
  const route = useRoute();
  const { bus } = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [stopDetails, setStopDetails] = useState([]);
  const [nearestStop, setNearestStop] = useState(null);
  const [stopStatuses, setStopStatuses] = useState([]);
  const [busLocation, setBusLocation] = useState(null); // New state to store bus location
  const [timerout,settimerout] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused)
    {
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

      // Fetch bus location
      const fetchBusLocation = async () => {
        try {
          const response = await fetch(`https://modest-rare-pegasus.ngrok-free.app/bus-details?busName=${bus.busName}`);
          const busData = await response.json();
          setBusLocation(busData.location); // Store the bus location
        } catch (error) {
          console.error('Error fetching bus location:', error);
          Alert.alert('Error', 'Failed to fetch bus location.');
        }
      };

      // Fetch stop details and update statuses
      const fetchStopDetails = async () => {
        try {
          const stopDetailsPromises = bus.stops.map(async (stop) => {
            const response = await fetch(`https://modest-rare-pegasus.ngrok-free.app/bus-stops?query=${stop.name}`);
            const data = await response.json();
            return data[0] || {}; // Return the first matching stop
          });

          const results = await Promise.all(stopDetailsPromises);
          setStopDetails(results);

          // Find the nearest stop
          let nearest = null;
          let minDistance = Infinity;
          for (const stop of results) {
            const distance = getDistance(currentLocation, stop.location);
            if (distance < minDistance) {
              minDistance = distance;
              nearest = stop;
            }
          }
          setNearestStop(nearest);

          // Determine stop statuses
          const statuses = results.map((stop) => ({
            ...stop,
            status: getStopStatus(busLocation, stop.location), // Pass busLocation instead of currentLocation
          }));
          setStopStatuses(statuses);
        } catch (error) {
          console.error('Error fetching stop details:', error);
          Alert.alert('Error', 'Failed to fetch stop details.');
        }
      };
      await fetchBusLocation(); // Ensure the bus location is fetched before fetching stop details
      await fetchStopDetails();
    })();
  }
    const timeoutId = setTimeout(() => {
      settimerout(!timerout);
    }, 2000);
  }, [timerout, useIsFocused]);

  const getDistance = (loc1, loc2) => {
    if (!loc2) return Infinity; // Return a large distance if location is not found
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

  const getStopStatus = (busLocation, stopLocation) => {
    if (!stopLocation || !busLocation) return 'Not Reached';
    const distance = getDistance(busLocation, stopLocation);
    // Adjust the distance threshold as needed
    return distance < 0.1 ? 'Reached' : 'Not Reached';
  };

  const handlePress = () => {
    if (nearestStop) {
      Linking.openURL(`https://maps.google.com/?q=${nearestStop.location.latitude},${nearestStop.location.longitude}`);
    } else {
      Alert.alert('Error', 'No nearest stop found.');
    }
  };

  if (!currentLocation) {
    return (
      <View style={darkTheme.container}>
        <Text style={darkTheme.text}>Fetching current location...</Text>
      </View>
    );
  }

  return (
    <View style={darkTheme.container}>
      <Text style={darkTheme.title}>{bus.busName}</Text>
      <FlatList
        data={stopStatuses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.stopItem}>
            <Text style={darkTheme.text}>{item.name}</Text>
            <Text style={styles.status}>{item.status}</Text>
            {item.status === 'Reached' && (
              <SwapIcondark/>
            )}
          </View>
        )}
      />
      <Button title={"Show Nearest Stop"} color="#148f57" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#148f57',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  status: {
    marginLeft: 10,
    color: '#ffffff',
    fontStyle: 'italic',
  },
});
