import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {Avatar, TouchableRipple} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import React from "react";

const Home = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableRipple
                onPress={() => navigation.navigate('Map')}
                underlayColor=''
            >
                <Avatar.Icon size={60} icon="folder" />
            </TouchableRipple>
            <Text style={{ marginTop: 20 }}>Home Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 20,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
});
export default Home;