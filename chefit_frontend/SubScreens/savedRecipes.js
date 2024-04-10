import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../API/firebase.config.js";
import { Ionicons } from '@expo/vector-icons';


const windowWidth = Dimensions.get('window').width;

const Star = ({ filled }) => (
    <View style={{ display: filled ? 'flex' : 'none', marginRight: 2 }}>
      <Ionicons name="ios-star" size={15} color="#ffc107" />
    </View>
  );

export default function SavedRecipesScreen() {
    const navigation = useNavigation();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const userId = "adminUser001"; 
                const userDocRef = doc(db, "users", userId);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const savedRecipeIds = userData.savedRecipes || [];
                    const recipesCollectionRef = collection(db, "recipes");
                    const snapshot = await onSnapshot(recipesCollectionRef, (snapshot) => {
                        const fetchedRecipes = snapshot.docs
                            .filter(doc => savedRecipeIds.includes(doc.id))
                            .map(doc => ({ id: doc.id, ...doc.data() }));
                        setRecipes(fetchedRecipes);
                    });
                } else {
                    console.log("User data not found");
                }
            } catch (error) {
                console.error("Error fetching saved recipes:", error);
            }
        };

        fetchSavedRecipes();
    }, []);

    const handleRemoveFromSaved = async (recipeId) => {
        try {
            const userId = "adminUser001"; 
            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef, {
                savedRecipes: arrayRemove(recipeId)
            });
            console.log("Recipe removed from saved recipes");
        } catch (error) {
            console.error("Error removing recipe from saved recipes:", error);
        }
    };

    const handleSavePress = async (index, recipeId) => {
        await handleRemoveFromSaved(recipeId);
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
    };

    return (
        <ScrollView vertical>
            <View style={styles.container}>
                {recipes.map((recipe, index) => (
                    <View key={index} style={styles.recipeContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("RecipeScreen", { currentRecipe: recipe.id })}>
                            <Image source={{ uri: recipe.imageUrl }} resizeMode='contain' 
                                style={{width: (windowWidth / 2.3), height: (windowWidth / 3.25), borderTopLeftRadius: 10, borderTopRightRadius: 10}} />
                            <Text style={styles.titleText}>{recipe.title}</Text>
                            <Text style={styles.userText}>By: {recipe.username}</Text>
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeText}>{recipe.timer.duration} {recipe.timer.unit}</Text>
                                <Image source={require('../assets/icons/timer.png')} style={{width: 18, height: 18, marginTop: 5, marginLeft: 7}} />
                            </View>
                            <View style={[styles.bottomContainer, { marginLeft: 10 }]}>
                                {[...Array(5)].map((_, starIndex) => (
                                    <Star key={starIndex} filled={starIndex < recipe.rating} />
                                ))}
                                <TouchableOpacity onPress={() => handleSavePress(index, recipe.id)} style={styles.saveButton}>
                                <Image source={require('../assets/buttons/saveButton.png')} style={styles.savedIcon} />
                                 </TouchableOpacity>                                
                                <TouchableOpacity onPress={() => handleSavePress(index, recipe.id)} style={styles.saveButton}>
                                    <Image source={require('../assets/buttons/saveButton.png')} style={styles.savedIcon} />
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
        paddingBottom: 150,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: (windowWidth / 20),
        padding: (windowWidth / 25),
        justifyContent: 'left', 
    },
    recipeContainer: {
        backgroundColor: "white",
        width: (windowWidth / 2.3),
        height: (windowWidth / 1.7),
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    titleText: {
        fontSize: windowWidth / 31.5,
        fontWeight: 'bold',
        margin: 10
    },
    userText: {
        fontSize: windowWidth / 35,
        color: "grey",
        marginLeft: 10
    },
    timeText: {
        fontSize: windowWidth / 32,
        fontWeight: 'bold',
        color: '#42A797',
        marginLeft: 10,
        marginTop: 5
    },
    rating: {
        marginLeft: 8,
        marginTop: 10,
        fontSize: windowWidth / 25,
        color: '#F7D47C'
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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
        width: windowWidth / 20,
        height: windowWidth / 20
    }
});