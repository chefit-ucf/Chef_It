import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react'
import { useState } from 'react'
import { Tab, TabView} from '@rneui/themed'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-web';


export default function RecipeIdeasScreen() {
    return (
        <View style={styles.container}>
            <Text>Recipe Ideas Screen</Text>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAF8"
    },
});