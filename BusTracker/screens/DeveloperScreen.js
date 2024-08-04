import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const DeveloperScreen = () => {
  const [busName, setBusName] = useState('');
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = () => {
    axios.get('http://192.168.15.130:3000/buses')
      .then(response => setBuses(response.data))
      .catch(error => console.error(error));
  };

  const addBus = () => {
    if (busName.trim() !== '') {
      axios.post('http://192.168.15.130:3000/add-bus', { name: busName })
        .then(response => {
          setBuses([...buses, response.data]);
          setBusName('');
        })
        .catch(error => console.error(error));
    } else {
      alert('Bus name cannot be empty');
    }
  };

  const deleteBus = (id) => {
    axios.delete(`http://192.168.15.130:3000/delete-bus/${id}`)
      .then(() => {
        setBuses(buses.filter(bus => bus._id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text>Add a New Bus</Text>
      <TextInput
        style={styles.input}
        placeholder="Bus Name"
        value={busName}
        onChangeText={setBusName}
      />
      <Button title="Add" onPress={addBus} />
      <FlatList
        data={buses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.busItem}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteBus(item._id)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
      />
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
  list: {
    marginTop: 20,
    width: '80%',
  },
  busItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default DeveloperScreen;
