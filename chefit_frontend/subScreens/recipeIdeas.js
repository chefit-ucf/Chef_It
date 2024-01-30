import { StyleSheet, Text, Image, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'


const windowWidth = Dimensions.get('window').width;

// Will be changed once we create algorithm to find these recipes from database
const RecipeIdeasList = [
    {
        recipeId: "re006",
        category: "Based On Your Ingredients:",
        title: "French Bread Pizza",
        user: "User8263",
        time: '30 mins',
        rating: '★ ★ ★ ★ ★',
        description: 'The details of this recipe is unknown just lorem ipsum dolar.',
        image: require('../assets/food/frenchBreadPizza.png'),
    },
    {
        recipeId: "re007",
        category: "Based On Your Saved Recipes:",
        title: "Chicken Tostadas",
        user: "User0281",
        time: '25 mins',
        rating: '★ ★ ★ ★',
        description: 'The details of this recipe is unknown just lorem ipsum dolar.',
        image: require('../assets/food/chickenTostadas.png')
    },
    {
        recipeId: "re008",
        category: "Based On The Season:",
        title: "Raspberry Shortbread Cookies",
        user: "User2034",
        time: '55 mins',
        rating: '★ ★ ★ ★ ★',
        description: 'The details of this recipe is unknown just lorem ipsum dolar.',
        image: require('../assets/food/raspberryShortbreadCookies.png')
    }
];

export default function RecipeIdeasScreen() {

    const [savedRecipes, setSavedRecipes] = useState(RecipeIdeasList.map(saved => ({ recipeId: saved, saved: false })));
    const navigation = useNavigation();


    const handleSavePress = (index) => {
        setSavedRecipes(prevSavedRecipes => {
            const updatedSavedRecipes = [...prevSavedRecipes];
            updatedSavedRecipes[index].saved = !updatedSavedRecipes[index].saved;
            return updatedSavedRecipes;
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {RecipeIdeasList.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.recipeContainer} onPress={() => navigation.navigate("RecipeScreen", { currentRecipe: item.recipeId })}>
                        <Text style={styles.h1}>{item.category}</Text>
                        <Image source={item.image} resizeMode='cover' style={{width: '100%', height: '45%',  borderRadius: 10}}/>
                        <Text style={styles.h2}>{item.title}</Text>
                        <Text style={styles.userText}>By: {item.user}</Text>
                        <Text style={styles.descriptionTxt}>{item.description}</Text>
                        <View style={styles.bottomContainer}>
                            <Text style={styles.rating}>{item.rating}</Text>
                            <Text style={styles.duration}>{item.time}</Text>
                            <Image source={require('../assets/icons/timer.png')} style={{width: 18, height: 18, marginTop: 10, marginLeft: 5}} />
                            <TouchableOpacity onPress={() => handleSavePress(index)} style={styles.saveButton}>
                                <Image source={savedRecipes[index].saved ? require('../assets/buttons/saveButton.png') : require('../assets/buttons/unsavedButton.png')} style={styles.savedIcon}/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAF8",
        paddingBottom: 110
    },
    recipeContainer: {
        margin: 20,
        width: windowWidth - 40,
        height: windowWidth - 40,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        paddingHorizontal: 15,
    },
    h1: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15,
        color: "#42A797"
    },
    h2: {
        fontSize: windowWidth / 22,
        fontWeight: 'bold',
        marginTop: 15,
        color: "black",
    },
    userText: {
        fontSize: windowWidth / 32,
        color: "grey",
        marginTop: 10
    },
    descriptionTxt: {
        fontSize: windowWidth / 32,
        fontWeight: 'light',
        marginTop: 10
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rating: {
        marginTop: 10,
        fontSize: windowWidth / 20,
        color: '#F7D47C'
    },
    duration: {
        marginTop: 10,
        fontSize: windowWidth / 30,
        marginLeft: 10,
        color: "#42A797",
        fontWeight: 'bold'
    },
    saveButton: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    savedIcon: {
        width: windowWidth / 18,
        height: windowWidth / 18
    }
});