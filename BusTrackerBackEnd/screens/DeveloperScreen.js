import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const DeveloperScreen = () => {
  const [busName, setBusName] = useState('');
  const [buses, setBuses] = useState([]);

  const addBus = () => {
    if (busName.trim() !== '') {
      axios.post('http://192.168.20.130:3000/add-bus', { name: busName })
        .then(response => {
          setBuses([...buses, response.data]);
          setBusName('');
        })
        .catch(error => console.error(error));
    } else {
      alert('Bus name cannot be empty');
    }
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
        renderItem={({ item }) => <Text>{item.name}</Text>}
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
});

export default DeveloperScreen;
