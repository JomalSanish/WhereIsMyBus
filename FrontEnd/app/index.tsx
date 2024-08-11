import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Alert, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { darkTheme } from './styles';


export default function HomeScreen() {
  const navigation = useNavigation();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromsuggestions,setfromsuggestions] = useState([]); 
  const [tosuggestions,settosuggestions] = useState([]); 
  const [checkfr,setcheckfr] = useState(true);
  const [checkto,setcheckto] = useState(true);

  const handleSearch = () => {
    fetch(`https://modest-rare-pegasus.ngrok-free.app/buses?from=${from}&to=${to}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          Alert.alert('Error', 'No buses found for the selected route.');
        } else {
          navigation.navigate('BusList', { from, to, buses: data });
        }
      })
      .catch(error => {
        Alert.alert('Error', 'An error occurred while fetching bus data.');
        console.error('Error fetching bus data:', error);
      });
  };

  //From suggestions
  const handlefromsuggSearch = () => {
    fetch(`https://modest-rare-pegasus.ngrok-free.app/bus-stops?query=${from}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          
        } else {
          setfromsuggestions(data);
        }
      })
      .catch(error => {
        console.error('Error fetching bus data:', error);
      });
  };

  //To suggestions
  const handletosuggSearch = () => {
    fetch(`https://modest-rare-pegasus.ngrok-free.app/bus-stops?query=${to}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          
        } else {
          settosuggestions(data);
        }
      })
      .catch(error => {
        console.error('Error fetching bus data:', error);
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

  useEffect(() =>{
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor("#121212", true);
  })

  return (
    <View style={darkTheme.container}>
      <View>
        <Text style={darkTheme.text}>Enter the 'From' and 'To' locations:</Text>
        <TextInput
          onPressIn={() => setcheckfr(true)}
          onEndEditing={() => setcheckfr(false)}
          style={darkTheme.input}
          placeholder="From"
          placeholderTextColor="#00afd6"
          value={from}
          onChangeText={handleFromChange}
          clearButtonMode='always'
        />
      </View>
      <View>
        {
          checkfr && from !== ""
          &&
          <View style={{alignItems: "center", width: "100%", height: 70, zIndex: 10, position: "absolute"}}>
            {
              fromsuggestions.map((fromsugg) => {
                return(
                  <TouchableOpacity onPress={() => setFrom(fromsugg.name)} key={fromsugg._id} style={{backgroundColor: "#121212", padding:10, borderColor: "#00afd6", borderWidth: 1, width: "100%", borderRadius: 6}}>
                  <Text style={{color: "#00afd6"}}>{fromsugg.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        }
        <TextInput
          onPressIn={() => setcheckto(true)}
          onEndEditing={() => setcheckto(false)}
          style={darkTheme.input2}
          placeholder="To"
          placeholderTextColor="#00afd6"
          value={to}
          onChangeText={handleToChange}
          clearButtonMode='always'
        />
        <View>
        {
          checkto && to !== ""
          &&
          <View style={{alignItems: "center", width: "100%", height: 70, zIndex: 10, position: "absolute", top: -21}}>
            {
              tosuggestions.map((tosugg) => {
                return(
                  <TouchableOpacity onPress={() => setTo(tosugg.name)} key={tosugg._id} style={{backgroundColor: "#121212", padding:10, borderColor: "#00afd6", borderWidth: 1, width: "100%", borderRadius: 6}}>
                  <Text style={{color: "#00afd6"}}>{tosugg.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
        </View>
        }
      </View>
        <Button title="Search" color="#00afd6" onPress={handleSearch} />
      </View>
      </View>
  );
}
