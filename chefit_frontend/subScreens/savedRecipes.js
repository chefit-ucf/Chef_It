import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react'
import { useState } from 'react'

import { testuserInfo } from '../API/data.js';
import { recipeData } from '../API/recipeData.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SavedRecipesScreen() {
    let userSavedRecipes = testuserInfo.savedUserRecipes;
    let arrLength = userSavedRecipes.length;

    return (
        <View style={styles.container}>
            {Array.from({ length: arrLength }, (_, i) => (
                <View key={i} style={styles.recipeContainer}>
                    <TouchableOpacity>
                        <Image source={recipeData.recipeId[userSavedRecipes[i]].src} resizeMode='contain' 
                            style={{width: (windowWidth / 2) - 30, height: (windowWidth / 2) - 58, borderTopLeftRadius: 10, borderTopRightRadius: 10}}/>
                        <Text style={styles.titleText}>{recipeData.recipeId[userSavedRecipes[i]].title}</Text>
                        <Text style={styles.userText}>By {recipeData.recipeId[userSavedRecipes[i]].username}</Text>
                        <Text style={styles.timeText}>{recipeData.recipeId[userSavedRecipes[i]].timer.duration} {recipeData.recipeId[userSavedRecipes[i]].timer.unit}</Text>
                        <Text style={styles.rating}>{recipeData.recipeId[userSavedRecipes[i]].rating}</Text>
                    </TouchableOpacity>
                </View>
            ))} 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "#F8FAF8",
        padding: 20,
        display: 'grid',
        flexDirection: 'row',
        gap: 30,
        justifyContent: 'center', 
    },
    recipeContainer: {
        backgroundColor: "white",
        width: (windowWidth / 2) - 30,
        height: 275,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    titleText: {
        fontSize: 14,
        fontWeight: 'bold',
        margin: 10
    },
    userText: {
        fontSize: 11,
        color: "grey",
        marginLeft: 10
    },
    timeText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#42A797',
        marginLeft: 10,
        marginTop: 5
    },
    rating: {
        marginLeft: 8,
        marginTop: 10,
        fontSize: 18,
        color: '#F7D47C'
    }
});