import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredFromSuggestions, setFilteredFromSuggestions] = useState([]);
  const [filteredToSuggestions, setFilteredToSuggestions] = useState([]);

  useEffect(() => {
    // Fetch stops data when component mounts
    axios.get('    https://server-ewx3.onrender.com/stops')
      .then(response => setSuggestions(response.data))
      .catch(error => console.error(error));
  }, []);

  const filterSuggestions = (text, type) => {
    const lowercasedText = text.toLowerCase();
    const filtered = suggestions.filter(stop => stop.name.toLowerCase().includes(lowercasedText));
    
    if (type === 'from') {
      setFilteredFromSuggestions(filtered);
      setFilteredToSuggestions([]); // Clear "To" suggestions
    } else {
      setFilteredToSuggestions(filtered);
      setFilteredFromSuggestions([]); // Clear "From" suggestions
    }
    
    if (type === 'from') {
      setFromLocation(text);
    } else {
      setToLocation(text);
    }
  };

  const handleSuggestionPress = (suggestion, type) => {
    if (type === 'from') {
      setFromLocation(suggestion.name);
    } else {
      setToLocation(suggestion.name);
    }
    // Clear filtered suggestions after selection
    setFilteredFromSuggestions([]);
    setFilteredToSuggestions([]);
  };

  const searchBuses = () => {
    if (fromLocation.trim() !== '' && toLocation.trim() !== '') {
      navigation.navigate('BusList', { fromLocation, toLocation });
    } else {
      alert('Please enter both locations.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Buses</Text>
      <TextInput
        style={styles.input}
        placeholder="From"
        value={fromLocation}
        onChangeText={(text) => filterSuggestions(text, 'from')}
      />
      {fromLocation && filteredFromSuggestions.length > 0 && (
        <FlatList
          data={filteredFromSuggestions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionPress(item, 'from')}>
              <Text style={styles.suggestionItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="To"
        value={toLocation}
        onChangeText={(text) => filterSuggestions(text, 'to')}
      />
      {toLocation && filteredToSuggestions.length > 0 && (
        <FlatList
          data={filteredToSuggestions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionPress(item, 'to')}>
              <Text style={styles.suggestionItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}
      <Button title="Search" onPress={searchBuses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
  suggestionList: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 12,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default SearchScreen;
