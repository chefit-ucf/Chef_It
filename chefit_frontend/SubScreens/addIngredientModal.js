import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, ScrollView, Pressable, StyleSheet, Dimensions, Modal, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';


const AddIngredientModal = ({ isModalVisible, setIsModalVisible, onSaveToPantry }) => {
    const [ingredientName, setingredientName] = useState('');
    const [ingredientCalories, setingredientCalories] = useState('');
    const [ingredientCarbs, setIngredientCarbs] = useState('');
    const [ingredientProtein, setIngredientProtein] = useState('');
    const [ingredientFat, setIngredientFat] = useState('');
    const [ingredientType, setIngredientType] = useState('');



  
    const SavePantry = require('../assets/addRecipeButtons/SavePantry.png');
    const xImage = require('../assets/addRecipeButtons/x.png')

    const handleSaveToPantryPress = () => {
        // pantry logic here
        onSaveToPantry();
    
        setIsModalVisible(false);
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
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Type"
                        value={ingredientType}
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Calories"
                        value={ingredientCalories}
                    />
                   <View style={styles.ingredientDetails}>
                        <View style={styles.detailContainer}>
                            <Text style={styles.ingredientDetailsLabel}>Carbs</Text>
                            <TextInput
                                style={styles.modalSmallInput}
                                placeholder="5g"
                                value={ingredientCarbs}
                            />
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.ingredientDetailsLabel}>Protein</Text>
                            <TextInput
                                style={styles.modalSmallInput}
                                placeholder="0.8g"
                                value={ingredientProtein}
                            />
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.ingredientDetailsLabel}>Fat</Text>
                            <TextInput
                                style={styles.modalSmallInput}
                                placeholder="0.2g"
                                value={ingredientFat}
                            />
                        </View>
                    </View>
                    <Pressable 
                    onPress={() => {
                        setIsModalVisible(false)
                        handleSaveToPantryPress()
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
        width: '100%',
        height: '100%',
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
        width: 388,
        height: 369,
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
        height: 44,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#F2F2F2",
        color: "#5A5A5A",
        fontSize: 16,
fontWeight: '600',        
letterSpacing: -0.56,
        flex: 1,
        marginRight: 10,
        textAlign: 'center'
    },
    modalButton: {
        marginTop: 25,
        width: 143,
        height: 44,
    },
    backButton: {
        width: 30, 
        height: 30, 
      },
});

export default AddIngredientModal;