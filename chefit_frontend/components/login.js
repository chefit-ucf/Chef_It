import React from 'react'
import { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import { Text } from '@rneui/themed'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

const loginData = ([
    {username: "Test", password: "Test1@"},
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
      <View style={styles.backContainer}>
            <TouchableOpacity style={styles.backButton}
                onPress={()=> navigation.goBack()}>
                <ArrowLeftIcon size="20" color="black" />
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
      <TouchableOpacity style={styles.button} onPress={() => checkLogin(username,password)}>
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
    backgroundColor: "#F7D47C",
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    margin: 15,
    padding: 10,
    shadowColor: "#494949",
        shadowOffset: {
            width: 0,
            height: 3,
        },
    shadowOpacity: 0.3
  },
  titleText: {
    fontSize: 50,
    color: "#F7B49B",
    fontWeight: 'bold',
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