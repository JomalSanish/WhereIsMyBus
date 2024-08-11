import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DeveloperScreen = () => {
  const navigation = useNavigation();
  const [busStopName, setBusStopName] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [stops, setStops] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.15.130:3000/stops')
      .then(response => setStops(response.data))
      .catch(error => console.error(error));
  }, []);

  const addStop = () => {
    if (busStopName.trim() && !isNaN(parseFloat(longitude)) && !isNaN(parseFloat(latitude))) {
      axios.post('http://192.168.15.130:3000/add-stop', { name: busStopName, longitude, latitude })
        .then(response => {
          setStops([...stops, response.data]);
          setBusStopName('');
          setLongitude('');
          setLatitude('');
          Alert.alert('Success', `Bus stop "${busStopName}" has been added.`);
        })
        .catch(error => console.error(error));
    } else {
      Alert.alert('Error', 'All fields are required and longitude/latitude must be valid numbers');
    }
  };

  const deleteStop = (id, name) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete the bus stop "${name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            axios.delete(`http://192.168.15.130:3000/delete-stop/${id}`)
              .then(() => {
                setStops(stops.filter(stop => stop._id !== id));
                Alert.alert('Success', `Bus stop "${name}" has been removed.`);
              })
              .catch(error => console.error(error));
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a new bus stop</Text>
      <TextInput
        style={styles.input}
        placeholder="Bus Stop Name"
        value={busStopName}
        onChangeText={setBusStopName}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
      />
      <Button title="Add" onPress={addStop} />
      
      <Text style={styles.heading}>Stops List</Text>
      <FlatList
        data={stops}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.busItem}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteStop(item._id, item.name)}style={styles.deleteButtonContainer}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
      />
      <Button title="Add New Route" onPress={() => navigation.navigate('CreateRoute')} />
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
    marginTop: 3,
    width: '80%',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 1,
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
  },
});

export default DeveloperScreen;
