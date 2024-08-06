import { StyleSheet } from 'react-native';

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: "center",
  },
  text: {
    color: '#00afd6',
    fontSize: 18,
    marginBottom: 10,
  },
  title: {
    color: '#00afd6',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#00afd6',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: '#00afd6'
  },
  input2: {
    height: 40,
    borderColor: '#00afd6',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    color: '#00afd6'
  },
});
