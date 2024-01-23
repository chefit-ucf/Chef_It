import React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the BackButton component
import BackButton from '../components/BackButton';

// For navigation
const Stack = createNativeStackNavigator();

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        this is the profile screen
      </Text>
      <Button
        title='Cooksona'
        onPress={() => navigation.navigate('DisplayCooksona')} />
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
        headerBackImageSource: () => (
          <Image
            source={require('../assets/actionIcons/backButton.png')}
            style={{ width: 36, height: 36 }}
          />
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
          headerBackImageSource: '',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
            textAlign: "center",
            flex: 1,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name='Settings' component={Settings} />
      <Stack.Screen name='DisplayCooksona' component={DisplayCooksona} />
    </Stack.Navigator>
  );
}
