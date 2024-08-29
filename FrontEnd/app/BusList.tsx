import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native"; // Import useRoute and useNavigation
import { darkTheme } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import Circleart from "@/assets/Svg/Circleart";
import Locationicon from "@/assets/Svg/Locationicon";
import DottedLinehor from "@/assets/Svg/DottedLine(horizontal)";

export default function BusList() {
  const route = useRoute();
  const navigation = useNavigation();
  const { from, to, buses } = route.params;
  const [loading, setLoading] = useState(false);

  const saveToSearchHistory = async (busWithStops) => {
    try {
      // Get the current history
      const history =
        JSON.parse(await AsyncStorage.getItem("searchHistory")) || [];

      // Add the new item
      history.unshift(busWithStops);

      // Keep only the latest 5 items
      if (history.length > 5) {
        history.pop();
      }

      // Save back to AsyncStorage
      await AsyncStorage.setItem("searchHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving to search history:", error);
    }
  };

  const handleBusSelect = async (bus) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://wimb-server.onrender.com/routes?busName=${bus.busName}`
      );
      const routeData = await response.json();

      if (!response.ok || !routeData || !routeData.stops) {
        throw new Error(
          routeData.error || "Failed to fetch route data or stops not found"
        );
      }

      const busWithStops = {
        ...bus,
        stops: routeData.stops,
      };

      // Save busWithStops to AsyncStorage
      await saveToSearchHistory(busWithStops);

      setLoading(false);
      navigation.navigate("BusDetails", { bus: busWithStops });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to fetch route data.");
    }
  };

  return (
    <View>
      <View
        style={{
          height: "10%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#121212",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Circleart style={{ top: 30, right: 80 }} />
          <Locationicon style={{ top: 30, left: 80 }} />
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{ color: "#1FA15B", fontWeight: "bold", top: 30 }}>
            {from}
          </Text>
          <DottedLinehor />
          <Text style={{ color: "#1FA15B", fontWeight: "bold", top: 30 }}>
            {to}
          </Text>
        </View>
      </View>
      <View style={{ height: "100%", backgroundColor: "#1FA15B", padding: 20 }}>
        <View
          style={{
            backgroundColor: "#121212",
            borderRadius: 10,
            shadowColor: "black",
            elevation: 10,
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Text
            style={{
              color: "#1FA15B",
              fontSize: 18,
              paddingBottom: 15,
              fontWeight: "bold",
            }}
          >
            Running Buses
          </Text>
          {loading ? (
            <ActivityIndicator size="large" color="#BB86FC" />
          ) : (
            <FlatList
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
              data={buses}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.busItem}>
                  <TouchableOpacity onPress={() => handleBusSelect(item)}>
                    <Text
                      style={{ color: "black", fontSize: 15, marginBottom: 10 }}
                    >
                      {item.busName}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  busItem: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
