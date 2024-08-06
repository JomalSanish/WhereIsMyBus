import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const DeveloperScreen = () => {
  const [stopName, setStopName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const addStop = () => {
    if (stopName.trim() === '' || latitude.trim() === '' || longitude.trim() === '') {
      alert('Please fill out all fields');
      return;
    }

    axios.post('http://192.168.15.130:3000/add-stop', {
      name: stopName,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    })
    .then(response => {
      alert('Stop added successfully');
      setStopName('');
      setLatitude('');
      setLongitude('');
    })
    .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text>Add a New Bus Stop</Text>
      <TextInput
        style={styles.input}
        placeholder="Stop Name"
        value={stopName}
        onChangeText={setStopName}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />
      <Button title="Add" onPress={addStop} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
});

export default DeveloperScreen;