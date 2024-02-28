import React from 'react'
import { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { Text } from '@rneui/themed'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';
// backend additions
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';


export default function LoginScreen({navigation}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginMsg, setLoginMsg] = useState(false)


  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      console.log('User signed in successfully:', userCredential.user);
      setLoginMsg(false)
      navigation.navigate('Home');
    } catch (error) {
      console.error('Sign in failed:', error);
      setLoginMsg(true)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity style={styles.backButton} onPress={()=> navigation.goBack()}>
          <Image source={require('../assets/actionIcons/backButton.png')} style={styles.backButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
      <Text style={styles.titleText}>Login</Text>
      <Text style={styles.introText}>Welcome back you've been missed!</Text>
      <View style={styles.loginContainer}>
          <TextInput style={styles.input} placeholder='Username/Email' value={username} onChangeText={text=>setUsername(text)}/>
      </View>
      <View style={styles.loginContainer}>
          <TextInput style={styles.input} placeholder='Password' value={password} secureTextEntry onChangeText={text=>setPassword(text)}/>
      </View>
      {loginMsg? (
        <Text style={styles.errorText}>Invalid Username or Password. Try Again</Text> ) : ( <Text></Text>)
      }
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.accountText}>Don't have an account?</Text>
      <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAF8',
    minHeight: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    top: 0,
  },
  backContainer: {
    flexDirection: 'row',
    alignItem: "left",
    justifyContent: "left",
    backgroundColor: "#F8FAF8",
    padding: 10,
    marginTop: 30
  },
  backButton: {
    width: 35, 
    height: 35, 
    paddingLeft: 10,
    shadowColor: "#494949",
        shadowOffset: {
            width: 0,
            height: 5,
        },
    shadowOpacity: 0.5
  },
  titleText: {
    fontSize: 55,
    color: "#F7B49B",
    fontFamily: 'Coiny_400Regular',
    padding: 15,
    marginTop: 30
  },
  introText: {
    fontSize: 18,
    paddingTop: 10,
    color: "#42A797", 
    marginBottom:20,
    maxwidth: "50%"
  },
  button: {
    backgroundColor: "#F7D47C",
    padding: 12,
    paddingHorizontal: 40,
    borderRadius: 50,
    margin: 10,
    marginBottom: 65,
    shadowColor: "#494949",
        shadowOffset: {
            width: 0,
            height: 5,
        },
    shadowOpacity: 0.3
  },
  buttonText: {
    fontSize: 22,
    fontFamily: 'Coiny_400Regular',
    color: "white"
  },
  loginContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 5,
    shadowColor: "#494949",
        shadowOffset: {
            width: 0,
            height: 3,
        },
    shadowOpacity: 0.3
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30
  },
  errorText: {
    color: "#fc0330",
    fontWeight: 'bold'
  },
  accountText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    color: "#F7B49B",
    marginTop: 20
  },
  button2: {
    backgroundColor: "#42A797",
    padding: 12,
    paddingHorizontal: 40,
    borderRadius: 50,
    margin: 15,
    shadowColor: "#494949",
        shadowOffset: {
            width: 0,
            height: 5,
        },
    shadowOpacity: 0.3
  },
});


