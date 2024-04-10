import React, { useRef, useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import AchievementsModal from './achievementModal.js';
import ServingModal from './servingModal.js'
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "../API/firebase.config.js";
import StarRating from '../components/rating.js'
import {
  ref,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../API/firebase.config.js";

export default function RecipeScreen({ route, navigation }) {
  const { currentRecipe } = route.params;
  const [imageUrls, setImageUrls] = useState([]);
  const [recipe, setRecipe] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);


  const [showDirections, setShowDirections] = useState(false);
  const [selectedButton, setSelectedButton] = useState('directions');
  const [timer, setTimer] = useState(null);
  const [initialDuration, setInitialDuration] = useState(null);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [startTimerOnPress, setStartTimerOnPress] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [newServingSize, setNewServingSize] = useState(null);
  const [areTimerButtonsVisible, setAreTimerButtonsVisible] = useState(false);
  const [isCongratulationModalVisible, setIsCongratulationModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isContainerVisible, setIsContainerVisible] = useState(true);
  const [isCookAlongInitiated, setIsCookAlongInitiated] = useState(false); 

  const imagesListRef = ref(storage, "images/");
  useEffect(() => {
    console.log("Completed Steps:", completedSteps);
  }, [completedSteps]);
  useEffect(() => {
    listAll(imagesListRef)
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeDocRef = doc(db, "recipes", currentRecipe);
        const recipeSnapshot = await getDoc(recipeDocRef);
        if (recipeSnapshot.exists()) {
          const data = recipeSnapshot.data();
          setRecipe(data);
        } else {
          console.log("No such recipe document!");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [currentRecipe]);
  
  useEffect(() => {
    console.log("Recipe data:", recipe);
    if (recipe && recipe.servingSize) {
      setNewServingSize(recipe.servingSize.serving);
    }
  }, [recipe]);

  useEffect(() => {
    if (recipe && recipe.timer && typeof recipe.timer.duration === 'number') {
      setInitialDuration(recipe.timer.duration * 60);
    }
  }, [recipe]);
  
//Timer
const timerIntervalRef = useRef(null);

useEffect(() => {
  if (startTimerOnPress && timer === null) {
    setTimer(initialDuration);
    setIsTimerVisible(true);
    setStartTimerOnPress(false);
    setIsPaused(false);
  }

  let timerInterval;
  if (timer !== null && !isPaused) {
    timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(timerInterval);
          setIsTimerVisible(true);
          return null;
        }
      });
      setCurrentTime((prevTime) => prevTime + 1000); 
    }, 1000);
  }

  return () => clearInterval(timerInterval); 
}, [startTimerOnPress, timer, isPaused, initialDuration, currentTime]); 

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const handleStartButtonPress = () => {
    setStartTimerOnPress(true);
    setIsPaused(false);
    setStartTime(Date.now());
  };
  const handlePauseButtonPress = () => {
    setIsPaused(true);
  };

  const handleResetButtonPress = () => {
    setTimer(initialDuration);
    setIsTimerVisible(true);
    setIsPaused(false);
  };

  const handleStopButtonPress = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  
    if (timer) {
      const currentTimestamp = Date.now();
      setCurrentTime(currentTimestamp);
      setStartTime((prevStartTime) => prevStartTime || currentTimestamp);
      setIsCongratulationModalVisible(true);
    }
  
    setTimer(null);
    setIsTimerVisible(true);
    setIsPaused(false);

  setCompletedSteps([]);

  console.log("Completed Steps after reset:", completedSteps);   
};

  useEffect(() => {
    if (recipe && recipe.timer && typeof recipe.timer.duration === 'number') {
      setInitialDuration(recipe.timer.duration * 60);
    }
  }, [recipe]);
const handleButtonPress = (button) => {
  setSelectedButton(button);
  setShowDirections(button === 'directions');
};

//Images
const checkboxImageSource = require('../assets/buttons/unchecked_button.png')
const cookAlongImage = require('../assets/buttons/CookAlong.png')
const backImage = require('../assets/buttons/backButton.png')
const startImage = require('../assets/buttons/startButton.png')
const shareImage = require('../assets/buttons/share.png')
const saveImage = require('../assets/buttons/save.png')
const checkboxImageCheckedSource = require('../assets/buttons/item_checked.png')
let [fontsLoaded] = useFonts({
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Coiny_400Regular
});

if (!fontsLoaded || !recipe) {
  return <Text>Loading...</Text>;
}
  const toggleModal = (visible) => {
    setIsModalVisible(visible);
  };
  return (
  <ScrollView style={{backgroundColor: "white"}}>
    <View style={styles.imageContainer}>
    {recipe && recipe.imageUrl && (
  <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
)}
      <View style={styles.topButtonsContainer}>
      <View style={styles.backContainer}>
        <TouchableOpacity style={styles.backButton} onPress={()=> navigation.goBack()}>
          <Image source={backImage} style={styles.backButton} />
        </TouchableOpacity>
      </View>
        <View style={styles.whiteContainer}>
      <Text style={styles.title}>{recipe.title}</Text>
        </View>
      </View>
    </View>      
      <View style={styles.container}>
      <Text style={styles.username}>By: {recipe.username}</Text>
      <StarRating recipeId={currentRecipe} />
        {recipe && recipe.timer && isTimerVisible && (
  <Text style={styles.timerText}>
    Timer: {formatTime(timer)}
  </Text>
)}
         {areTimerButtonsVisible && (
        <View>
  <View style={styles.buttonContainer}>
    <Pressable onPress={handlePauseButtonPress}>
      <Text style={styles.timerButton}>Pause</Text>
    </Pressable>
    <Pressable onPress={handleResetButtonPress}>
      <Text style={styles.timerButton}>Reset</Text>
    </Pressable>
    <Pressable onPress={handleStopButtonPress}>
      <Text style={styles.timerButton}>Stop</Text>
    </Pressable>
  </View> 
  <View>
        <Pressable onPress={handleStartButtonPress}>
        <Image source = {startImage} style={styles.startButton}></Image>
      </Pressable>
      </View>
      </View>
  )}
  <View>
 <View style={[styles.servingSizeContainer, { display: isContainerVisible ? 'flex' : 'none' }]}>
  {recipe && recipe.servingSize && (
    <>
      <View style={styles.servingItem}>
        <Pressable onPress={() => toggleModal(true)}>
          <Text style={styles.servingValue}>{recipe.servingSize.serving}</Text>
          <Text style={styles.servingLabel}>Serves</Text>
        </Pressable>
      </View>
      <View style={styles.servingItem}>
        <Text style={styles.servingValue}>{recipe.timer && recipe.timer.duration}</Text>
        <Text style={styles.servingLabel}>Mins</Text>    
      </View>
    </>
  )}
  {recipe && recipe.ingredients && (
    <View style={styles.LastServingItem}>
      <Text style={styles.servingValue}>
        {Object.keys(recipe.ingredients).length}
      </Text>
      <Text style={styles.servingLabel}>Ingredients</Text>
    </View>
  )}
</View>
<View style={[{paddingTop: 15}, { display: isContainerVisible ? 'flex' : 'none' }]}>
  {recipe && recipe.servingSize && recipe.servingSize.nutrition && (
    <>
      <Text style={styles.nutritionText}>Nutrition Per Serving</Text>
      <View style={styles.nutritionContainer}>
        <View style={styles.nutritionItem}>
          <Text style={styles.servingValue}>{recipe.servingSize.nutrition.calories}</Text>
          <Text style={styles.nutritionLabel}>Calories</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.servingValue}>{recipe.servingSize.nutrition.carbs}g</Text>
          <Text style={styles.nutritionLabel}>Carbs</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.servingValue}>{recipe.servingSize.nutrition.protein}g</Text>
          <Text style={styles.nutritionLabel}>Protein</Text>
        </View>
        <View style={styles.lastNutritionItem}>
          <Text style={styles.servingValue}>{recipe.servingSize.nutrition.fat}g</Text>
          <Text style={styles.nutritionLabel}>Fat</Text>
        </View>
      </View>
    </>
  )}
</View>
      </View>
      <View style={styles.buttonContainer}>
  <Pressable
    style={[
      styles.button,
      styles.buttonWithBorder,
      selectedButton === 'directions' && styles.selectedButton,
    ]}
    onPress={() => handleButtonPress('directions')}
  >
    <Text style={[styles.buttonText, selectedButton === 'directions' && styles.selectedButtonText]}>Directions</Text>
  </Pressable>
  <Pressable
    style={[
      styles.button,
      styles.buttonWithBorder,
      selectedButton === 'ingredients' && styles.selectedButton,
    ]}
    onPress={() => handleButtonPress('ingredients')}
  >
    <Text style={[styles.buttonText, selectedButton === 'ingredients' && styles.selectedButtonText]}>Ingredients</Text>
  </Pressable>
</View>
<View style={styles.content}>
  {selectedButton === 'directions' && recipe.directions ? (
    <View>
     {Object.keys(recipe.directions)
  .sort((a, b) => parseInt(a.replace('step', '')) - parseInt(b.replace('step', '')))
  .map((directionKey, stepIndex) => {
    const step = recipe.directions[directionKey];
    if (!step || typeof step.text !== 'string' ) {
      console.error(`Invalid step object at key ${directionKey}`);
      return null;
    }
    const { text } = step;


    return (
      <View key={`step-${stepIndex}`} style={styles.stepContainer}>
        <View style={styles.direction}>
          <Text style={styles.directionsNum}>{`${stepIndex + 1}.`}</Text>
          <Text style={styles.directions}>{`${text}`}</Text>
        </View>
        <TouchableOpacity
          style={{ marginTop: 10, marginLeft: 5 }}
          onPress={() => {
            if (completedSteps.includes(text)) {
              setCompletedSteps((prevCompletedSteps) => prevCompletedSteps.filter((step) => step !== text));
            } else {
              setCompletedSteps((prevCompletedSteps) => [...prevCompletedSteps, text]);
            }
            console.log("After Toggle - Completed Steps:", completedSteps);
          }}
        > 
          <Image
            source={completedSteps.includes(text) ? checkboxImageCheckedSource : checkboxImageSource}
            style={[{ width: 25, height: 25, marginTop: 10, marginLeft: 5 }, { display: isContainerVisible ? 'none' : 'flex' }]}
          />
        </TouchableOpacity>
      </View>
    );
  })}
    </View>
  ) : (
    <View style={{ width: '100%' }}>
      {Object.keys(recipe.ingredients).map((ingredientKey, index) => {
        const { name, unit, quantity } = recipe.ingredients[ingredientKey];
        return (
          <View key={`ingredient-${index}`} style={{ flexDirection: 'row', flex: 1, justifyContent: "flex-start", gap: 30, alignItems: 'center' }}>
            <Text style={styles.recipeQuantity} key={`quantity-${index}`}>{`${quantity} ${unit}`}</Text>
            <Text style={styles.recipe} key={`name-${index}`}>{` ${name}`}</Text>
          </View>
        );
      })}
    </View>
  )}
</View>
      </View>
      <Text style={[styles.cookAlongText, { display: isContainerVisible ? 'flex' : 'none' }]}>
Ready to Cook? Start a Cook Along to complete achievements and earn rewards!</Text>
<View style={styles.centeredButtonContainer}>
  <Pressable
    style={styles.timerButton}
    onPress={() => {
      setTimer(null);
      setIsTimerVisible(true);
      setAreTimerButtonsVisible(true);
      setIsContainerVisible(!isContainerVisible);
      setIsCookAlongInitiated(true)
    }}
    
  >      
  <Image source={cookAlongImage} style={styles.cookAlong}></Image>
  </Pressable>
</View>
{recipe && (
  <ServingModal
    isModalVisible={isModalVisible}
    setIsModalVisible={setIsModalVisible}
    recipeDetails={recipe}
    setRecipe={setRecipe}
    currentServingSize={newServingSize}
  />
)}
  <AchievementsModal
        isCongratulationModalVisible={isCongratulationModalVisible}
        setIsCongratulationModalVisible={setIsCongratulationModalVisible}
        currentTime={currentTime}
        startTime={startTime} 
         setTimer={''}
      />
      </ScrollView>
  );
};


const styles = StyleSheet.create({
  image: {
    width: 428,
    height: 235,
  },
  container: {
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    marginTop: 10
  },
  title: {
    color: '#000',
    fontFamily: 'Coiny_400Regular',
    fontSize: 30,
    fontStyle: 'normal',
    letterSpacing: -1.12,
    textAlign: 'center',
    marginTop: 5
  },
  username: {
    marginTop: 6,
    color: '#000',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 20,
    fontStyle: 'normal',
    letterSpacing: -0.7,
    textAlign: 'center'
  },
  rating: {
    color: '#F7D47C',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 18,
    fontStyle: 'normal',
    letterSpacing: -0.525,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 10,
  },

  button: {
    fontFamily: 'Coiny_400Regular',
    fontSize: 24,
    margin: 0,
    borderBottomWidth: 2,
    borderColor: '#000',
    width: 205, 
  },

  buttonText: {
    fontFamily: 'Coiny_400Regular',
    fontSize: 25,
    textAlign: 'center'
  },

  buttonWithBorder: {
    borderBottomWidth: 3,
    borderColor: '#E2E2E2',
    width: 205,
  },
  selectedButton: {
    borderColor: '#47A695',
  },
  selectedButtonText: {
    color: '#47A695',
  },

  backContainer: {
    flexDirection: 'row',
    alignItem: "left",
    justifyContent: "left",
    padding: 10,
    marginTop: 30
  },

  backButton: {
    width: 35, 
    height: 35, 
    shadowColor: "#494949",
        shadowOffset: {
            width: 0,
            height: 5,
        },
    shadowOpacity: 0.5
  },

  content: {
    marginTop: 8,
  },
  timerText: {
    marginTop: 5,
    fontSize: 32,
    fontFamily: "Montserrat_500Medium",
    textAlign: 'center'
  },
  timerButton: {
    color: '#000',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 24,
    fontStyle: 'normal',
    letterSpacing: -0.84,
    flexShrink: 0
  },
  cookAlong: {
    width: 170,
    height: 40,
    flexShrink: 0,
    marginTop: 5,
    paddingTop: 20
},
centeredButtonContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 20,
  marginBottom: 32,
},
  startButton: {
    width: 100,
    height: 45,
    marginTop: 5,
    alignSelf: 'center',
  },
  imageContainer: {
    position: 'relative', 
    width: 'auto', 
    height: 'auto', 
  },
  topButtonsContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  rightButtonsContainer: {
    flexDirection: 'row', 
    alignItem: "right",
    justifyContent: "right",
    padding: 10,
    marginTop: 30,
    gap: 10
  },
  topButtons: {
    width: 35,
    height: 35,
    shadowColor: "#494949",
        shadowOffset: {
            width: 0,
            height: 5,
        },
    shadowOpacity: 0.8
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
  },
  nutritionItem: {
    flex: 1,
    marginRight: 8,
    paddingRight: 8,
    borderRightWidth: 1,
    borderColor: '6F6F6F',
    alignItems: 'center', 
  },
  nutritionText: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    textAlign: 'center',
    margin: 5
  },
  lastNutritionItem: {
    borderRightWidth: 0, 
    paddingRight: 20,
    paddingLeft: 20
  },
  nutritionLabel: {
    fontFamily: "Montserrat_400Regular",
    color: "#535353",
    fontSize: 20,
    fontStyle: 'normal',
    letterSpacing: -0.84
    },
  servingLabel: {
    color: '#535353',
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 20,
    fontStyle: 'normal',
    letterSpacing: -0.84,

  },
  servingSizeContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  servingItem: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '6F6F6F',
    textAlign: 'center',
    alignItems: 'center', 
    fontSize: 24,
  },
  LastServingItem: {
    borderRightWidth: 0, 
    paddingRight: 20,
    paddingLeft: 20
  },
  servingValue: {
    color: '#000',
    fontSize: 24,
    fontFamily: "Montserrat_500Medium",
    textAlign: 'center',
    },
    indentedView: {
      marginLeft: 30,
    },
    directionsNum: {
      color: '#000',
      fontFamily: "Montserrat_500Medium",
      fontSize: 20,
      fontStyle: 'normal',
      letterSpacing: -0.7,
      paddingRight: 8,
    },
  directions: {
    flexWrap: 'wrap',  
    paddingLeft: 5,
    paddingRight: 5,
    color: '#000',
    fontFamily:"Montserrat_500Medium",
    fontSize: 18,
    letterSpacing: -0.7,
  },
  direction: {
    flexDirection: 'row',
    flex: 1, 
    paddingRight: 20,
    paddingVertical: 10
  },
  stepContainer: {
    flexDirection: 'row',
    paddingRight: 20, 
    marginTop: 8,
  },
  directionImage: {
    width: 292,
    height: 132,
    alignSelf: 'center'
  },
  recipe:{
    paddingVertical: 13,
    color: '#000',
    fontFamily: "Montserrat_500Medium",
    fontSize: 17,
    fontStyle: 'normal',
    letterSpacing: -0.7,
    textAlign: 'left',
    flex: 1,
    marginRight: 50,
    flexWrap: 'nowrap',
    flexShrink: 1
  },
  recipeQuantity:{
    flex: 1,
    textAlign: 'right',
    paddingVertical: 13,
    color: '#000',
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    fontStyle: 'normal',
    letterSpacing: -0.7,
    marginLeft: -120
  },
  cookAlongText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18,
    fontStyle: 'normal',
    letterSpacing: -0.7,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  whiteContainer: {
    flex: 1,
    position: 'absolute',
    top: 190,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    textAlign: 'center',
  },
});