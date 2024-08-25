import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const BusListScreen = ({ route, navigation }) => {
    const { fromLocation, toLocation } = route.params;
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        axios
            .post(`http://192.168.1.4:3000/search-buses`, { from: fromLocation, to: toLocation })
            .then(response => {
                setBuses(response.data);
            })
            .catch(error => console.error('Error fetching buses:', error));
    }, [fromLocation, toLocation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Buses</Text>
            <FlatList
                data={buses}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('BusDetails', { busName: item.busName })}>
                        <Text style={styles.busItem}>{item.busName}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    busItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});

export default BusListScreen;
