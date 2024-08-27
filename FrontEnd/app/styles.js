import { StyleSheet } from 'react-native';

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: "center",
  },
  containerinput: {
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: "center",
    elevation: 5,
    borderRadius: 20,
  },
  containerhistory: {
    backgroundColor: '#121212',
    padding: 20,
    paddingBottom: 20,
    justifyContent: "center",
    elevation: 10,
    borderRadius: 20,
    gap: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  textbusdetails: {
    color: '#148f57',
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
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: 'white'
  },
  input2: {
    height: 40,
    borderColor: 'white',
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
    top: 25, 
    left: -15,
  },
});
