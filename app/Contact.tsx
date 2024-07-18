import React from 'react';
import { View, Text } from 'react-native';
import { darkTheme } from './styles';

export default function Contact() {
  return (
    <View style={darkTheme.container}>
      <Text style={darkTheme.text}>Contact Developers Screen</Text>
    </View>
  );
}
