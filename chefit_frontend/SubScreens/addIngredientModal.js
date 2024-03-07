import React, { useState } from 'react';
import { View, Image, Text, Pressable, StyleSheet, Modal, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import SelectDropdown from 'react-native-select-dropdown';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc,
    getDoc,
    setDoc
} from "firebase/firestore";import { db } from "../API/firebase.config.js";
import { v4 } from "uuid";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../API/firebase.config.js";


const AddIngredientModal = ({ isModalVisible, setIsModalVisible, onSaveToPantry }) => {
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientCalories, setIngredientCalories] = useState('');
    const [ingredientCarbs, setIngredientCarbs] = useState('');
    const [ingredientProtein, setIngredientProtein] = useState('');
    const [ingredientFat, setIngredientFat] = useState('');
    const [ingredientType, setIngredientType] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [username, setUsername] = useState('user001'); // Set the default username



    const countries = [
        "Alcohol & Beverages",
        "Baking",
        "Bread",
        "Condiments",
        "Dairy & Eggs",
        "Fruits",
        "Meats & Proteins",
        "Oils & Dressing",
        "Pasta & Grains",
        "Spices & Seasonings",
        "Vegetables"
    ];

    const saveIngredientToDatabase = async () => {
        if (ingredientName && ingredientCalories && ingredientCarbs && ingredientProtein && ingredientFat && ingredientType && imageUrl) {
            try {
                const ingredientData = {
                    name: ingredientName,
                    calories: ingredientCalories,
                    carbs: ingredientCarbs,
                    protein: ingredientProtein,
                    fat: ingredientFat,
                    type: ingredientType,
                    image: imageUrl
                };
    
                // Reference to the user's document
                const userDocRef = doc(db, 'users', username);
    
                // Get the user's document snapshot
                const userDocSnapshot = await getDoc(userDocRef);
    
                // Check if the user's document exists
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
    
                    // Ensure userData.userIngredients is an array before spreading
                    const updatedUserIngredients = Array.isArray(userData.userIngredients) ? [...userData.userIngredients, ingredientData] : [ingredientData];
    
                    // Update the user's document with the new ingredients
                    await setDoc(userDocRef, { userIngredients: updatedUserIngredients }, { merge: true });
                } else {
                    console.error('User data not found for username: ', username);
                }
    
                // Clear input fields after saving
                setIngredientName('');
                setIngredientCalories('');
                setIngredientCarbs('');
                setIngredientProtein('');
                setIngredientFat('');
                setIngredientType('');
                setImageUrl('');
            } catch (error) {
                console.error("Error adding ingredient to database: ", error);
            }
        } else {
            alert("Please fill in all the fields.");
        }
    };
    const SavePantry = require('../assets/addRecipeButtons/SavePantry.png');
    const xImage = require('../assets/addRecipeButtons/x.png');

    const handleSaveToPantryPress = () => {
        onSaveToPantry();
        setIsModalVisible(false);
    };

    const handleAddImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                alert('Permission to access camera roll is required!');
                return;
            }
    
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            if (!pickerResult.canceled) {
                const localUri = pickerResult.uri;
                const imageName = v4() + '.jpg';
                const storageRef = ref(storage, `images/ingredients/${imageName}`);
    
                const response = await fetch(localUri);
                const blob = await response.blob();
    
                await uploadBytes(storageRef, blob);
                const url = await getDownloadURL(storageRef);
                setImageUrl(url);
            }
        } catch (error) {
            console.error('Error uploading image: ', error);
            alert('Error uploading image. Please try again.');
        }
    };
    return (
        <Modal visible={isModalVisible} transparent>
            <BlurView
                style={styles.blurEffect}
                tint="default"
                intensity={10}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.topContent}>
                            <Pressable onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                                <Image source={xImage} style={styles.backButton} />
                            </Pressable>
                        </View>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Tomato"
                            value={ingredientName}
                            onChangeText={setIngredientName}
                        />
                        <View style={styles.dropdownContainer}>
                        <SelectDropdown
                            style={styles.dropdown}
                            data={countries}
                            defaultButtonText="Type"
                            onSelect={(selectedItem, index) => {
                                setIngredientType(selectedItem); // Update the ingredientType state
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            dropdownStyle={styles.dropdown} // Apply same style as dropdown
                        />
                        </View>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Calories"
                            value={ingredientCalories}
                            onChangeText={setIngredientCalories}
                        />
                        <Pressable
                            style={styles.uploadButton}
                            onPress={handleAddImage}
                        >
                            <Text style={styles.uploadButtonText}>Upload Image</Text>
                        </Pressable>
                        <View style={styles.ingredientDetails}>
                            <View style={styles.detailContainer}>
                                <Text style={styles.ingredientDetailsLabel}>Carbs</Text>
                                <TextInput
                                    style={styles.modalSmallInput}
                                    placeholder="5g"
                                    value={ingredientCarbs}
                                    onChangeText={setIngredientCarbs}
                                />
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.ingredientDetailsLabel}>Protein</Text>
                                <TextInput
                                    style={styles.modalSmallInput}
                                    placeholder="0.8g"
                                    value={ingredientProtein}
                                    onChangeText={setIngredientProtein}
                                />
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.ingredientDetailsLabel}>Fat</Text>
                                <TextInput
                                    style={styles.modalSmallInput}
                                    placeholder="0.2g"
                                    value={ingredientFat}
                                    onChangeText={setIngredientFat}
                                />
                            </View>
                        </View>
                        <Pressable
                            onPress={() => {
                                setIsModalVisible(false)
                                saveIngredientToDatabase()
                            }}>
                            <Image source={SavePantry} style={styles.modalButton}></Image>
                        </Pressable>
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    blurEffect: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 320,
        marginBottom: 15
    },
    backButton: {
        width: 24,
        height: 24,
        marginBottom: 10
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    modalInput: {
        display: "flex",
        width: 341,
        height: 44,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#F2F2F2",
        color: "#5A5A5A",
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: -0.56,
        marginBottom: 10,
    },
    ingredientDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
        width: 'auto',
    },
    detailContainer: {
        alignItems: 'center',
        flex: 1,
    },
    ingredientDetailsLabel: {
        color: "#5A5A5A",
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    modalSmallInput: {
        width: 99,
        height: 44, // Adjust the height as needed
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#F2F2F2",
        color: "#5A5A5A",
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: -0.56,
        marginRight: 10,
        textAlign: 'center'
    },
    dropdownContainer: {
        width: 341,
        height: 44,
        borderRadius: 8, // Apply rounded borders
        backgroundColor: "#F2F2F2",
        marginBottom: 10,
        justifyContent: "center",
        overflow: 'hidden', // Ensure that the dropdown content doesn't overflow the rounded borders
    },
    dropdown: {
        padding: 12,
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: -0.56,
        textAlign: 'left', // Align text to the left
        textAlignVertical: 'center',
    },
    uploadButton: {
        width: 341,
        height: 44,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: "#F2F2F2",
        marginBottom: 10,
    },
    uploadButtonText: {
        color: "#5A5A5A",
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: -0.56,
    },
});

export default AddIngredientModal;