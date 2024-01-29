import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, Pressable, StyleSheet, TextInput, Switch } from 'react-native';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';


const RecipeScreen = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    const SaveRecipe = require('../assets/SaveRecipe.png')
    const AddImage = require('../assets/AddImage.png')
    const AddIngredient = require('../assets/addIngredient.png')

    return (
        <View style={styles.screenContainer}>
        <View style={styles.header}>
        <Text style={styles.title}>Create Recipe</Text>
        <Pressable><Image source = {SaveRecipe} style = {styles.saveButton}></Image></Pressable>
        </View>
        <View style={styles.addRecipeContainer}>
            <TextInput
            style={styles.recipeInput}
            placeholder={"Recipe Name"}>
            </TextInput>
            <TextInput
            style={styles.calories}
            placeholder={"Calories"}>
            </TextInput>
            <Image
            style={styles.recipeImage}
            source={AddImage}>
            </Image>
        </View>
        <View style={styles.ingredientsContainer}>
        <Image source={AddIngredient} style={styles.addIngredient}></Image>
        <TextInput
            style={styles.ingredientInput}
            placeholder={"Ingredient 1"}>
            </TextInput>
            <TextInput
            style={styles.ingredientInput}
            placeholder={"Ingredient 2"}>
            </TextInput>
            <TextInput
            style={styles.ingredientInput}
            placeholder={"Ingredient 3"}>
            </TextInput>
        </View>
        <View style={styles.directionsContainer}>
        <TextInput
            style={styles.directionsInput}
            placeholder={"Enter directions"}>
            </TextInput>
            <View style={styles.privateMode}>
            <Text style={styles.privateText}>Private Mode</Text>
            <Switch
        trackColor={{false: '#E9E9EA', true: '#47A695'}}
        thumbColor={isEnabled ? 'white' : 'white'}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
      />
      </View>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: "center",
      },
    header: {
        paddingTop: 20, // Adjust the padding to move the container down
        flexDirection: 'row',
      },
      addRecipeContainer: {
        paddingTop: 20,
        borderRadius: 12,
        borderColor: '#ECECEC',
        borderWidth: 1,
        width: 388,
        height: 515,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'space-evenly', // Change this line
        marginBottom: 20,
        shadowColor: '#1E4B43',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    
    ingredientsContainer: {
        paddingTop: 20,
        borderRadius: 12,
        borderColor: '#ECECEC',
        borderWidth: 1,
        width: 388,
        height: 250,
        flexShrink: 0,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#1E4B43',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    directionsContainer: {
        paddingTop: 20,
        borderRadius: 12,
        borderColor: '#ECECEC',
        borderWidth: 1,
        width: 388,
        height: 280,
        flexShrink: 0,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#1E4B43',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    directionsInput: {
        display: "flex",
        width: 341,
        height: 146,
        padding: 12,
        gap: 10,
        borderRadius: 8,
        backgroundColor: "#F2F2F2",
        color: "#5A5A5A",
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: -0.56,
        marginBottom: 10,
        paddingBottom: 100
    },
    privateMode: {
        display: "flex",
        flexDirection: 'row',
        width: 341,
        height: 60,
        padding: 12,
        gap: 180,
        borderRadius: 8,
        backgroundColor: "#F2F2F2",
        color: "#5A5A5A",
        fontWeight: 600,
        fontSize: 16,
        letterSpacing: -0.56,
        marginBottom: 10,
        alignItems: 'center'
    },
    privateText: {
        color: "#000",
        fontSize: 16,
        fontWeight: 600,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Coiny',
        marginRight: 75, // Add margin to increase spacing
      },
    recipeImage: {
        width: 340,
        height: 340,
        marginBottom: 20
    },
    saveButton: {
        width: 98, 
        height: 36,
    },
    recipeInput: {
        display: "flex",
        width: 341,
        height: 44,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 8,
        backgroundColor: "#F2F2F2",
        color: "#5A5A5A",
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: -0.56,
    },
    ingredientInput: {
        display: "flex",
        width: 341,
        height: 44,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 8,
        backgroundColor: "#F2F2F2",
        color: "#5A5A5A",
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: -0.56,
        marginBottom: 10
    },
    addIngredient: {
        width: 24,
        height: 24,
        marginLeft: 320,   
        marginBottom: 20
    },
    calories: {
        display: "flex",
        width: 341,
        height: 44,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 8,
        backgroundColor: "#F2F2F2",
        color: "#5A5A5A",
        fontFamily: "Montserrat",
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: -0.56
    }
  });
    
export default RecipeScreen