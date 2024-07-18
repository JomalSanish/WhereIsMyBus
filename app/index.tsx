import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fuse from 'fuse.js';
import { darkTheme } from './styles';

const locations = [
  { name: 'Todupuzha', coordinates: { latitude: 9.904830930076447, longitude: 76.7053957876071 } },
  { name: 'Muvattupuzha', coordinates: { latitude: 9.988181678408138, longitude: 76.57284398888918 } },
  { name: 'Puthenkurish', coordinates: { latitude: 9.976759294723937, longitude: 76.41179573957362 } },
  { name: 'Thrippunithura', coordinates: { latitude: 9.95017586201997, longitude: 76.3484459302907 } },
  { name: 'Vyttila', coordinates: { latitude: 9.968573001644026, longitude: 76.31655315755961 } },
];

const fuse = new Fuse(locations, {
  keys: ['name'],
  threshold: 0.25, // Adjusted typo tolerance to 25%
});

export default function Index() {
  const navigation = useNavigation();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSearch = () => {
    const fromResults = fuse.search(from);
    const toResults = fuse.search(to);

    if (fromResults.length > 0 && toResults.length > 0) {
      navigation.navigate('BusList', { from: fromResults[0].item.name, to: toResults[0].item.name });
    } else {
      Alert.alert(
        'Location Not Found',
        'One or both of the locations entered are not found. Please check the location names and try again.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="From"
        placeholderTextColor="#BB86FC"
        value={from}
        onChangeText={setFrom}
      />
      <TextInput
        style={styles.input}
        placeholder="To"
        placeholderTextColor="#BB86FC"
        value={to}
        onChangeText={setTo}
      />
      <Button title="Search" color="#BB86FC" onPress={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    backgroundColor: '#121212',
    padding: 16,
  },
  input: {
    height: 50, // Increased height
    borderColor: '#BB86FC',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    width: '80%', // Set width to a fixed percentage for better alignment
  },
});
