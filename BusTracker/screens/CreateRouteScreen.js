import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const CreateRouteScreen = ({ navigation }) => {
  const [stops, setStops] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.1.7:3000/stops')
      .then(response => setStops(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleStopClick = (stop) => {
    const index = selectedStops.findIndex(item => item._id === stop._id);
    if (index === -1) {
      setSelectedStops([...selectedStops, { ...stop, number: selectedStops.length + 1 }]);
    } else {
      const newSelectedStops = selectedStops.filter(item => item._id !== stop._id);
      setSelectedStops(newSelectedStops.map((item, i) => ({ ...item, number: i + 1 })));
    }
  };

  const handleSave = () => {
    if (selectedStops.length === 0) {
      Alert.alert('Error', 'No stops selected');
      return;
    }

    if (!selectedButton) {
      Alert.alert('Error', 'Please select a route type');
      return;
    }

    const routeTitle = `${selectedStops[0].name}-${selectedStops[selectedStops.length - 1].name} (${selectedButton})`;

    axios.post('http://192.168.1.7:3000/add-route', {
      title: routeTitle,
      stops: selectedStops.map(stop => ({
        name: stop.name,
        number: stop.number
      })),
    })
      .then(response => {
        Alert.alert('Success', 'Route saved successfully');
        navigation.goBack();
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a new bus route</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedButton === 'FP' && styles.selectedButton]}
          onPress={() => setSelectedButton('FP')}
        >
          <Text style={styles.buttonText}>FP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButton === 'Ordinary' && styles.selectedButton]}
          onPress={() => setSelectedButton('Ordinary')}
        >
          <Text style={styles.buttonText}>Ordinary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButton === 'LS' && styles.selectedButton]}
          onPress={() => setSelectedButton('LS')}
        >
          <Text style={styles.buttonText}>LS</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Stops List</Text>
      <FlatList
        data={stops}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.stopItem}
            onPress={() => handleStopClick(item)}
          >
            <Text>{item.name}</Text>
            {selectedStops.find(stop => stop._id === item._id) && (
              <Text style={styles.stopNumber}>
                {selectedStops.find(stop => stop._id === item._id).number}
              </Text>
            )}
          </TouchableOpacity>
        )}
        style={styles.list}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: 'lightblue',
  },
  buttonText: {
    fontSize: 16,
  },
  list: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 1,
    marginBottom: 15,
  },
  stopItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stopNumber: {
    fontWeight: 'bold',
  },
});

export default CreateRouteScreen;
