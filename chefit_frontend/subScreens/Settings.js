import React from 'react';
<<<<<<< HEAD
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// For navigation
const Stack = createNativeStackNavigator()

=======
import { Button, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

import SwitchToggle from '../components/switch.js';

import ResetEmail from './ResetEmail';
import ResetPassword from './ResetPassword';
import ResetUsername from './ResetUsername';

import BackButton from '../components/BackButton';

// For navigation
const Stack = createStackNavigator()

function Settings({navigation}){
    return(
        <View style={styles.container}>
            <ScrollView style={{marginBottom: 100}}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Account</Text>
                </View>

                <View style={styles.row}>
                    <Pressable style={styles.rowItem} onPress={() => navigation.navigate('Reset Username')}>
                        <Text style={styles.rowText}>Username</Text>
                        <Text style={styles.rowValue}>Test User</Text>
                    </Pressable>
                </View>
                
                <View style={styles.row}>
                    <Pressable style={styles.rowItem} onPress={() => navigation.navigate('Reset Email')}>
                        <Text style={styles.rowText}>Email Address</Text>
                        <Text style={styles.rowValue}>randomemail@gmail.com</Text>
                    </Pressable>
                </View>

                <View style={styles.row}>
                    <Pressable style={styles.rowItem} onPress={() => navigation.navigate('Reset Password')}>
                        <Text style={styles.rowText}>Password</Text>
                        <Text style={styles.rowValue}>••••••••••</Text>
                    </Pressable>
                </View>

                <View style={styles.row}>
                    <Pressable style={styles.rowItem}>
                        <Text style={styles.rowText}>Subscription Plan</Text>
                        <Text style={styles.rowValue}>Standard Plan</Text>
                    </Pressable>
                </View>

                <View style={styles.row}>
                    <Pressable style={styles.rowItem}>
                        <Text style={styles.rowText}>Payment Method</Text>
                        <Text style={styles.rowValue}>Visa Ending in 4444</Text>
                    </Pressable>
                </View>

                <View style={styles.row}>
                    <Pressable style={styles.rowItem}>
                        <Text style={styles.rowText}>Log Out</Text>
                        <View style={styles.rowValue}>
                            <Image source={require('../assets/buttons/logoutButton.png')} style={{width: 20, height: 22.94, resizeMode: 'contain'}} />
                        </View>
                    </Pressable>
                </View>

                <View style={styles.row}>
                    <Pressable style={styles.rowItem}>
                        <Text style={styles.rowText}>Delete Account</Text>
                        <View style={styles.rowValue}>
                        <Image source={require('../assets/buttons/deleteAccount.png')} style={{width: 20, height: 22.94, resizeMode: 'contain'}} />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Accessibility</Text>
                </View>
                <View style={styles.row}>
                    <Pressable style={styles.rowItem}>
                        <Text style={styles.rowText}>Increase Contrast </Text>
                        <View style={styles.rowValue}>
                            <SwitchToggle />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <Pressable style={styles.rowItem}>
                        <Text style={styles.rowText}>Reduce Motion </Text>
                        <View style={styles.rowValue}>
                            <SwitchToggle />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <Pressable style={styles.rowItem}>
                        <Text style={styles.rowText}>Larger Text</Text>
                        <View style={styles.rowValue}>
                            <SwitchToggle />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <Pressable style={styles.rowItem}>
                        <Text style={styles.rowText}>Voice Over </Text>
                        <View style={styles.rowValue}>
                            <SwitchToggle />
                        </View>
                    </Pressable>
                </View>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Privacy</Text>
                </View>
                <View style={styles.row}>
                    <Pressable style={styles.rowItem}>
                        <Text style={styles.rowText}>Make My Profile Private</Text>
                    </Pressable>
                </View>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Notifications</Text>
                </View>
                <View style={styles.row}>
                    <Pressable style={styles.rowItem}>
                        <Text style={styles.rowText}>Receive Notifications </Text>
                    </Pressable>
                </View>
                <View style={{margin: 20}}></View>
            </ScrollView>
        </View>
    )
}


export default function SettingsScreen() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            fontFamily: 'Coiny_400Regular',
          },
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0, 
            shadowOpacity: 0, 
            borderBottomWidth: 0,
          },
          headerBackImage: () => (
            <BackButton />
          ),
        }}
      >
        <Stack.Screen
          name='Settings'
          component={Settings}
        />

        <Stack.Screen
          name='Reset Username'
          component={ResetUsername}
          options={{
            headerTitle: ''
          }}
        />

        <Stack.Screen
          name='Reset Email'
          component={ResetEmail}
          options={{
            headerTitle: ''
          }}
        />

        <Stack.Screen
          name='Reset Password'
          component={ResetPassword}
          options={{
            headerTitle: ''
          }}
        />
         
         
      </Stack.Navigator>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      marginTop: 18
    }, 
    heading:{
        backgroundColor: '#47A695',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        width: '100%',
    },
    rowItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    rowValue: {
        fontSize: 14,
        color: 'gray',
        padding: 3
    },
    headingText:{
        color: '#FEF3CD',
        fontWeight: 'bold',
        fontSize: 18,
    }
});
>>>>>>> b3179dfdcaf7cfd4ee06c96ee25775ebe19c44c9
