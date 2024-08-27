import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { darkTheme } from "./styles";
import SwapIcondark from "@/assets/Svg/SwapIcon(Dark)";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Locationicon from "@/assets/Svg/Locationicon";
import DottedLine from "@/assets/Svg/DottedLine";
import Circleart from "@/assets/Svg/Circleart";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromsuggestions, setfromsuggestions] = useState([]);
  const [tosuggestions, settosuggestions] = useState([]);
  const [checkfr, setcheckfr] = useState(true);
  const [checkto, setcheckto] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const isFocused = useIsFocused();

  const loadSearchHistory = async () => {
    try {
      const history =
        JSON.parse(await AsyncStorage.getItem("searchHistory")) || [];
      return history;
    } catch (error) {
      console.error("Error loading search history:", error);
      return [];
    }
  };

  useEffect(() => {
    if (isFocused) {
      const fetchHistory = async () => {
        const history = await loadSearchHistory();
        setSearchHistory(history);
      };
      fetchHistory();
    }
  }, [isFocused]);

  const handleSearch = () => {
    Keyboard.dismiss(); // Dismiss the keyboard on search
    fetch(
      `https://modest-rare-pegasus.ngrok-free.app/buses?from=${from}&to=${to}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          Alert.alert("Error", "No buses found for the selected route.");
        } else {
          navigation.navigate("BusList", { from, to, buses: data });
        }
      })
      .catch((error) => {
        Alert.alert("Error", "An error occurred while fetching bus data.");
        console.error("Error fetching bus data:", error);
      });
  };

  const handlefromsuggSearch = () => {
    fetch(`https://modest-rare-pegasus.ngrok-free.app/bus-stops?query=${from}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
        } else {
          setfromsuggestions(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching bus data:", error);
      });
  };

  const handletosuggSearch = () => {
    fetch(`https://modest-rare-pegasus.ngrok-free.app/bus-stops?query=${to}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
        } else {
          settosuggestions(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching bus data:", error);
      });
  };

  const handleFromChange = (text) => {
    setFrom(text);
    handlefromsuggSearch();
  };

  const handleToChange = (text) => {
    setTo(text);
    handletosuggSearch();
  };

  const handleswap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handlehispress = (item) => {
    navigation.navigate("BusDetails", { bus: item });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled" // Ensures touchable components work while the keyboard is up
      >
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 35,
            gap: 25,
            backgroundColor: "#148f57",
            flex: 1,
          }}
        >
          <View style={darkTheme.containerinput}>
            <View>
              <Text style={darkTheme.textbusdetails}>Search Bus</Text>
              <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                <View style={{ width: "20%", alignItems: "center" }}>
                  <Circleart style={{ top: -60, right: 7 }} />
                  <DottedLine style={{ top: -68, scale: 0.9 }} />
                  <Locationicon style={{ top: -80, right: 6 }} />
                </View>
                <View style={{ width: "80%" }}>
                  <View>
                    <TextInput
                      onFocus={() => setcheckfr(true)}
                      onBlur={() => setcheckfr(false)}
                      style={darkTheme.input}
                      placeholder="Enter starting Location(A)"
                      placeholderTextColor="white"
                      value={from}
                      onChangeText={handleFromChange}
                      clearButtonMode="always"
                    />
                    <View style={{ alignItems: "flex-end", right: 20 }}>
                      <TouchableOpacity
                        onPress={handleswap}
                        style={{ width: 35, alignItems: "flex-end", top: 10 }}
                      >
                        <SwapIcondark />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    {checkfr && from !== "" && (
                      <View
                        style={{
                          alignItems: "center",
                          width: "100%",
                          height: 70,
                          zIndex: 10,
                          elevation: 10,
                          position: "absolute",
                          top: -36,
                        }}
                      >
                        {fromsuggestions.map((fromsugg) => (
                          <TouchableOpacity
                            onPress={() => setFrom(fromsugg.name)}
                            key={fromsugg._id}
                            style={{
                              backgroundColor: "#121212",
                              padding: 10,
                              borderColor: "white",
                              borderWidth: 1,
                              width: "100%",
                              borderRadius: 6,
                            }}
                          >
                            <Text style={{ color: "white" }}>
                              {fromsugg.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    <TextInput
                      onFocus={() => setcheckto(true)}
                      onBlur={() => setcheckto(false)}
                      style={darkTheme.input2}
                      placeholder="Enter Destination(B)"
                      placeholderTextColor="white"
                      value={to}
                      onChangeText={handleToChange}
                      clearButtonMode="always"
                    />
                    <View>
                      {checkto && to !== "" && (
                        <View
                          style={{
                            alignItems: "center",
                            width: "100%",
                            height: 70,
                            zIndex: 20,
                            elevation: 20,
                            position: "absolute",
                            top: -21,
                          }}
                        >
                          {tosuggestions.map((tosugg) => (
                            <TouchableOpacity
                              onPress={() => setTo(tosugg.name)}
                              key={tosugg._id}
                              style={{
                                backgroundColor: "#121212",
                                padding: 10,
                                borderColor: "white",
                                borderWidth: 1,
                                width: "100%",
                                borderRadius: 6,
                              }}
                            >
                              <Text style={{ color: "white" }}>
                                {tosugg.name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={handleSearch}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                        backgroundColor: "white",
                        height: 50,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        Search
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={darkTheme.containerhistory}>
            <Text
              style={{ fontWeight: "bold", color: "#148f57", fontSize: 18 }}
            >
              Search History
            </Text>
            {searchHistory.length > 0 ? (
              searchHistory.map((item, index) => (
                <View
                  key={index}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 10,
                  }}
                >
                  <TouchableOpacity onPress={() => handlehispress(item)}>
                    <Text style={{ color: "white" }}>
                      {item.busName} - From: {item.stops[0].name} To:{" "}
                      {item.stops[item.stops.length - 1].name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={{ color: "white" }}>
                No search history available.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
