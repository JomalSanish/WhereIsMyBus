import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if ((loginId === 'driver' || loginId === 'Driver' || loginId === 'Driver ') && (password === 'alan123' || password === 'Alan123')) {
      navigation.navigate('Driver');
    } else if ((loginId === 'admin' || loginId === 'Admin' || loginId === 'Admin ') && (password === 'jomal123' || password === 'Jomal123')) { // Change Developer to Admin
      navigation.navigate('Admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Login ID"
        value={loginId}
        onChangeText={setLoginId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
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
});

export default LoginScreen;
