import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import axios from 'axios';

const DriverScreen = () => {
  const [selectedBus, setSelectedBus] = useState('');
  const [location, setLocation] = useState(null);
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.15.130:3000/buses')
      .then(response => setBuses(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    let interval;
    if (selectedBus) {
      interval = setInterval(() => {
        getLocation();
      }, 15000);
    }
    return () => clearInterval(interval);
  }, [selectedBus]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    axios.post('http://192.168.15.130:3000/update-location', {
      name: selectedBus,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text>Select a Bus</Text>
      <Picker
        selectedValue={selectedBus}
        onValueChange={(itemValue) => setSelectedBus(itemValue)}
        style={styles.picker}
      >
        {buses.map(bus => (
          <Picker.Item key={bus._id} label={bus.name} value={bus.name} />
        ))}
      </Picker>
      <Button title="Start" onPress={getLocation} disabled={!selectedBus} />
      {location && (
        <View style={styles.location}>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  picker: {
    height: 50,
    width: 270,
  },
  location: {
    marginTop: 20,
  },
});

export default DriverScreen;

