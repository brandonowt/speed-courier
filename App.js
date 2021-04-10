/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Home from './components/home/home';
import HomeStack from './components/stack';
import AdminHomeStack from './components/admin_stack';
import DriverHomeStack from './components/driver_stack';
import Login from './components/login/login';
import Register from './components/register/register';
import AddOrder from './components/addorder/addorder';
import Dashboard from './components/dashboard/dashboard';
import Payment from './components/payment/payment';
import CreditCard from './components/credit_card/credit_card';
import Splashscreen from './components/splashscreen/splashscreen';
import Order from './components/order/order';
import DriverOrder from './components/driver_order/driver_order';
import AdminHome from './components/admin_home/admin_home';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

const Stack = createStackNavigator();


class App extends Component {
  constructor(properties) {
    super(properties);
    //Remove this method to stop OneSignal Debugging 
    OneSignal.setLogLevel(6, 0);
    
    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init("516c9d40-aa11-4bf0-9568-54936904430b", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    
    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
  
     OneSignal.addEventListener('received', this.onReceived);
     OneSignal.addEventListener('opened', this.onOpened);
     OneSignal.addEventListener('ids', this.onIds);
  }
    componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
    }
  
    onReceived(notification) {
      console.log("Notification received: ", notification);
    }
  
    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }
  
    onIds(device) {
      console.log('Device info: ', device);
    }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splashscreen" component={Splashscreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeStack} options={{headerShown: false}} />
          <Stack.Screen name="Driver Order" component={DriverOrder} options={{headerShown: false}} />
          <Stack.Screen name="Order" component={Order} options={{headerShown: false}} />
          <Stack.Screen name="Admin Home" component={AdminHomeStack} options={{headerShown: false}} />
          <Stack.Screen name="Driver Home" component={DriverHomeStack} options={{headerShown: false}} />
          <Stack.Screen name="Add Order" component={AddOrder} options={{headerShown: false}} />
          <Stack.Screen name="Payment" component={Payment} options={{headerShown: false}} />
          <Stack.Screen name="Credit Card" component={CreditCard} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

function myiOSPromptCallback(permission){
  // do something with permission value
}

export default App;
