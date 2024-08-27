import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const AdminScreen = () => {
  const [busName, setBusName] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchBuses();
    fetchRoutes();
  }, []);

  const fetchBuses = () => {
    axios.get('    https://server-ewx3.onrender.com/buses')
      .then(response => setBuses(response.data))
      .catch(error => console.error(error));
  };

  const fetchRoutes = () => {
    axios.get('    https://server-ewx3.onrender.com/routes')
      .then(response => setRoutes(response.data))
      .catch(error => console.error(error));
  };

  const addBus = () => {
    if (busName.trim() !== '' && selectedRoute) {
      const formattedBusName = `${busName.trim()} ${selectedRoute.title}`;
      axios.post('    https://server-ewx3.onrender.com/add-bus', { name: formattedBusName, routeId: selectedRoute._id })
        .then(response => {
          setBuses([...buses, response.data.bus]);
          setBusName('');
          setSelectedRoute(null);
          Alert.alert('Success', `Bus "${response.data.bus.name}" has been added.`);
        })
        .catch(error => console.error(error));
    } else {
      Alert.alert('Error', 'Please enter a bus name and select a route.');
    }
  };

  const deleteBus = (id, name) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete the bus "${name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            axios.delete(`    https://server-ewx3.onrender.com/delete-bus/${id}`)
              .then(() => {
                setBuses(buses.filter(bus => bus._id !== id));
                Alert.alert('Success', `Bus "${name}" has been removed.`);
              })
              .catch(error => console.error(error));
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a new bus</Text>
      <TextInput
        style={styles.input}
        placeholder="Bus Name"
        value={busName}
        onChangeText={setBusName}
      />
      
      <View style={styles.routesContainer}>
        <Text style={styles.heading}>Select a route</Text>
        <FlatList
          data={routes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.routeItem,
                selectedRoute?._id === item._id && styles.selectedRouteItem
              ]}
              onPress={() => setSelectedRoute(item)}
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Button title="Add" onPress={addBus} />
      
      <View style={styles.busesContainer}>
        <Text style={styles.heading}>Buses List</Text>
        <FlatList
          data={buses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.busItem}>
              <Text>{item.name}</Text>
              <TouchableOpacity onPress={() => deleteBus(item._id, item.name)} style={styles.deleteButtonContainer}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
  routesContainer: {
    marginBottom: 12,
  },
  busesContainer: {
    marginTop: 20,
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  routeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  selectedRouteItem: {
    backgroundColor: '#e0e0e0',
  },
  busItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  deleteButtonContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AdminScreen;
