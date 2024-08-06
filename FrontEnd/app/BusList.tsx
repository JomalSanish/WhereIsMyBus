import React, { useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';  // Import useRoute and useNavigation
import { darkTheme } from './styles';

export default function BusList() {
  const route = useRoute();
  const navigation = useNavigation();
  const { from, to, buses } = route.params;
  const [loading, setLoading] = useState(false);

  const handleBusSelect = (bus) => {
    setLoading(true);
    const fromIndex = bus.stops.findIndex((stop) => stop.name === from);
    const toIndex = bus.stops.findIndex((stop) => stop.name === to);
    const filteredSchedule = bus.stops.slice(
      Math.min(fromIndex, toIndex),
      Math.max(fromIndex, toIndex) + 1
    );
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('BusDetails', { bus: { ...bus, schedule: filteredSchedule } });
    }, 1000);
  };

  return (
    <View style={darkTheme.container}>
      <Text style={darkTheme.text}>Buses from {from} to {to}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#BB86FC" />
      ) : (
        <FlatList
          data={buses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.busItem}>
              <Text style={darkTheme.text}>{item.busNumber}</Text>
              <Button title="Select" color="#00afd6" onPress={() => handleBusSelect(item)} />
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
    borderBottomColor: '#00afd6',
  },
});
