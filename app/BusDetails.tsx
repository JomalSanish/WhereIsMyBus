import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { darkTheme } from './styles';

const sampleBusLocation = {
  latitude: 9.968573001644026,
  longitude: 76.31655315755961,
};

export default function BusDetails() {
  const route = useRoute();
  const { bus } = route.params;

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${sampleBusLocation.latitude},${sampleBusLocation.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={darkTheme.container}>
      <Text style={darkTheme.title}>{bus.name} Current Location</Text>
      <FlatList
        data={bus.schedule}
        keyExtractor={(item) => item.stop}
        renderItem={({ item }) => (
          <View style={styles.stopItem}>
            <Text style={darkTheme.text}>{item.stop}</Text>
            {item.stop === bus.schedule[bus.schedule.length - 1].stop && (
              <Image
                source={require('./assets/current-location-icon.png')} // Add your icon here
                style={styles.icon}
              />
            )}
          </View>
        )}
      />
      <Button title="View current location in Google Maps" color="#BB86FC" onPress={openInMaps} />
    </View>
  );
}

const styles = StyleSheet.create({
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BB86FC',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});
