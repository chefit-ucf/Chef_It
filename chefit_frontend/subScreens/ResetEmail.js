import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../config/firebase'; // Import your Firebase configuration

export default function ResetEmail({ navigation }) {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [emailValidation, setEmailValidation] = useState(false);

    const validateEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(text);
        setEmailValidation(emailRegex.test(text));
    };

    const handleCurrentPassword = (text) => {
        setCurrentPassword(text)
    }

    const handleConfirmEmailChange = (text) => {
        setConfirmEmail(text);
    };

    const [successMessage, setSuccessMessage] = useState('');

    const handleResetEmail = () =>{
    
            if (email !== confirmEmail) {
                setSuccessMessage('Emails do not match!');
                return;
            }
            if (!emailValidation) {
                setSuccessMessage('Email is not valid!');
                return;
            }
            const user = auth.currentUser;
            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email, 
                currentPassword
            );
            user.reauthenticateWithCredential(credential).then(() => {
                user.updateEmail(email).then(() => {
                    setSuccessMessage('Email updated successfully!');
                }).catch((error) => {
                    setSuccessMessage(error.message);
                });
            }).catch((error) => {
                setSuccessMessage(error.message);
            });
        };
    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Reset Email</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="New Email"
                    value={email}
                    onChangeText={validateEmail}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Confirm Email"
                    value={confirmEmail}
                    onChangeText={handleConfirmEmailChange}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    secureTextEntry
                    placeholder="Enter Current Password"
                    value={currentPassword}
                    onChangeText={handleCurrentPassword}
                />
            </View>
            <View style={styles.requirementContainer}>
                <Text style={styles.requirementHeading}>New Email Must Contain:</Text>
                <View style={styles.requirementItem}>
                    {emailValidation ? (
                        <Image source={require('../assets/actionIcons/item_checked.png')} style={{ width: 25, height: 25 }} />
                    ) : (
                        <Image source={require('../assets/actionIcons/unchecked_button.png')} style={{ width: 25, height: 25 }} />
                    )}
                    <Text style={styles.text}>Valid Domain Name (e.g: .com, .org, .edu)</Text>
                </View>
                <View style={styles.requirementItem}>
                    {email.includes('@') ? (
                        <Image source={require('../assets/actionIcons/item_checked.png')} style={{ width: 25, height: 25 }} />
                    ) : (
                        <Image source={require('../assets/actionIcons/unchecked_button.png')} style={{ width: 25, height: 25 }} />
                    )}
                    <Text style={styles.text}>Contains '@' Symbol</Text>
                </View>
            </View>
            
            {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

            <Pressable onPress={handleResetEmail} style={styles.button}>
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
    button: {
        width: 80,
        height: 32,
        backgroundColor: '#47A695',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 30
    },
    buttonText: {
        color: '#FEF3CD',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
