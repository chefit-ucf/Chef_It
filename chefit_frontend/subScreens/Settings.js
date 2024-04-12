import React from 'react';
import { Button, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase'; // Import your Firebase Firestore configuration
import { query, collection, where, onSnapshot } from 'firebase/firestore'; 


import * as Updates from 'expo-updates';

import SwitchToggle from '../components/switch';

import ResetEmail from './ResetEmail';
import ResetPassword from './ResetPassword';
import ResetUsername from './ResetUsername';

import BackButton from '../components/BackButton';

// For navigation
const Stack = createStackNavigator()


function Settings({navigation}){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [privateStatus, setPrivateStatus] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            const fetchUserData = async () => {
                try {
                    const user = auth.currentUser;
                    if (user) {
                        const currentUserUID = user.uid;
                        setEmail(user.email);
    
                        const unsubscribe = onSnapshot(
                            query(collection(db, 'users'), where('UID', '==', currentUserUID)),
                            (querySnapshot) => {
                                if (!querySnapshot.empty) {
                                    const userData = querySnapshot.docs[0].data();
                                    if (userData.username) {
                                        setUsername(userData.username);
                                    } else {
                                        console.log('no username');
                                    }
                                    if (userData.private) {
                                        setPrivateStatus(true);
                                    }
                                } else {
                                    console.log('User data not found.');
                                }
                            }
                        );
                        return unsubscribe;
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
            };
    
            fetchUserData();
        }, [])
    );

    const handleLogout = async () => {
        try {
            await auth.signOut(); // Sign out the user
            await Updates.reloadAsync();
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    }
    



    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Account</Text>
                </View>

                <View style={styles.row}>
                    <Pressable style={styles.rowItem} onPress={() => navigation.navigate('Reset Username')}>
                        <Text style={styles.rowText}>Username</Text>
                        <Text style={styles.rowValue}>{username}</Text>
                    </Pressable>
                </View>
                
                <View style={styles.row}>
                    <Pressable style={styles.rowItem} onPress={() => navigation.navigate('Reset Email')}>
                        <Text style={styles.rowText}>Email Address</Text>
                        <Text style={styles.rowValue}>{email}</Text>
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
                    <Pressable style={styles.rowItem} onPress={handleLogout}>
                        <Text style={styles.rowText}>Log Out</Text>
                        <View style={styles.rowValue}>
                            <Image source={require('../assets/actionIcons/logoutButton.png')} style={{width: 20, height: 22.94, resizeMode: 'contain'}} />
                        </View>
                    </Pressable>
                </View>

                <View style={styles.row}>
                    <Pressable style={styles.rowItem}>
                        <Text style={styles.rowText}>Delete Account</Text>
                        <View style={styles.rowValue}>
                        <Image source={require('../assets/actionIcons/deleteAccount.png')} style={{width: 20, height: 22.94, resizeMode: 'contain'}} />
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
            </ScrollView>
        </SafeAreaView>
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
          },
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0, 
            shadowOpacity: 0, 
            borderBottomWidth: 0,
          },
         
        }}
      >
        <Stack.Screen
          name='Settings'
          component={Settings}
          options={{
            headerBackImage: () => (
                <BackButton />
              ),
          }}
        />

        <Stack.Screen
          name='Reset Username'
          component={ResetUsername}
          options={{
            headerTitle: '',
            headerBackImage: () => (
                <BackButton />
              ),
          }}
        />

        <Stack.Screen
          name='Reset Email'
          component={ResetEmail}
          options={{
            headerTitle: '',
            headerBackImage: () => (
                <BackButton />
              ),
          }}
        />

        <Stack.Screen
          name='Reset Password'
          component={ResetPassword}
          options={{
            headerTitle: '',
            headerBackImage: () => (
                <BackButton />
              ),
          }}
        />
         
         
      </Stack.Navigator>
    );
  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
      alignItems: 'stretch',
      paddingBottom: 145,
      
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
