import React, { useEffect, useState } from 'react'
import {collection, onSnapshot} from 'firebase/firestore'
import { db } from  '../config/firebase.js'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// For navigation
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();
 
// Screens of App
import WelcomeScreen from "../screens/WelcomeScreen.js"
import LoginScreen from '../screens/LoginScreen.js'
import SignUpScreen from "../screens/SignUpScreen.js"
import ExploreScreen from '../screens/ExploreScreen.js';
import PantryScreen from '../screens/PantryScreen.js';
import AddRecipeScreen from '../screens/AddRecipeScreen.js';
import MealPrepScreen from '../screens/MealPrepScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import { SearchScreen } from '../subScreens/Search.js' 

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: "#F7B49B",
      ...styles.shadow
    }}>{children}</View>
  </TouchableOpacity>
);

function HomeScreen() {


    return (
        <Tab.Navigator 
          tabBarOptions={{showLabel: false}}
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 30,
              left: 20,
              right: 20,
              height: 90,
              borderRadius: 20,
              ...styles.shadow
            }
          }}
          initialRouteName='ExploreScreen' 
        >
            <Tab.Screen name="ExploreScreen" component={ExploreScreen} options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 18}}>
                  <Image source={require('../assets/navIcons/search.png')}
                  resizeMode='contain'
                  style={{width: 25, height: 25, tintColor: focused ? "#47A695" : "#A6A6A6"}}/>
                  <Text style={{color: focused ? "#47A695" : "#A6A6A6", fontSize: 14, top: 6}}>Explore</Text>
                </View>
              )
            }}/>
            <Tab.Screen name="Pantry" component={PantryScreen} options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 18}}>
                  <Image source={require('../assets/navIcons/pantry.png')}
                  resizeMode='contain'
                  style={{width: 30, height: 30, tintColor: focused ? "#47A695" : "#A6A6A6"}}/>
                  <Text style={{color: focused ? "#47A695" : "#A6A6A6", fontSize: 14, top: 4}}>Pantry</Text>
                </View>
              )
            }} />
            <Tab.Screen name="AddRecipe" component={AddRecipeScreen} options={{
              tabBarIcon: ({focuses}) => (
                <Image source={require('../assets/navIcons/addRecipes.png')}
                resizeMode='contain'
                style={{width:40, height:40, tintColor: "white"}}/>
              ),
              tabBarButton: (props) => (
                <CustomTabBarButton {...props} />
              )
            }}/>
            <Tab.Screen name="MealPrep" component={MealPrepScreen} options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 18}}>
                  <Image source={require('../assets/navIcons/calendar.png')}
                  resizeMode='contain'
                  style={{width: 25, height: 25, tintColor: focused ? "#47A695" : "#A6A6A6"}}/>
                  <Text style={{color: focused ? "#47A695" : "#A6A6A6", fontSize: 14, top: 7}}>Calendar</Text>
                </View>
              )
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 18}}>
                  <Image source={require('../assets/navIcons/profile.png')}
                  resizeMode='contain'
                  style={{width: 30, height: 30, tintColor: focused ? "#47A695" : "#A6A6A6"}}/>
                  <Text style={{color: focused ? "#47A695" : "#A6A6A6", fontSize: 14, top: 5}}>Profile</Text>
                </View>
              )
            }}/>
        </Tab.Navigator>
    );
}

export default function Auth(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#1E4B43',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 10
  }
});
