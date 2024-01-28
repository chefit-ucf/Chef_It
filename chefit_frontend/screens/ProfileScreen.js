import React from 'react';
import { Button, View, Text, Image, Pressable, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyRecipesAndAchievementsTab from '../subScreens/MyRecipesAndAchievementsTab';
// Import the BackButton component
import BackButton from '../components/BackButton';

// For navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// useState for user avatar
const [userAvatar, setUserAvatar] = "";

function Profile({ navigation }) {
  return (
   


<SafeAreaView style={{flex: 1, alignItems: "center"}}>
      <ScrollView >
        
        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", width: 200, height: 200, backgroundColor: '#F9B59E'}}>

        <Pressable onPress={() => navigation.navigate('DisplayCooksona')}>
          <Image
          source={require('../assets/actionIcons/editCooksonaIcon.png')}
          style={{width: 22, height: 22}}/> 
        </Pressable>
        </View>

      <Text>
        Username
      </Text>
      <View style={{width: 1000}}>
        {/* <MyRecipesAndAchievementsTab /> */}
      </View>
      
      <Button
        title='Settings'
        onPress={() => navigation.navigate('Settings')} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Settings({ navigation }) {
  return (
    <View>
      <Text>
        This is the settings page
      </Text>
      <Button
        title='Profile'
        onPress={() => navigation.navigate('My Profile')} />
        <BackButton navigation={(navigation)} />
    </View>
  );
}

function DisplayCooksona({ navigation }) {
  return (
    <View>
      <Text>
        This is the select Cooksona screen
      </Text>
      <Button
        title='Profile'
        onPress={() => navigation.navigate('My Profile')} />
         
    </View>
  );
}

// Remove unnecessary CheckIt function

function userAchievements({navigation}){
  return <View />
}

function userRecipes({navigation}){
  return <View />
}


export default function ProfileScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <BackButton />
        ),
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name='My Profile'
        component={Profile}
        options={{
          headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen name='Settings' component={Settings}
       
      />
      <Stack.Screen name='DisplayCooksona' component={DisplayCooksona} />
    </Stack.Navigator>
  );
}
