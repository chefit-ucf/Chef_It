import React from 'react';
import { Button, View, Text, Image, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Import the BackButton component
import BackButton from '../components/BackButton';

// For navigation
const Stack = createStackNavigator();

// useState for user avatar
const [userAvatar, setUserAvatar] = "";

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <View style={{width: 200, height: 200, backgroundColor: '#F9B59E'}}>
      
      
      <Pressable onPress={() => navigation.navigate('DisplayCooksona')}>
        <Image
        source={require('../assets/actionIcons/editCooksonaIcon.png')}
        style={{width: 22, height: 22}}/> 
      </Pressable>
      
      </View>
      <Text>
        Username
      </Text>
      
      <Button
        title='Settings'
        onPress={() => navigation.navigate('Settings')} />
        
    </View>
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
