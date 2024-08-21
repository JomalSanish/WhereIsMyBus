import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { darkTheme } from './styles';

export default function Help() {
  return (
    <ScrollView style={darkTheme.help}>
      <Text style={darkTheme.text}>Help</Text>
      <View style={styles.faqContainer}>
        <Text style={styles.question}>Q: How to search for a bus?</Text>
        <Text style={styles.answer}>A: Enter the 'from' and 'to' locations on the main screen and press 'Search'.</Text>

        <Text style={styles.question}>Q: How to view bus details?</Text>
        <Text style={styles.answer}>A: Select a bus from the list to view its current location and schedule.</Text>

        <Text style={styles.question}>Q: How to contact developers?</Text>
        <Text style={styles.answer}>A: Go to the 'Contact' screen and send your message to the developers.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  faqContainer: {
    marginTop: 20,
  },
  question: {
    color: '#BB86FC',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answer: {
    color: '#FFFFFF',
    marginBottom: 20,
  },
});
