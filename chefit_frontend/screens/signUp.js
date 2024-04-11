import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase'; // Import Firebase Auth and Firestore
import { collection, setDoc, doc, getDoc } from 'firebase/firestore'; // Import Firestore methods



export default function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [email, setEmail] = useState('');
   

    // Validation states
    const [checkUpper, setCheckUpper] = useState(false);
    const [checkLower, setCheckLower] = useState(false);
    const [checkNum, setCheckNum] = useState(false);
    const [checkNonAlphaNum, setCheckNonAlphaNum] = useState(false);
    const [checkConfirmPass, setCheckConfirmPass] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [reg, checkReg] = useState(true)
    const [Emailerror, setEmailError] = useState(false); //email already used
    const [Usererror, setUserError] = useState(false); // user already used


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

    const handleConfirmPass = (e) => {
        setConfirmpassword(e)
        if (password === e) {
            setCheckConfirmPass(false)
            checkReg(false)
        } else {
            setCheckConfirmPass(true)
        }
    }

    const handleEmail = (e) => {
      let regex = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]/
      setEmail(e)
      if (regex.test(e)) {
          setCheckEmail(false)
      } else {
          setCheckEmail(true)
      }
  }


  const handleRegistration = async () => {
    

    if (!reg  && !checkUpper && !checkLower && !checkNum && !checkNonAlphaNum && !checkConfirmPass && !checkEmail) {
        try {
            const userDocRef = doc(db, 'users', username);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                console.error('Username already exists');
                setUserError(true);
                return;
            } else{
                setUserError(false);
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user) {
                console.error('Failed to create user');
                setUserError(true);
                return;
            }      
            // Add user data to Firestore
            await setDoc(doc(db, 'users', username), {
            username: username,
            UID: user.uid,
            achievements: [{
              "achievementID": "achieve001",
              "title": "Recipe Pioneer",
              "UnlockedDescription": "Create your first Recipe!",
              "LockedDescription": "Hint: Try adding a Recipe!",
              "trigger": false,
              "UnlockedImage" : "https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FachievementImages%2Ffirstrecipe_logo.png?alt=media&token=24333059-8360-4271-961f-e80bb4ec6eae",
              "LockedImage": "https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FachievementImages%2FlockedAchievement.png?alt=media&token=d5861753-3343-4d85-b658-cbd09d513e03",
              "lockedReward": "https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FachievementImages%2FlockedAchievement_image.png?alt=media&token=450f75f1-a3c8-4134-82d8-d3abf963834c",
              "rewardImage": "https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FachievementImages%2Ffirstrecipe_rewardImage.png?alt=media&token=7e064dce-9222-4c82-8cf1-22830b340235",
              "timeTriggered": "",
            }, {
              
                "LockedDescription": "Hint: Go check out our Cooksonas!",
                "LockedImage": "https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FachievementImages%2FlockedAchievement.png?alt=media&token=d5861753-3343-4d85-b658-cbd09d513e03",
                "UnlockedDescription": "Changed your Cooksona for the first time!",
                "UnlockedImage": "https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FachievementImages%2Ffacelift_logo.png?alt=media&token=ea226e05-2e4e-48c9-87dd-a51dbd5374d7",
                "achievementID": "achieve002",
                "lockedReward": "https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FachievementImages%2FlockedAchievement_image.png?alt=media&token=450f75f1-a3c8-4134-82d8-d3abf963834c",
                "rewardImage": "https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FachievementImages%2Ffacelift_rewardImage.png?alt=media&token=3fc6dc73-f683-4a3a-92a8-05f7b4fe519c",
                "title": "Flavorful Facelift",
                "trigger": false,
                "timeTriggered": "",
            }],
            recipes:[],
            savedRecipes:[],
            userAvatar:"https://firebasestorage.googleapis.com/v0/b/chef-it-fdbea.appspot.com/o/images%2FCooksonas%2Fpancakes_withbackground.png?alt=media&token=38d2e61e-f2f5-42e5-b061-0e310b3ea17c",
            userIngredients:[],
        });
            navigation.navigate('Home'); // take back to homescreen
        }    
        catch (error) {
            console.error('Registration error:', error.message);
            if (error.code == 'auth/email-already-in-use') { // check if email is already in firebase auth database
                console.error('email already exists');
                setEmailError(true)
            } else {
                console.error(error);
              }
        }
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
      <Text style={styles.titleText}>Sign Up Now</Text>
      <Text style={styles.introText}>Please Fill Out Entire Form to Continue</Text>
      <View style={styles.loginContainer}>
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
      {Usererror? (
        <Text style={styles.errorText}>Username already in use</Text> ) : ( <Text></Text>)
      }
      {Emailerror? (
        <Text style={styles.errorText}>Email already in use</Text> ) : ( <Text></Text>)
      }
      <TouchableOpacity style={styles.button} onPress={() => handleRegistration()}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FAF8',
        minHeight: '100%',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'left',
        justifyContent: 'left',
        backgroundColor: '#F8FAF8',
        padding: 10,
        marginTop: 30,
    },
    backButton: {
        width: 35,
        height: 35,
        paddingLeft: 10,
        shadowColor: '#494949',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
    },
    titleText: {
        fontSize: 50,
        color: '#F7B49B',
        fontFamily: 'Coiny_400Regular',
        padding: 15,
        marginTop: 30,
    },
    introText: {
        fontSize: 18,
        paddingTop: 10,
        color: '#42A797',
        marginBottom: 25,
    },
    button: {
        backgroundColor: '#42A797',
        padding: 12,
        paddingHorizontal: 50,
        borderRadius: 50,
        margin: 15,
        marginTop: 20,
        shadowColor: '#494949',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
    },
    buttonText: {
        fontSize: 22,
        fontFamily: 'Coiny_400Regular',
        color: 'white',
    },
    loginContainer: {
        width: '100%',
        paddingHorizontal: 30,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginVertical: 3,
        borderRadius: 30,
        shadowColor: '#494949',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
    },
    errorText: {
        marginTop: 5,
        color: '#fc0330',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});