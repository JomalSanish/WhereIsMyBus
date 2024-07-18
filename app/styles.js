import { StyleSheet } from 'react-native';
export const drawerStyles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  drawerItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#BB86FC',
  },
  drawerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#BB86FC',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
  },
  button: {
    color: '#BB86FC',
  },
  busItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BB86FC',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
});
