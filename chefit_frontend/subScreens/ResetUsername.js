import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth } from '../config/firebase'; // Import your Firebase Firestore configuration
import { query, collection, where, getDocs, setDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore'; // Import necessary Firestore functions

export default function ResetUsername({ navigation }) {
    const [username, setUsername] = useState('');
    const [confirmUsername, setConfirmUsername] = useState('');
    const [usernameValidation, setUsernameValidation] = useState({
        checkUpper: false,
        checkLower: false,
        checkMinLength: false,
    });
    
    const [successMessage, setSuccessMessage] = useState('');

    const containsUppercase = /^(?=.*[A-Z]).*$/;
    const containsLowercase = /^(?=.*[a-z]).*$/;

    const handleUsernameChange = (text) => {
        setUsername(text);
        setUsernameValidation({
            ...usernameValidation,
            checkUpper: containsUppercase.test(text),
            checkLower: containsLowercase.test(text),
            checkMinLength: text.length >= 8,
        });
    };

    const handleConfirmUsernameChange = (text) => {
        setConfirmUsername(text);
    };

    const handleResetUsername = async () => {
        
            try {

                if(username !== confirmUsername){
                    console.log(successMessage)
                    setSuccessMessage("Make sure both fields match")
                    return;
                }

                
                const user = auth.currentUser;
                if (!user) {
                    console.log('User not authenticated');
                    return;
                }
    
                const currentUserUID = user.uid;
                const usersQuery = query(collection(db, 'users'), where('UID', '==', currentUserUID));
                const querySnapshot = await getDocs(usersQuery);
    
                if (querySnapshot.empty) {
                    console.log("User data not found");
                    return;
                }
    
                const userData = querySnapshot.docs[0].data();
                const oldUsername = userData.username;
                console.log(userData.username)
    
                const usersCollection = collection(db, 'users');
                
                await updateDoc(doc(db, 'users', oldUsername), {
                    username: username
                })

                const UpdateduserDoc = doc(usersCollection, username);

                // Create a new document with the updated username
                await setDoc(UpdateduserDoc, userData);

                await updateDoc(doc(db, 'users', username), {
                    username: username
                })

                console.log(userData.username)
                // Delete the old document with the previous username
                await deleteDoc(doc(usersCollection, oldUsername));
                setSuccessMessage('Username reset successful');

                console.log('Username reset successful');
                
    
            } catch (error) {
                setSuccessMessage('Username reset failed');
                console.error('Error resetting username:', error);
                
            }
    };
    

    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.heading}>Reset Username</Text>
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="New Username"
                    value={username}
                    onChangeText={handleUsernameChange}
                />
            </View>
            <View style={styles.inputContainer}>      
                <TextInput
                    style={styles.textInput}
                    placeholder="Confirm Username"
                    value={confirmUsername}
                    onChangeText={handleConfirmUsernameChange}
                />
            </View>
            
            
                <View style={styles.requirementContainer}>
                <Text style={styles.requirementHeading}>New Username Must Contain:</Text>
                    
                    <View style={styles.requirementItem}>
                        {usernameValidation.checkMinLength 
                        ? (
                            <Image source={require('../assets/actionIcons/item_checked.png')} style={{ width:  25, height:  25 }} />
                        ) : (
                            <Image source={require('../assets/actionIcons/unchecked_button.png')} style={{ width:  25, height:  25 }} />
                        )}
                        <Text style={styles.text}>Min. 8 characters</Text>
                    </View>

                    <View style={styles.requirementItem}>
                        {usernameValidation.checkUpper ? (
                            <Image source={require('../assets/actionIcons/item_checked.png')} style={{ width:  25, height:  25 }} />
                        ) : (
                            <Image source={require('../assets/actionIcons/unchecked_button.png')} style={{ width:  25, height:  25 }} />
                        )}
                        <Text style={styles.text} >Uppercase Letter </Text>
                    </View>

                    <View style={styles.requirementItem}>
                        {usernameValidation.checkLower ? (
                            <Image source={require('../assets/actionIcons/item_checked.png')} style={{ width:  25, height:  25 }} />
                        ) : (
                            <Image source={require('../assets/actionIcons/unchecked_button.png')} style={{ width:  25, height:  25 }} />
                        )}
                        <Text style={styles.text}>Lowercase Letter</Text>
                    </View>
                </View>

                {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
            
            <Pressable onPress={handleResetUsername} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 24,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 350,
        marginBottom: 34
    },
    textInput: {
        flex: 1,
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginBottom: 33
    },
    toggleButton: {
        marginLeft: 10,
    },
    toggleImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    requirementContainer: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        marginBottom: 20
    },
    requirementHeading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    text: {
        color: 'grey',
        fontSize: 16,
        marginLeft: 10
    },
    checkImage: {
        width: 25,
        height: 25
    },
    button:{
        width: 80,
        height: 32,
        backgroundColor: '#47A695',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 30
    },
    buttonText:{
        color: '#FEF3CD',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
