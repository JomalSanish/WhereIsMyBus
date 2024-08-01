import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fuse from 'fuse.js';
import { darkTheme } from './styles';

const locations = [
  { name: 'Thodupuzha', coordinates: { latitude: 9.904830930076447, longitude: 76.7053957876071 } },
  { name: 'Muvattupuzha', coordinates: { latitude: 9.988181678408138, longitude: 76.57284398888918 } },
  { name: 'Puthenkurish', coordinates: { latitude: 9.976759294723937, longitude: 76.41179573957362 } },
  { name: 'Thrippunithura', coordinates: { latitude: 9.95017586201997, longitude: 76.3484459302907 } },
  { name: 'Vyttila', coordinates: { latitude: 9.968573001644026, longitude: 76.31655315755961 } },
];

const fuse = new Fuse(locations, {
  keys: ['name'],
  threshold: 0.25,
});

export default function HomeScreen() {
  const navigation = useNavigation();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const handleSearch = () => {
    fetch(`https://modest-rare-pegasus.ngrok-free.app/buses?from=${from}&to=${to}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          Alert.alert('Error', 'No buses found for the selected route.');
        } else {
          navigation.navigate('BusList', { from, to, buses: data });
        }
      })
      .catch(error => {
        Alert.alert('Error', 'An error occurred while fetching bus data.');
        console.error('Error fetching bus data:', error);
      });
  };

  const handleFromChange = (text) => {
    setFrom(text);
    setFromSuggestions(fuse.search(text).map(result => result.item.name));
  };

  const handleToChange = (text) => {
    setTo(text);
    setToSuggestions(fuse.search(text).map(result => result.item.name));
  };

  return (
    <View style={darkTheme.container}>
      <Text style={darkTheme.text}>Enter the 'from' and 'to' locations:</Text>
      <TextInput
        style={darkTheme.input}
        placeholder="From"
        placeholderTextColor="#BB86FC"
        value={from}
        onChangeText={handleFromChange}
      />
      {fromSuggestions.length > 0 && (
        <View style={styles.suggestions}>
          {fromSuggestions.map((suggestion, index) => (
            <Text key={index} style={darkTheme.text}>{suggestion}</Text>
          ))}
        </View>
      )}
      <TextInput
        style={darkTheme.input}
        placeholder="To"
        placeholderTextColor="#BB86FC"
        value={to}
        onChangeText={handleToChange}
      />
      {toSuggestions.length > 0 && (
        <View style={styles.suggestions}>
          {toSuggestions.map((suggestion, index) => (
            <Text key={index} style={darkTheme.text}>{suggestion}</Text>
          ))}
        </View>
      )}
      <Button title="Search" color="#BB86FC" onPress={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  suggestions: {
    backgroundColor: '#121212',
    padding: 10,
    borderColor: '#BB86FC',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
});
