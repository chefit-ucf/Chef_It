import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function MealPrepScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Meal Prep Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F8FAF8"
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold"
    }
});

