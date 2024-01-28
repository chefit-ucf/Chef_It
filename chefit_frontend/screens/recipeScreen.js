import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, ScrollView, Pressable, StyleSheet, TextInput, flex, center, normal } from 'react-native';

const RecipeScreen = () => {

const SaveRecipe = require('../assets/SaveRecipe.png')
const AddImage = require('../assets/AddImage.png')


    return (
        <View style={styles.screenContainer}>
        <Text style={styles.title}>Create Recipe</Text>
        <Pressable><Image source = {SaveRecipe} style = {styles.saveButton}></Image></Pressable>
        <View style={styles.addRecipeContainer}>
            <TextInput
            style={styles.recipeName}
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
        </View>
    )
}
const styles = StyleSheet.create({
    screenContainer: {
        alignItems: "center",
    },
    addRecipeContainer: {
        borderRadius: 12,
        borderWidth: 1,
        color: "#ECECEC",
        backgroundColor: "#FFF",
        // boxShadow: 0.5px 0.5px 32px -12px rgba(156, 156, 156, 0.52);
        width: 388,
        height: 515,
        flexShrink: 0,
        shadowColor: 'rgba(52, 52, 52, 0.8)',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,

    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    recipeImage: {
        width: 150,
        height: 150,
        marginBottom: 50
    },
    saveButton: {
        width: 80, 
        height: 80,
        resizeMode: 'contain', 
        textAlign: 'center'    
    },
    recipeName: {
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