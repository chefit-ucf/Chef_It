import React from 'react'
import { useState } from 'react'
import { StyleSheet, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { Text } from '@rneui/themed'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function SignUpScreen({navigation}) {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const [email, setEmail] = useState('')

    // Validate First Name 
    const [checkFName, setCheckFName] = useState(false)

    const handleFName = (e) => {
        let regex = /^[^\d=?\\/@#%^&*()]+$/
        setFirstname(e)
        if (regex.test(e)) {
            setCheckFName(false)
        } else {
            setCheckFName(true)
        }
    }

    // Validate Last Name 
    const [checkLName, setCheckLName] = useState(false)

    const handleLName = (e) => {
        let regex = /^[^\d=?\\/@#%^&*()]+$/
        setLastname(e)
        if (regex.test(e)) {
            setCheckLName(false)
        } else {
            setCheckLName(true)
        }
    }

    // Validate Password 
    const [checkUpper, setCheckUpper] = useState(false)
    const [checkLower, setCheckLower] = useState(false)
    const [checkNum, setCheckNum] = useState(false)
    const [checkNonAlphaNum, setCheckNonAlphaNum] = useState(false)
    const handlePassword = (e) => {
        const containsUppercase = /^(?=.*[A-Z]).*$/
        const containsLowercase = /^(?=.*[a-z]).*$/
        const containsNumber = /^(?=.*[0-9]).*$/
        const containsNonAlphaNum = /^(?=.*[^a-zA-Z0-9]).*$/
        setPassword(e)
        setCheckUpper(true)
        setCheckLower(true)
        setCheckNum(true)
        setCheckNonAlphaNum(true)
        if (containsUppercase.test(e) && containsLowercase.test(e) && containsNumber.test(e) && containsNonAlphaNum.test(e)) {
            setCheckUpper(false)
            setCheckLower(false)
            setCheckNum(false)
            setCheckNonAlphaNum(false)
        } else if (!containsUppercase.test(e) && containsLowercase.test(e) && containsNumber.test(e) && containsNonAlphaNum.test(e)) {
            setCheckUpper(true)
            setCheckLower(false)
            setCheckNum(false)
            setCheckNonAlphaNum(false)
        } else if (containsUppercase.test(e) && !containsLowercase.test(e) && containsNumber.test(e) && containsNonAlphaNum.test(e)) {
            setCheckUpper(false)
            setCheckLower(true)
            setCheckNum(false)
            setCheckNonAlphaNum(false)
        } else if (containsUppercase.test(e) && containsLowercase.test(e) && !containsNumber.test(e) && containsNonAlphaNum.test(e)) {
            setCheckUpper(false)
            setCheckLower(false)
            setCheckNum(true)
            setCheckNonAlphaNum(false)
        } else if (containsUppercase.test(e) && containsLowercase.test(e) && containsNumber.test(e) && !containsNonAlphaNum.test(e)) {
            setCheckUpper(false)
            setCheckLower(false)
            setCheckNum(false)
            setCheckNonAlphaNum(true)
        } 
    }

    // Validate Confirm Password
    const [checkConfirmPass, setCheckConfirmPass] = useState(false)
    const handleConfirmPass = (e) => {
        setConfirmpassword(e)
        if (password === e) {
            setCheckConfirmPass(false)
            checkReg(false)
        } else {
            setCheckConfirmPass(true)
        }
    }

    // Validate Email
    const [checkEmail, setCheckEmail] = useState(false)

    const handleEmail = (e) => {
        let regex = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]/
        setEmail(e)
        if (regex.test(e)) {
            setCheckEmail(false)
        } else {
            setCheckEmail(true)
        }
    }

    const [reg, checkReg] = useState(true)
    const checkRegistration = () => {
        if (!reg && !checkFName && !checkLName && !checkUpper && !checkLower && !checkNum && !checkNonAlphaNum && !checkConfirmPass && !checkEmail) {
            navigation.navigate("Home")
        } 
    }

    return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity style={styles.backButton} onPress={()=> navigation.goBack()}>
          <Image source={require('../assets/buttons/backButton.png')} style={styles.backButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
      <Text style={styles.titleText}>Sign Up Now</Text>
      <Text style={styles.introText}>Please Fill Out Entire Form to Continue</Text>
      <View style={styles.loginContainer}>
          <TextInput style={styles.input} testID="firstname" placeholder='First Name' value={firstname} onChangeText={text=>handleFName(text)}/>
      {checkFName? (
        <Text style={styles.errorText}>Error: Can only include letters & symbols, no numbers</Text> ) : ( <Text></Text>)
      }
          <TextInput style={styles.input} testID="lastname" placeholder='Last Name' value={lastname} onChangeText={text=>handleLName(text)}/>
      {checkLName? (
        <Text style={styles.errorText}>Error: Can only include letters & symbols, no numbers</Text> ) : ( <Text></Text>)
      }
          <TextInput style={styles.input} testID="email" placeholder='Email' value={email} onChangeText={text=>handleEmail(text)}/>
      {checkEmail? (
        <Text style={styles.errorText}>Error: Email must contain @ and '.'</Text> ) : ( <Text></Text>)
      }
          <TextInput style={styles.input} testID="username" placeholder='Username' value={username} onChangeText={text=>setUsername(text)}/>
      <Text></Text>
          <TextInput style={styles.input} testID="password" placeholder='Password' value={password} secureTextEntry onChangeText={text=>handlePassword(text)}/>
      <Text></Text>
          <TextInput style={styles.input} testID="confirmpassword" placeholder='Confirm Password' secureTextEntry value={confirmpassword} onChangeText={text=>handleConfirmPass(text)}/>
      </View>
      {checkUpper? (
        <Text style={styles.errorText}>Password must have at least one Uppercase Character</Text> ) : ( <Text></Text>)
      }
      {checkLower? (
        <Text style={styles.errorText}>Password must have at least one Lowercase Character</Text> ) : ( <Text></Text>)
      }
      {checkNum? (
        <Text style={styles.errorText}>Password must contain at least one Number</Text> ) : ( <Text></Text>)
      }
      {checkNonAlphaNum? (
        <Text style={styles.errorText}>Password must contain at least one Non-Alpha Numeric Character</Text> ) : ( <Text></Text>)
      }
      {checkConfirmPass? (
        <Text style={styles.errorText}>Does not match password entered</Text> ) : ( <Text></Text>)
      }
      <TouchableOpacity style={styles.button} onPress={() => checkRegistration()}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAF8',
    minHeight: "100%"
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
      fontSize: 50,
      color: "#F7B49B",
      fontFamily: 'Coiny_400Regular',
      padding: 15,
      maeginTop: 30
    },
    introText: {
      fontSize: 18,
      paddingTop: 10,
      color: "#42A797",
      marginBottom: 25
    },
    button: {
        backgroundColor: "#42A797",
        padding: 12,
        paddingHorizontal: 50,
        borderRadius: 50,
        margin: 15,
        marginTop: 20,
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
        paddingHorizontal: 30
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "#E8E8E8",
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginVertical: 3,
        borderRadius: 30,
        shadowColor: "#494949",
            shadowOffset: {
                width: 0,
                height: 3,
            },
        shadowOpacity: 0.3
    },
    errorText: {
      marginTop: 5,
      color: "#fc0330",
      fontWeight: 'bold',
      textAlign: "center"
    }
});