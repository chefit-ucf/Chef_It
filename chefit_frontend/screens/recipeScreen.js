import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, ScrollView, Pressable, StyleSheet, } from 'react-native';

const RecipeScreen = () => {

const SaveImage = require('../assets/SaveRecipe.png')

    return (
        <View>
        <Text>Create Recipe</Text>
        <Pressable><Image source = {SaveImage} style = {styles.saveButton}></Image></Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    saveButton: {
        width: 80, 
        height: 80,
        resizeMode: 'contain', 
        textAlign: 'center'    }
  });
    
export default RecipeScreen