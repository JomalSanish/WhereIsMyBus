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
    const fetchData = async () => {
      try {
        const [locationStatus, stopDetailsResponse] = await Promise.all([
          Location.requestForegroundPermissionsAsync(),
          fetch(`https://wimb-server.onrender.com/bus-details?busName=${bus.busName}`)
        ]);
  
        if (locationStatus.status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }
  
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
  
        const busData = await stopDetailsResponse.json();
        setBusLocation(busData.location);
  
        const stopDetailsPromises = bus.stops.map(async (stop) => {
          const response = await fetch(`https://wimb-server.onrender.com/bus-stops?query=${stop.name}`);
          const data = await response.json();
          return data[0] || {}; // Return the first matching stop
        });
  
        const results = await Promise.all(stopDetailsPromises);
        setStopDetails(results);
  
        // Determine stop statuses
        const statuses = results.map((stop) => ({
          ...stop,
          status: getStopStatus(busData.location, stop.location),
        }));
        setStopStatuses(statuses);
  
        // Find nearest stop
        findNearestStop(results, {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
  
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch bus or stop data.');
      }
    };
  
    fetchData();
  }, [bus.busName]);
  

  const getDistance = (loc1, loc2) => {
    if (!loc2) return Infinity;
    const toRadian = (angle) => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);
    const R = 6371; // Earth radius in km
  
    const dLat = distance(loc2.latitude, loc1.latitude);
    const dLon = distance(loc2.longitude, loc1.longitude);
  
    const lat1 = toRadian(loc1.latitude);
    const lat2 = toRadian(loc2.latitude);
  
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  };
  
  const getStopStatus = (busLocation, stopLocation) => {
    if (!stopLocation || !busLocation) return 'Not Reached';
    const distance = getDistance(busLocation, stopLocation);
    return distance < 0.1 ? 'Reached' : 'Not Reached';
  };

  const findNearestStop = (stops, currentLocation) => {
    let nearest = null;
    let minDistance = Infinity;
    for (const stop of stops) {
      const distance = getDistance(currentLocation, stop.location);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = stop;
      }
    }
    setNearestStop(nearest);
  };

  useEffect(() => {
    if (busLocation && stopDetails.length > 0) {
      const statuses = stopDetails.map((stop) => ({
        ...stop,
        status: getStopStatus(busLocation, stop.location),
      }));
      setStopStatuses(statuses);
    }
  }, [busLocation, stopDetails]);
  

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
