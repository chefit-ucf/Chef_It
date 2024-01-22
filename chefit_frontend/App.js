import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './screens/Profile';
import Explore from './screens/Explore';
import Welcome from './screens/Welcome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Auth from './routes/Auth';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();




export default function App() {
  return (
    <Auth />
  );
}
