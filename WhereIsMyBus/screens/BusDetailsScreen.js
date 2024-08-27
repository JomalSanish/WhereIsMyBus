import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';
import axios from 'axios';

const BusDetailsScreen = ({ route }) => {
    const { busName } = route.params; // Make sure busName is correctly destructured
    const [busDetails, setBusDetails] = useState(null);

    useEffect(() => {
        if (busName) {
            axios
                .get(`    https://server-ewx3.onrender.com/bus-details/name/${encodeURIComponent(busName)}`)
                .then(response => {
                    setBusDetails(response.data);
                })
                .catch(error => {
                    console.error('Error fetching bus details:', error); // Log the error
                });
        } else {
            console.error('BusName is undefined');
        }
    }, [busName]);

    const viewInGoogleMaps = () => {
        if (busDetails && busDetails.location) {
            const url = `https://www.google.com/maps?q=${busDetails.location.latitude},${busDetails.location.longitude}`;
            Linking.openURL(url);
        }
    };

    return (
        <View style={styles.container}>
            {busDetails ? (
                <>
                    <Text style={styles.title}>{busDetails.name}</Text>
                    <Text>Current Location: {busDetails.location.latitude}, {busDetails.location.longitude}</Text>
                    <Button title="View in Google Maps" onPress={viewInGoogleMaps} />
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default BusDetailsScreen;
