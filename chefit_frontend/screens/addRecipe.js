import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, Pressable, StyleSheet, TextInput, Switch, ScrollView } from 'react-native';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';
import AddIngredientModal from '../subScreens/addIngredientModal.js';

export default function AddRecipeScreen()  {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [savedToPantry, setSavedToPantry] = useState(false);

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Coiny_400Regular
    })
    if (!fontsLoaded) {
        return <Text>Loading...</Text>
    }

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const SaveRecipe = require('../assets/addRecipeButtons/SaveRecipe.png');
    const AddImage = require('../assets/addRecipeButtons/AddImage.png');
    const AddIngredient = require('../assets/addRecipeButtons/addIngredient.png');
    const savedImage = require('../assets/addRecipeButtons/saved.png')


    const handleAddIngredientPress = () => {
        setIsModalVisible(true);
    };
 const handleSaveToPantry = () => {
    // pantry logic here
    setSavedToPantry(true);

    setIsModalVisible(false);
  };
    return (
        <View style={styles.screenContainer}>
        <View style={styles.header}>
        <Text style={styles.title}>Create Recipe</Text>
        <Pressable><Image source = {SaveRecipe} style = {styles.saveButton}></Image></Pressable>
        </View>
        <ScrollView vertical style={styles.shadow}>
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
            <Pressable onPress={handleAddIngredientPress}>
                    <Image source={AddIngredient} style={styles.addIngredient} />
                </Pressable>
                <View style={styles.container}>
  <TextInput
    style={styles.ingredientInput}
    placeholder={"Ingredient 1"}
  />
  {savedToPantry && <Image source={savedImage} style={styles.savedImage} />}
  </View>
<TextInput
    style={styles.ingredientInput}
    placeholder={"Ingredient 2"}
/>
<TextInput
    style={styles.ingredientInput}
    placeholder={"Ingredient 3"}
/>
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
      <AddIngredientModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onSaveToPantry={handleSaveToPantry} 
      >
      </AddIngredientModal>
        </View>
        </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: 'white',
        paddingTop: 30,
        flex: 1,
        alignItems: "center",
        paddingBottom: 110
      },
    header: {
        paddingTop: 20,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
      },
      addRecipeContainer: {
        backgroundColor: 'white',
        paddingTop: 20,
        borderRadius: 12,
        borderColor: '#ECECEC',
        borderWidth: 1,
        width: 388,
        height: 515,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    
    ingredientsContainer: {
        backgroundColor: 'white',
        paddingTop: 20,
        borderRadius: 12,
        borderColor: '#ECECEC',
        borderWidth: 1,
        width: 388,
        height: 250,
        flexShrink: 0,
        alignItems: 'center',
        marginBottom: 20,
        boxShadow: '0px 5px 10px rgba(30, 75, 67, 0.2)',
    },
    directionsContainer: {
        backgroundColor: 'white',
        paddingTop: 20,
        borderRadius: 12,
        borderColor: '#ECECEC',
        borderWidth: 1,
        width: 388,
        height: 280,
        flexShrink: 0,
        alignItems: 'center',
        marginBottom: 20,
        boxShadow: '0px 5px 10px rgba(30, 75, 67, 0.2)',
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
        fontFamily: "Montserrat_500Medium",
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
        gap: 150,
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
        color: "#5A5A5A",
        fontFamily: "Montserrat_500Medium",
        fontSize: 16,
        fontWeight: 600,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Coiny_400Regular',
        marginRight: 75,
        marginBottom: 5
      },
    recipeImage: {
        width: 340,
        height: 340,
        marginBottom: 20
    },
    saveButton: {
        width: 98, 
        height: 36,
        marginBottom: 10
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
        fontFamily: "Montserrat_500Medium",
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
        fontFamily: "Montserrat_500Medium",
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
        fontFamily: "Montserrat_500Medium",
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: -0.56
    },
    savedImage: {
        width: 98,
        height: 36,
        position: 'absolute',
        top: 4,
        right: 135
      },
      container: {
        flexDirection: 'row'
      },
      shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      }
  });
    