import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const lowerLoginId = loginId.trim().toLowerCase();
    const lowerPassword = password.trim();
  
    if (
      (lowerLoginId === 'driver' && (lowerPassword === 'alan123' || lowerPassword === 'Alan123')) ||
      (lowerLoginId === 'admin' && (lowerPassword === 'jomal123' || lowerPassword === 'Jomal123')) ||
      (lowerLoginId === 'developer' && (lowerPassword === 'aldrin123' || lowerPassword === 'Aldrin123'))
    ) {
      navigation.navigate(lowerLoginId.charAt(0).toUpperCase() + lowerLoginId.slice(1));
    } else {
      alert('Invalid credentials');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 1,
    marginBottom: 15,
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
