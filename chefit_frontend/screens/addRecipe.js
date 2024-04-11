import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, Pressable, StyleSheet, TextInput, Switch, ScrollView, SafeAreaView } from 'react-native';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';
import AddIngredientModal from '../subScreens/addIngredientModal.js';
import { Blob } from 'react-native-paper';

import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    deleteDoc,
    getDoc,
    setDoc,
    getDocs,
    query, 
    where
} from "firebase/firestore";
import { db, auth } from "../API/firebase.config.js";
import { storage } from "../API/firebase.config.js";
import { v4 } from "uuid"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';



export default function AddRecipeScreen() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [savedToPantry, setSavedToPantry] = useState(false);
    const [recipeName, setRecipeName] = useState('');
    const [rating, setRating] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const [username, setUsername] = useState(null); 
    const [directions, setDirections] = useState([{ text: '', checkpoint: 0 }]);
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' , unit: '' }]);

    const renderIngredientInputs = () => {
      return ingredients.map((ingredient, index) => (
          <View key={'ingredients' + index} style={styles.inputContainer}>
              <TextInput
                  style={styles.recipeInput}
                  placeholder={`Ingredient Name`}
                  value={ingredient.name}
                  onChangeText={(name) => handleIngredientChange(name, ingredient.unit, ingredient.quantity, index)}
              />
              <TextInput
                  style={styles.recipeInput}
                  placeholder={`Quantity`}
                  value={ingredient.quantity}
                  onChangeText={(quantity) => handleIngredientChange(ingredient.name, ingredient.unit, quantity, index)}
              />
              <TextInput
                  style={styles.recipeInput}
                  placeholder={`Unit`}
                  value={ingredient.unit}
                  onChangeText={(unit) => handleIngredientChange(ingredient.name, unit, ingredient.quantity, index)}
              />
             
                  <Pressable onPress={() => handleRemoveIngredient(index)}>
                      <Image source={removeButton} style={styles.removeButton}></Image>
                  </Pressable>
          </View>
      ));
  };
  const handleIngredientChange = (name, unit, quantity, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = name;   
     newIngredients[index].unit = unit;
    newIngredients[index].quantity = quantity;

    setIngredients(newIngredients);
};

const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
};
const addIngredientInput = () => {
  setIngredients([...ingredients, { name: '', unit: '', quantity: '' }]);
};
    const renderDirectionInputs = () => {
      return directions.map((direction, index) => (
          <View key={'directions' + index}>
              <TextInput
                  style={styles.recipeInput}
                  placeholder={`Direction ${index + 1}`}
                  value={direction.text}
                  onChangeText={(text) => handleDirectionChange(text, index)}
              />
              {directions.length > 1 && (
                  <Pressable onPress={() => handleRemoveDirection(index)}>
                      <Image source={removeButton} style={styles.removeButton}></Image>
                  </Pressable>
              )}
          </View>
      ));
  };

  const handleDirectionChange = (text, index) => {
      const newDirections = [...directions];
      newDirections[index].text = text;
      setDirections(newDirections);
  };

  const handleRemoveDirection = (index) => {
      const newDirections = [...directions];
      newDirections.splice(index, 1);
      setDirections(newDirections);
  };
  const handleAddDirection = () => {
    setDirections([...directions, { text: '', checkpoint: 0 }]);
};
  
const handleAddRecipe = async () => {
  try {
    // Add recipe image to Firebase Storage
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();
    const imageRef = ref(storage, `images/${v4()}`);
    await uploadBytes(imageRef, imageBlob);
    const imageURL = await getDownloadURL(imageRef);

    // Generate unique unsaved ID for the recipe
    const unsavedId = v4();
    const user = auth.currentUser;

    if (user) {
      const currentUserUID = user.uid;
      const usersQuery = query(collection(db, 'users'), where('UID', '==', currentUserUID));
      const querySnapshot = await getDocs(usersQuery);
      const userData = querySnapshot.docs.map(doc => doc.data());
      if (userData.length > 0 && userData[0].username) {
        const currentUserDisplayName = userData[0].username; // Get the username from the user data
        setUsername(currentUserDisplayName || 'Guest'); // Set username to displayName if available, otherwise set to 'Guest'

        // Add recipe to Firestore
        const docRef = await addDoc(collection(db, 'recipes'), {
          savedid: unsavedId, // Assign the unsaved ID
          title: recipeName,
          rating: rating,
          ingredients: ingredients,
          directions: directions,
          timer: { duration: duration, unit: 'minutes' },
          servingSize: {
            servings: servingSize,
            ingredients: ingredients.length,
            nutrition: {
              calories: calories,
              carbs: carbs,
              protein: protein,
              fat: fat
            }
          },
          imageUrl: imageURL,
          username: currentUserDisplayName, // Use currentUserDisplayName as username
        });

        // Update user document with saved recipe
        const userDocRef = doc(db, 'users', currentUserDisplayName);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const updatedSavedRecipes = [...userData.recipes, docRef.id];
          await setDoc(userDocRef, { recipes: updatedSavedRecipes }, { merge: true });
        } else {
          console.error('User data not found for username: ',currentUserDisplayName);
        }

        console.log('Recipe added with ID: ', docRef.id);

        // Clear input fields after saving
        setRecipeName('');
        setRating('');
        setServingSize('');
        setDuration('');
        setCalories('');
        setCarbs('');
        setProtein('');
        setFat('');
        setImageUrl('');
        setDirections([]);
        setIngredients([]);
      }
    }
  } catch (error) {
    console.error('Error adding recipe: ', error);
  }
};
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

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        setPrivateMode(previousMode => !previousMode);
    };    const SaveRecipe = require('../assets/addRecipeButtons/SaveRecipe.png');
    const AddImage = require('../assets/addRecipeButtons/AddImage.png');
    const AddIngredient = require('../assets/addRecipeButtons/addIngredient.png');
    const savedImage = require('../assets/addRecipeButtons/saved.png')
    const addPantry = require('../assets/addRecipeButtons/AddPantry.png')
    const removeButton= require('../assets/buttons/RemoveButton.png')




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
              const response = await fetch(localUri);
              const blob = await response.blob();
              const imageRef = ref(storage, `images/recipeImages/${v4()}`);
              await uploadBytes(imageRef, blob);
              const url = await getDownloadURL(imageRef);
              setImageUrl(url.toString());
              console.log(url)
          }
      } catch (error) {
          console.error('Error uploading image: ', error);
          alert('Error uploading image. Please try again.');
      }
  };
    const addToPantry = () => {
      setIsModalVisible(true);
  };
  const handleSaveToPantry = () => {
      setSavedToPantry(true);

      setIsModalVisible(false);
  };
  const isNumeric = (value) => {
    return /^[0-9]+$/.test(value);
}

const handleDurationChange = (text) => {
    if (isNumeric(text)) {
        setDuration(text);
    }
};

const handleServingSizeChange = (text) => {
    if (isNumeric(text)) {
        setServingSize(text);
    }
};

const handleCaloriesChange = (text) => {
    if (isNumeric(text)) {
        setCalories(text);
    }   
}

const handleProteinChange = (text) => {
    if (isNumeric(text)) {
        setProtein(text);
    }
}
const handleCarbsChange = (text) => {
    if (isNumeric(text)) {
        setCarbs(text);
    }
}
const handleFatChange = (text) => {
    if (isNumeric(text)) {
        setFat(text);
    }
}
return (
    <SafeAreaView style={{ backgroundColor: '#FDFEFC', flex: 1, }}>
            <ScrollView>
    <View style={styles.screenContainer}>
    <View style={styles.header}>
        <Text style={styles.title}>Create Recipe</Text>
        <Pressable onPress={handleAddRecipe}><Image source={SaveRecipe} style={styles.saveButton}></Image></Pressable>
      </View>
      <View style={styles.addRecipeContainer}>
        <TextInput
          style={styles.recipeInput}
          placeholder={"Recipe Name"}
          value={recipeName}
          onChangeText={setRecipeName}>
        </TextInput>
        <TextInput
          style={styles.recipeInput}
          placeholder="Rating"
          value={rating}
          onChangeText={setRating}
        />
        <TextInput
          style={styles.recipeInput}
          placeholder="Serving Size"
          value={servingSize}
          onChangeText={handleServingSizeChange}
        />
        <TextInput
          style={styles.recipeInput}
          placeholder="Duration"
          value={duration}
          onChangeText={handleDurationChange}
        />
        <TextInput
          style={styles.recipeInput}
          placeholder={"Calories"}
          value={calories}
          onChangeText={handleCaloriesChange}>
        </TextInput>
        <TextInput
          style={styles.recipeInput}
          placeholder={"Carbs"}
          value={carbs}
          onChangeText={handleCarbsChange}>
        </TextInput>
        <TextInput
          style={styles.recipeInput}
          placeholder={"Protein"}
          value={protein}
          onChangeText={handleProteinChange}>
        </TextInput>
        <TextInput
          style={styles.recipeInput}
          placeholder={"Fat"}
          value={fat}
          onChangeText={handleFatChange}>
        </TextInput>
        <View>
          <Pressable onPress={handleAddImage}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
            ) : (
              <Image
                style={styles.recipeImage}
                source={AddImage}
              />
            )}
          </Pressable>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        <View style={styles.buttonsContainer}>
        <View style={styles.pantryButtonWrapper}>
    <Pressable onPress={addToPantry}>
      <Image source={addPantry} style={styles.addPantry} />
    </Pressable>
  </View>
  <View style={styles.addIngredientButtonWrapper}>
    <Pressable onPress={addIngredientInput}>
      <Image source={AddIngredient} style={styles.addIngredient} />
    </Pressable>
  </View>
          </View>
        {renderIngredientInputs()}
      </View>
      <View style={styles.directionsContainer}>
      <View style={styles.buttonsContainer}>
      <View style={styles.addDirectionButtonWrapper}>
        <Pressable onPress={handleAddDirection}>
          <Image source={AddIngredient} style={styles.addIngredient} />
        </Pressable>
        </View>
        </View>
        {renderDirectionInputs()}
      </View>
      <AddIngredientModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onSaveToPantry={handleSaveToPantry}
      />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: 'white',
        paddingTop: 25,
        flex: 1,
        flexGrow: 1,
    alignItems: "center",
        paddingBottom: 110
      },
    header: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
      },
      addRecipeContainer: {
        backgroundColor: 'white',
        paddingTop: 20,
        borderRadius: 12,
        borderColor: '#ECECEC',
        borderWidth: 1,
        width: 'auto',
        height: 'auto',
        flexShrink: 0,
        alignItems: 'center',
        marginBottom: 20,
        boxShadow: '0px 5px 10px rgba(30, 75, 67, 0.2)',
    },
    
    ingredientsContainer: {
        backgroundColor: 'white',
        paddingTop: 20,
        borderRadius: 12,
        borderColor: '#ECECEC',
        borderWidth: 1,
        width: 'auto',
        height: 'auto',
        flexShrink: 0,
        alignItems: 'center',
        marginBottom: 20,
        boxShadow: '0px 5px 10px rgba(30, 75, 67, 0.2)',
    },
    buttonsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        paddingBottom: 10
    },
    pantryButtonWrapper: {
        right: 85, 
      },
      addIngredientButtonWrapper:{
        left: 85
      },
      addDirectionButtonWrapper:{
        left: 154
      },
    addPantry: {
        width: 136, 
        height: 39,
    },
    directionsContainer: {
        backgroundColor: 'white',
        paddingTop: 20,
        borderRadius: 12,
        borderColor: '#ECECEC',
        borderWidth: 1,
        width: 'auto',
        height: 'auto',
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
        fontWeight:'600',
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
        fontWeight:'600',
        fontSize: 16,
        letterSpacing: -0.56,
        marginBottom: 10,
        alignItems: 'center'
    },
    privateText: {
        color: "#5A5A5A",
        fontFamily: "Montserrat_500Medium",
        fontSize: 16,
        fontWeight:'600',
    },
    title: {
        fontSize: 26,
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
        fontWeight:'600',
        letterSpacing: -0.56,
        marginBottom: 25    
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
        fontWeight:'600',
        letterSpacing: -0.56,
        marginBottom: 10
    },
    addIngredient: {
        width: 24,
        height: 24,
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
        fontWeight:'600',
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
      },
      removeButton: {
        marginBottom: 10
      }
  });