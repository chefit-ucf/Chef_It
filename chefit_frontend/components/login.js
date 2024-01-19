import React from 'react'
import { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()

const loginData = ([
    {username: "test", password: "Test1@"},
])

export default function LoginScreen({navigation}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginMsg, setLoginMsg] = useState(false)

    const checkLogin = (username,password) => {
    const userInput = loginData.map(item => {
      if (item.username === username && item.password === password) {
        setLoginMsg(false)
        navigation.navigate("Home")
      } else {
        setLoginMsg(true)
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Login</Text>
      <Text style={styles.introText}>Welcome back you've been missed!</Text>
      <br></br>
      <View style={styles.loginContainer}>
          <TextInput style={styles.input} placeholder='Username/Email' value={username} onChangeText={text=>setUsername(text)}/>
      </View>
      <View style={styles.loginContainer}>
          <TextInput style={styles.input} placeholder='Password' value={password} secureTextEntry onChangeText={text=>setPassword(text)}/>
      </View>
      <br></br>
      {loginMsg? (
        <Text style={styles.errorText}>Invalid Username or Password. Try Again</Text> ) : ( <Text></Text>)
      }
      <TouchableOpacity style={styles.button} onPress={() => checkLogin(username,password)}>
                <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.accountText}>Don't have an account?</Text>
      <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 50,
    color: "#F7B49B",
    fontWeight: 'bold',
    padding: 15
  },
  introText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    marginBottom: 75,
    shadowColor: "#494949",
        shadowOffset: {
            width: 0,
            height: 5,
        },
    shadowOpacity: 0.3
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
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