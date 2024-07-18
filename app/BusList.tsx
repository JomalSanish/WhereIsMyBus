import React from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { darkTheme } from './styles';

const locations = [
  { name: 'Todupuzha', coordinates: { latitude: 9.904830930076447, longitude: 76.7053957876071 } },
  { name: 'Muvattupuzha', coordinates: { latitude: 9.988181678408138, longitude: 76.57284398888918 } },
  { name: 'Puthenkurish', coordinates: { latitude: 9.976759294723937, longitude: 76.41179573957362 } },
  { name: 'Thrippunithura', coordinates: { latitude: 9.95017586201997, longitude: 76.3484459302907 } },
  { name: 'Vyttila', coordinates: { latitude: 9.968573001644026, longitude: 76.31655315755961 } },
];

const generateBuses = () => {
  const buses = [];
  let startTime = 8;
  for (let i = 0; i < 10; i++) {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    const bus = {
      id,
      name: `Bus ${id}`,
      schedule: locations.map((loc, index) => ({
        stop: loc.name,
        arrival: `${startTime + Math.floor(index / 4)}:${index % 4 === 0 ? '00' : '15'}`,
        departure: `${startTime + Math.floor(index / 4)}:${index % 4 === 0 ? '15' : '30'}`,
      })),
    };
    buses.push(bus);
    startTime++;
  }
  return buses;
};

const buses = generateBuses();

export default function BusList() {
  const route = useRoute();
  const navigation = useNavigation();
  const { from, to } = route.params;

  const fromIndex = locations.findIndex((loc) => loc.name === from);
  const toIndex = locations.findIndex((loc) => loc.name === to);

  const filteredBuses = buses.filter((bus) => {
    const fromStop = bus.schedule.find((stop) => stop.stop === from);
    const toStop = bus.schedule.find((stop) => stop.stop === to);
    return fromStop && toStop && fromIndex < toIndex;
  });

  const handleBusSelect = (bus) => {
    navigation.navigate('BusDetails', { bus });
  };

  return (
    <View style={darkTheme.container}>
      <Text style={darkTheme.text}>Buses from {from} to {to}</Text>
      <FlatList
        data={filteredBuses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.busItem}>
            <Text style={darkTheme.text}>{item.name}</Text>
            <Button title="Select" color="#BB86FC" onPress={() => handleBusSelect(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  busItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BB86FC',
  },
});
