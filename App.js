import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import MainScreen from "./components/Screens/MainScreen";
import Map from "./components/Screens/map/Map";
import SendSMS from "./components/Screens/SMS/SendSMS";
import * as SMS from 'expo-sms';

const App = () => {
    const Stack = createStackNavigator();
    useEffect(() => {
        async function checkAvailability() {
          await SMS.isAvailableAsync();
        }
        checkAvailability();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={MainScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Map" component={Map}/>
                <Stack.Screen name="SMS" component={SendSMS}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default App;