import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// For navigation
const Stack = createNativeStackNavigator()
 
// Screens of App
import WelcomeScreen from "./components/welcome.js"
import LoginScreen from "./components/login.js"
import SignUpScreen from "./components/signUp.js"
import Explore from "./screens/Explore.js"

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{headerShown:false}}
      initialRouteName="Explore">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Explore" component={Explore} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


