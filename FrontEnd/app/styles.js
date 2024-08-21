import { StyleSheet } from 'react-native';

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: "center",
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  textbusdetails: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#148f57',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: 'white'
  },
  input2: {
    height: 40,
    borderColor: '#148f57',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    color: 'white'
  },
  help: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  drawermenust: {
    textAlign: 'left', 
    color: 'white', 
    fontSize: 20,
    left: 30,
  },
  drawermenuic: {
    width: 30, 
    height: 30, 
    top: 28, 
    left: -15,
  },
});
