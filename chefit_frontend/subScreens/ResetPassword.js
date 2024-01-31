import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPassword({ navigation }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState({
        checkUpper: false,
        checkLower: false,
        checkNum: false,
        checkNonAlphaNum: false,
        checkLength: false,
    });

    // State variables for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const containsUppercase = /^(?=.*[A-Z]).*$/;
    const containsLowercase = /^(?=.*[a-z]).*$/;
    const containsNumber = /^(?=.*[0-9]).*$/;
    const containsNonAlphaNum = /^(?=.*[^a-zA-Z0-9]).*$/;

    const handlePasswordChange = (text) => {
        setPassword(text);
        setPasswordValidation({
            ...passwordValidation,
            checkUpper: containsUppercase.test(text),
            checkLower: containsLowercase.test(text),
            checkNum: containsNumber.test(text),
            checkNonAlphaNum: containsNonAlphaNum.test(text),
            checkLength: text.length >= 8,
        });
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleResetPassword = () => {
        // handle backend stuff 
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Reset Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="New Password"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={handlePasswordChange}
                    />
                    <Pressable onPress={handleTogglePasswordVisibility} style={styles.toggleButton}>
                        <Image
                            source={showPassword ? require('../assets/actionIcons/showPassword_toggle.png') : require('../assets/actionIcons/hidePassword_toggle.png')}
                            style={styles.toggleImage}
                        />
                    </Pressable>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                    />
                    <Pressable onPress={handleToggleConfirmPasswordVisibility} style={styles.toggleButton}>
                        <Image
                            source={showConfirmPassword ? require('../assets/actionIcons/showPassword_toggle.png') : require('../assets/actionIcons/hidePassword_toggle.png')}
                            style={styles.toggleImage}
                        />
                    </Pressable>
                </View>
            
        <View style={styles.requirementContainer}>
        <Text style={styles.requirementHeading}>New Password Must Contain:</Text>
        <View style={styles.requirementItem}>
        {passwordValidation.checkUpper ? (
            <Image source={require('../assets/actionIcons/item_checked.png')} style={styles.checkImage} />
        ) : (
            <Image source={require('../assets/actionIcons/unchecked_button.png')} style={styles.checkImage} />
        )}
        <Text style={styles.text}>Uppercase Letter</Text>
        </View>
        <View style={styles.requirementItem}>
        {passwordValidation.checkLower ? (
            <Image source={require('../assets/actionIcons/item_checked.png')} style={styles.checkImage} />
        ) : (
            <Image source={require('../assets/actionIcons/unchecked_button.png')} style={styles.checkImage} />
        )}
        <Text style={styles.text}>Lowercase Letter</Text>
        </View>
        <View style={styles.requirementItem}>
        {passwordValidation.checkNonAlphaNum ? (
            <Image source={require('../assets/actionIcons/item_checked.png')} style={styles.checkImage} />
        ) : (
            <Image source={require('../assets/actionIcons/unchecked_button.png')} style={styles.checkImage} />
        )}
        <Text style={styles.text}>Special Character</Text>
        </View>
        <View style={styles.requirementItem}>
        {passwordValidation.checkNum ? (
            <Image source={require('../assets/actionIcons/item_checked.png')} style={styles.checkImage} />
        ) : (
            <Image source={require('../assets/actionIcons/unchecked_button.png')} style={styles.checkImage} />
        )}
        <Text style={styles.text}>A Number</Text>
        </View>
            <View style={styles.requirementItem}>
            {passwordValidation.checkLength ? (
                <Image source={require('../assets/actionIcons/item_checked.png')} style={styles.checkImage} />
            ) : (
                <Image source={require('../assets/actionIcons/unchecked_button.png')} style={styles.checkImage} />
            )}
                <Text style={styles.text}>Min 8 Characters</Text>
            </View>
        </View>

            <Pressable onPress={handleResetPassword} style={styles.button}>
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
