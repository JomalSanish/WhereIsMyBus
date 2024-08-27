import React, { useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';  // Import useRoute and useNavigation
import { darkTheme } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BusList() {
  const route = useRoute();
  const navigation = useNavigation();
  const { from, to, buses } = route.params;
  const [loading, setLoading] = useState(false);


  const saveToSearchHistory = async (busWithStops) => {
    try {
      // Get the current history
      const history = JSON.parse(await AsyncStorage.getItem('searchHistory')) || [];
  
      // Add the new item
      history.unshift(busWithStops);
  
      // Keep only the latest 5 items
      if (history.length > 5) {
        history.pop();
      }
  
      // Save back to AsyncStorage
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving to search history:', error);
    }
  };


  const handleBusSelect = async (bus) => {
    setLoading(true);
  
    try {
      const response = await fetch(`https://modest-rare-pegasus.ngrok-free.app/routes?busName=${bus.busName}`);
      const routeData = await response.json();
  
      if (!response.ok || !routeData || !routeData.stops) {
        throw new Error(routeData.error || 'Failed to fetch route data or stops not found');
      }
  
      const busWithStops = {
        ...bus,
        stops: routeData.stops,
      };
  
      // Save busWithStops to AsyncStorage
      await saveToSearchHistory(busWithStops);
  
      setLoading(false);
      navigation.navigate('BusDetails', { bus: busWithStops });
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch route data.');
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
              <Text style={darkTheme.text}>{item.busName}</Text>
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
