import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DriverHome from './driver_home/driver_home';
import DriverOrders from './driver_orders/driver_orders';
import Settings from './settings/settings';
// import Status from './components/status/status.js';
// import Contact from './components/contact/contact.js';
// import History from './components/history/history.js';
// import Profile from './components/profile/profile.js';



const Tab = createBottomTabNavigator();

export default class DriverHomeStack extends Component {
render(){
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
  
              let iconName;
              let colors;
              let size;
            if (route.name === 'Home') {
              iconName = 'home'
            }else if(route.name === 'Orders'){
                iconName = 'clipboard-list'
            }
            else if(route.name === 'Settings'){
                iconName = 'cog'
            }
            if(focused){
               colors="#0C2C43"
               size = 30
            }else{
                colors="#707070"
                size = 22
            }
  
              // You can return any component that you like here!
              return <Icon type="FontAwesome5" name={iconName} style={{fontSize:size,color:colors}} />;
            },
          })}
            tabBarOptions={{
                activeTintColor: '#003F5C',
                inactiveTintColor: '#707070',
                // activeBackgroundColor: '#135B8E',
                // inactiveBackgroundColor:'#0C2C43'
            }}
            initialRouteName="Home"
        >
            <Tab.Screen name="Home"
                component={DriverHome}
            />
            <Tab.Screen name="Orders"
                component={DriverOrders}
            />
            <Tab.Screen name="Settings"
                component={Settings}
            />

        </Tab.Navigator>
  );
}
  
}