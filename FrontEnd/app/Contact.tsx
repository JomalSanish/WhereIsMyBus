import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { darkTheme } from './styles';

export default function Contact() {
  const [message, setMessage] = React.useState('');

  const handleSubmit = () => {
    Alert.alert('Message Sent', 'Your message has been sent to the developers.', [{ text: 'OK' }]);
    setMessage('');
  };

  return (
    <View style={darkTheme.container}>
      <Text style={darkTheme.text}>Contact Developers</Text>
      <TextInput
        style={styles.input}
        placeholder="Your message"
        placeholderTextColor="#BB86FC"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title="Send" color="#BB86FC" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 100,
    borderColor: '#BB86FC',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    width: '100%',
  },
});
