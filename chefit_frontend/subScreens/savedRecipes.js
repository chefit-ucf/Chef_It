import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react'
import { useState } from 'react'

import { testuserInfo } from '../API/data.js';
import { recipeData } from '../API/recipeData.js';

const windowWidth = Dimensions.get('window').width;

export default function SavedRecipesScreen() {
    let userSavedRecipes = testuserInfo.savedUserRecipes;
    let arrLength = userSavedRecipes.length;

    const [savedRecipes, setSavedRecipes] = useState(userSavedRecipes.map(saved => ({ recipeId: saved, saved: true })));

    const handleSavePress = (index) => {
        setSavedRecipes(prevSavedRecipes => {
            const updatedSavedRecipes = [...prevSavedRecipes];
            updatedSavedRecipes[index].saved = !updatedSavedRecipes[index].saved;
            return updatedSavedRecipes;
        });
    };

    return (
        <ScrollView vertical>
            <View style={styles.container}>
            {Array.from({ length: arrLength }, (_, i) => (
                <View key={i} style={styles.recipeContainer}>
                    <TouchableOpacity>
                        <Image source={recipeData.recipeId[userSavedRecipes[i]].src} resizeMode='contain' 
                            style={{width: 180, height: 153, borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20}}/>
                        <Text style={styles.titleText}>{recipeData.recipeId[userSavedRecipes[i]].title}</Text>
                        <Text style={styles.userText}>By: {recipeData.recipeId[userSavedRecipes[i]].username}</Text>
                        <Text style={styles.timeText}>{recipeData.recipeId[userSavedRecipes[i]].timer.duration} {recipeData.recipeId[userSavedRecipes[i]].timer.unit}</Text>
                        <View style={styles.bottomContainer}>
                            <Text style={styles.rating}>{recipeData.recipeId[userSavedRecipes[i]].rating}</Text>
                            <TouchableOpacity onPress={() => handleSavePress(i)} style={styles.saveButton}>
                                <Image source={savedRecipes[i].saved ? require('../assets/buttons/saveButton.png') : require('../assets/buttons/unsavedButton.png')} style={styles.savedIcon}/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            ))} 
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "#F8FAF8",
        padding: 20,
        paddingBottom: 150,
        paddingHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: 'left', 
    },
    recipeContainer: {
        backgroundColor: "white",
        width: 180,
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
        fontSize: 13.5,
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
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    saveButton: {
        position: 'absolute',
        bottom: 0,
        right: 10
    },
    savedIcon: {
        width: 20,
        height: 20
    }
});