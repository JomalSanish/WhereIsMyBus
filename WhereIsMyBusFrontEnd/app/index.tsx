import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Fuse from "fuse.js";
import Modal from "react-native-modal";
import { darkTheme } from "./styles";

const locations = [
  {
    name: "Todupuzha",
    coordinates: { latitude: 9.904830930076447, longitude: 76.7053957876071 },
  },
  {
    name: "Muvattupuzha",
    coordinates: { latitude: 9.988181678408138, longitude: 76.57284398888918 },
  },
  {
    name: "Puthenkurish",
    coordinates: { latitude: 9.976759294723937, longitude: 76.41179573957362 },
  },
  {
    name: "Thrippunithura",
    coordinates: { latitude: 9.95017586201997, longitude: 76.3484459302907 },
  },
  {
    name: "Vyttila",
    coordinates: { latitude: 9.968573001644026, longitude: 76.31655315755961 },
  },
];

const fuse = new Fuse(locations, {
  keys: ["name"],
  threshold: 0.25, // Adjusted typo tolerance to 25%
});

export default function Index() {
  const navigation = useNavigation();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearch = () => {
    const fromResults = fuse.search(from);
    const toResults = fuse.search(to);

    if (fromResults.length > 0 && toResults.length > 0) {
      navigation.navigate("BusList", {
        from: fromResults[0].item.name,
        to: toResults[0].item.name,
      });
    } else {
      Alert.alert(
        "Location Not Found",
        "One or both of the locations entered are not found. Please check the location names and try again.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
        <Image source={require("./assets/icon.png")} style={styles.icon} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="From"
        placeholderTextColor="#BB86FC"
        value={from}
        onChangeText={setFrom}
      />
      <TextInput
        style={styles.input}
        placeholder="To"
        placeholderTextColor="#BB86FC"
        value={to}
        onChangeText={setTo}
      />
      <Button title="Search" color="#BB86FC" onPress={handleSearch} />

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.menuItem}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
              navigation.navigate("Help");
            }}
          >
            <Text style={styles.menuItem}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleModal();
              navigation.navigate("Contact");
            }}
          >
            <Text style={styles.menuItem}>Contact</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#121212",
    padding: 16,
  },
  input: {
    height: 50, // Increased height
    borderColor: "#BB86FC",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#FFFFFF",
    width: "80%", // Set width to a fixed percentage for better alignment
  },
  menuButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});
