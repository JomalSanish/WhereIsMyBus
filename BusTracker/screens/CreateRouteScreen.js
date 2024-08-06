import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const CreateRouteScreen = ({ navigation }) => {
  const [stops, setStops] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  
  useEffect(() => {
    axios.get('http://192.168.15.130:3000/stops')
      .then(response => setStops(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSelectStop = (stop) => {
    let updatedStops = [...selectedStops];
    if (updatedStops.includes(stop._id)) {
      updatedStops = updatedStops.filter(id => id !== stop._id);
    } else {
      updatedStops.push(stop._id);
    }
    setSelectedStops(updatedStops);
  };

  const handleSaveRoute = () => {
    if (selectedStops.length < 2) {
      alert('Select at least two stops to create a route');
      return;
    }

    const orderedStops = stops
      .filter(stop => selectedStops.includes(stop._id))
      .sort((a, b) => selectedStops.indexOf(a._id) - selectedStops.indexOf(b._id));
    
    const routeTitle = `${orderedStops[0].name} - ${orderedStops[orderedStops.length - 1].name}`;

    axios.post('http://192.168.15.130:3000/add-route', { title: routeTitle, stops: orderedStops })
      .then(response => {
        alert('Route saved successfully');
        navigation.goBack();
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text>Select Stops for the Route</Text>
      <FlatList
        data={stops}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectStop(item)} style={styles.stopItem}>
            <Text>{item.name}</Text>
            {selectedStops.includes(item._id) && (
              <Text style={styles.number}>{selectedStops.indexOf(item._id) + 1}</Text>
            )}
          </TouchableOpacity>
        )}
        style={styles.list}
      />
      <Button title="Save Route" onPress={handleSaveRoute} />
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
  stopItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '80%',
  },
  number: {
    backgroundColor: 'lightgray',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  list: {
    marginTop: 20,
    width: '100%',
  },
});

export default CreateRouteScreen;
