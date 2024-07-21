import React from 'react';
import { View, Text } from 'react-native';
import { darkTheme } from './styles';

export default function Help() {
  return (
    <View style={darkTheme.container}>
      <Text style={darkTheme.text}>Help Screen</Text>
    </View>
  );
}
