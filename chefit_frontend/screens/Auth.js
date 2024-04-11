import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// For navigation
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();
 
// Screens of App
import WelcomeScreen from "./welcome.js"
import LoginScreen from "./login.js"
import SignUpScreen from "./signUp.js"
import ExploreScreen from './explore.js';
import PantryScreen from './pantry.js';
import AddRecipeScreen from './addRecipe.js';
import MealPrepScreen from './mealPrep.js';
import ProfileScreen from './profile.js';
import RecipeScreen from '../subScreens/recipe.js';

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -20,
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
  let windowHeight = Dimensions.get('window').height;
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
            height: windowHeight * 0.08,
            borderRadius: 20,
            ...styles.shadow
          }
        }}
        initialRouteName='Explore' 
      >
          <Tab.Screen name="Explore" component={ExploreScreen} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 25}}>
                <Image source={require('../assets/navIcons/search.png')}
                resizeMode='contain'
                style={{width: 25, height: 25, tintColor: focused ? "#47A695" : "#A6A6A6"}}/>
                <Text style={{color: focused ? "#47A695" : "#A6A6A6", fontSize: 14, top: 6}}>Explore</Text>
              </View>
            )
          }}/>
          <Tab.Screen name="Pantry" component={PantryScreen} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 25}}>
                <Image source={require('../assets/navIcons/pantry.png')}
                resizeMode='contain'
                style={{width: 30, height: 30, tintColor: focused ? "#47A695" : "#A6A6A6"}}/>
                <Text style={{color: focused ? "#47A695" : "#A6A6A6", fontSize: 14, top: 4}}>Pantry</Text>
              </View>
            )
          }} />
          <Tab.Screen name="AddRecipe" component={AddRecipeScreen} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 25}}>
                <Image source={require('../assets/navIcons/addRecipes.png')}
                resizeMode='contain'
                style={{width: 38, height: 38, tintColor: focused ? "#47A695" : "#A6A6A6"}}/>
                <Text style={{color: focused ? "#47A695" : "#A6A6A6", fontSize: 14}}>Add Recipe</Text>
              </View>
            )
          }}/>
          <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 25}}>
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
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
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