import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed'
import { useFonts, Montserrat_300Light,Montserrat_400Regular,Montserrat_600SemiBold,Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()

export default function WelcomeScreen({navigation}) {
    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold
    })
    if (!fontsLoaded) {
        return <Text>Loading...</Text>
    }
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logos/logo1.png')} style={{width: 400, height: 400}} />
            <Text style={styles.titleText}>BEGIN YOUR COOKING JOURNEY</Text>
            <Text style={styles.introText}>Explore new recipes and unlock CookSona characters: Your culinary adventure awaits!</Text>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        flex: 1,
        backgroundColor: '#FFCCBA',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontFamily: "Montserrat_600SemiBold",
        fontSize: 35,
        textAlign: 'center',
        color: "white",
        fontWeight: "bold",
        padding: 15,
        paddingHorizontal: 20,
        marginTop: 50
    },
    introText: {
        fontFamily: "Montserrat_500Medium",
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        color: "#42A797",
        paddingHorizontal: 30,
        marginBottom: 20
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
    button2: {
        backgroundColor: '#42A797',
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