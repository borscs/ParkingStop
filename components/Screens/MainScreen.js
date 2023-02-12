import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import Home from "./home/Home";
import Setting from "./settings/Setting";
import Map from "./map/Map";
import SendSMS from "./SMS/SendSMS";

 const  MainScreen = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName =  'home-outline';
                    } else if (route.name === 'Settings') {
                        iconName =  'cog';
                    } else if (route.name === 'Másnak') {
                        iconName = 'map';
                    }
                    else if (route.name === 'SMS') {
                        iconName = 'map';
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
                },

                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Másnak" component={Map}/>
            <Tab.Screen name="Settings" component={Setting}/>
            <Tab.Screen name="SMS" component={SendSMS}/>

        </Tab.Navigator>
    )
};

export default MainScreen;