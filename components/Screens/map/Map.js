import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

const customMarker = require('./../../../assets/HatterKep.png');

const Map = () => {
    const [region, setRegion] = useState({
        latitude: 47.4979,
        longitude: 19.0402,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [marker, setMarkers] = useState({
        latitude: 0,
        longitude: 0,
    });

    const saveMarker = async (coordinate) => {
        try {
            await AsyncStorage.setItem('@markers_key', JSON.stringify(coordinate));
            setMarkers(coordinate);
        } catch (error) {
            console.log(error);
        }
    };

    const getMarkers = async () => {
        try {
            const value = await AsyncStorage.getItem('@markers_key');
            if (value !== null) {
                setMarkers(JSON.parse(value));
            }
            return value;
        } catch (error) {
            console.log(error);
        }
    };

    const [parkingState, setParkingState] = useState({isParking: false});

    const saveParkingState = async (parkingState) => {
        try {
            await AsyncStorage.setItem('@parking_state', JSON.stringify(parkingState));
            setParkingState(parkingState);
        } catch (error) {
            console.log(error);
        }
    };

    const getParkingState = async () => {
        try {
            const value = await AsyncStorage.getItem('@parking_state');
            if (value !== null) {
                setParkingState(JSON.parse(value));
            }
            return value;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            await getMarkers();
            await getParkingState();
            let {statusForeground} = await Location.requestForegroundPermissionsAsync();
            let {status} = await Location.requestBackgroundPermissionsAsync();
            if (statusForeground === 'granted' && status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
                setMarkers({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            }
        })();
    }, []);

    const saveLocation = async (latitude, longitude) => {
        await setMarkers({latitude: latitude, longitude: longitude});
        await saveMarker({latitude: latitude, longitude: longitude});
        await saveParkingState({isParking: true})
    };

    const onMapPress = (e) => {
        if (!parkingState.isParking) {
            console.log({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
            });
            setMarkers({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
            });
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                showsUserLocation
                followUserLocation
                onPress={onMapPress}
            >
                <Marker coordinate={marker}>
                    <Image source={customMarker} style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                        padding: 10,
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}/>
                </Marker>
            </MapView>
            <TouchableOpacity style={styles.saveLocationButton}
                              onPress={() => saveLocation(marker.latitude, marker.longitude)}>
                <Text style={styles.saveLocationButtonText}>Save location</Text>
            </TouchableOpacity>
            <Text>{marker.latitude.toString()} {marker.longitude.toString()}</Text>
            <TouchableOpacity style={styles.saveLocationButton}
                              onPress={() => saveParkingState({isParking: false})}>
                <Text style={styles.saveLocationButtonText}>Stop parking</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '70%',
    },
    saveLocationButton: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    saveLocationButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Map;
