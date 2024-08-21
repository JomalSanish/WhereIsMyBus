import React, { useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';  // Import useRoute and useNavigation
import { darkTheme } from './styles';

export default function BusList() {
  const route = useRoute();
  const navigation = useNavigation();
  const { from, to, buses } = route.params;
  const [loading, setLoading] = useState(false);


  const handleBusSelect = async (bus) => {
    setLoading(true);
  
    try {
      // Fetch the route details from the backend
      const response = await fetch(`https://modest-rare-pegasus.ngrok-free.app/routes?route=${bus.route}`);
      const routeData = await response.json();
  
      if (!response.ok) {
        throw new Error(routeData.error || 'Failed to fetch route data');
      }
  
      // Combine the fetched stops with the bus data
      const busWithStops = {
        ...bus,
        stops: routeData.stops, // This will include both name and location for each stop
      };
  
      setLoading(false);
      // Navigate to the "BusDetails" page with the complete bus data
      navigation.navigate('BusDetails', { bus: busWithStops });
    } catch (error) {
      setLoading(false);
      console.error('Error fetching route data:', error);
      // Handle error (e.g., show an alert to the user)
    }
  };
  
  

  return (
    <View style={darkTheme.container}>
      <Text style={darkTheme.textbusdetails}>Buses from "{from}" to "{to}"</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#BB86FC" />
      ) : (
        <FlatList
          data={buses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.busItem}>
              <Text style={darkTheme.text}>{item.name}</Text>
              <Button title="Select" color="#148f57" onPress={() => handleBusSelect(item)} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  busItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#148f57',
  },
});
