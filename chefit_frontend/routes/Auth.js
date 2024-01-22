import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import Explore from '../screens/Explore';
import Welcome from '../screens/Welcome';
import Pantry from '../screens/Pantry';
import MealPrep from '../screens/MealPrep';
import AddScreen from '../screens/AddScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function ExploreScreen() {
    return (
      <Tab.Navigator
      initialRouteName='Explore'
      screenOptions={{headerShown: false}}>
        <Tab.Screen name='Explore' component={Explore}/>
        <Tab.Screen name="Pantry" component={Pantry} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Profile" component={Profile} />   
        <Tab.Screen name="MealPrep" component={MealPrep} />
      </Tab.Navigator>
    );
  }


export default function Auth(){
    return(
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName='Welcome'
            screenOptions={{headerShown: false}}>
            <Stack.Screen name='Welcome' component={Welcome}/>
            <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}