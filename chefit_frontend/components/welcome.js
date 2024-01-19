import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()

export default function WelcomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Image source={require('./logo1.png')} style={{width: 350, height: 350, marginBottom: 18}} />
            <Text style={styles.titleText}>Begin Your Cooking Journey</Text>
            <Text style={styles.introText}>Explore new recipes and unlock CookSona characters: Your culinary adventure awaits!</Text>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9B89D',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 35,
        textAlign: 'center',
        color: "white",
        fontWeight: "bold",
        padding: 15,
        paddingHorizontal: 20
    },
    introText: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        color: "black",
        paddingHorizontal: 30,
        marginBottom: 30
    },
    button: {
        backgroundColor: '#F7D47C',
        padding: 12,
        paddingHorizontal: 50,
        borderRadius: 50,
        margin: 10, 
        marginBottom: 100,
        flexDirection: "row",
        shadowColor: "#494949",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontWeight: "bold"
    }
})