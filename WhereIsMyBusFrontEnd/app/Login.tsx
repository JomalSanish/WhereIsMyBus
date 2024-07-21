import React from 'react';
import { View, Text } from 'react-native';
import { darkTheme } from './styles';

export default function Login() {
  return (
    <View style={darkTheme.container}>
      <Text style={darkTheme.text}>Login Screen</Text>
    </View>
  );
}
