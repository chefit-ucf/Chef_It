import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, ScrollView, Pressable, StyleSheet, Dimensions} from 'react-native';
import recipeDetails from '../BackendElements/recipes.js'; 
import AchievementsModal from '../SubScreens/achievementModal.js';
import ServingModal from '../SubScreens/servingModal.js';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;


export default function RecipePage({navigation}) {
  
  const Stack = createNativeStackNavigator();
  const [showDirections, setShowDirections] = useState(false);
  const [selectedButton, setSelectedButton] = useState('ingredients');
  const [timer, setTimer] = useState(null);
  const [initialDuration, setInitialDuration] = useState(null);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [startTimerOnPress, setStartTimerOnPress] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [recipe, setRecipe] = useState(recipeDetails.recipeId.re001);
  const [newServingSize, setNewServingSize] = useState(recipeDetails.recipeId.re001.servingSize.servings);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [areTimerButtonsVisible, setAreTimerButtonsVisible] = useState(false);
  const [isCongratulationModalVisible, setIsCongratulationModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isContainerVisible, setIsContainerVisible] = useState(true);
  const [isCookAlongInitiated, setIsCookAlongInitiated] = useState(false); 


//Timer
const timerIntervalRef = useRef(null);

  useEffect(() => {

    let timerInterval;

    if (timer !== null && !isPaused) {
      timerInterval = setInterval(() => {
      }, 1000);

      timerIntervalRef.current = timerInterval; 

    if (startTimerOnPress && timer === null) {
      setTimer(initialDuration);
      setIsTimerVisible(true);
      setStartTimerOnPress(false);
      setIsPaused(false);
      
    }
  }
  return () => {
    clearInterval(timerIntervalRef.current); 
  };
}, [startTimerOnPress, timer, isPaused, initialDuration, completedSteps]);


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
  
      recipe.directions.forEach((step, index) => {
        if (timer <= recipe.timer.duration * 60 - step.checkpoint && !completedSteps.includes(index)) {
          setCompletedSteps((prevSteps) => [...prevSteps, index]);
        }
      });
    }
  
    return () => clearInterval(timerInterval);
  }, [startTimerOnPress, timer, isPaused, initialDuration, completedSteps]);


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
  
    setCompletedSteps([]);
  
    setTimer(null);
    setIsTimerVisible(true);
    setIsPaused(false);
  };

  useEffect(() => {
    setInitialDuration(recipe.timer.duration * 60);
  }, [recipe.timer.duration]);

  //Filter between Directions and Ingredients
  const handleButtonPress = (button) => {
    setSelectedButton(button);
    setShowDirections(button === 'directions');
  };
//Images
const checkboxImageSource = require('../assets/unchecked_button.png')
const cookAlongImage = require('../assets/CookAlong.png')
const startImage = require('../assets/startButton.png')
const backImage = require('../assets/backButton.png')
const shareImage = require('../assets/share.png')
const saveImage = require('../assets/save.png')
const checkboxImageCheckedSource = require('../assets/item_checked.png')

const toggleModal = (visible) => {
  console.log('Setting isModalVisible to:', visible);
  setIsModalVisible(visible);
};

  return (
    <ScrollView>
    <View style={styles.imageContainer}>
    <Image source={recipeDetails.recipeId.re001.imageSource} style={styles.image} />
   <View style={styles.topButtonsContainer}>
    <Image source={backImage} style={styles.backButton} />
    <View style={styles.rightButtonsContainer}>
    <Image source={shareImage} style={styles.topButtons} />
    <Image source={saveImage} style={styles.topButtons} />
  </View>
  <View style={styles.whiteContainer}>
  <Text style={styles.title}>{recipe.title}</Text>

    </View>
  </View>
</View>      
      <View style={styles.container}>
      <Text style={styles.username}>By {recipe.username}</Text>
        <Text style={styles.rating}>{recipe.rating}<Pressable><Text>  Rate</Text></Pressable></Text>
        {isTimerVisible && (
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
      <View style={styles.servingItem}>
      <Pressable onPress={() => toggleModal(true)}>
        <Text style={styles.servingValue}>{newServingSize}</Text>
        <Text style={styles.servingLabel}>Serves</Text>
      </Pressable>
      </View>
      <View style={styles.servingItem}>
      <Text style={styles.servingValue}>{recipe.servingSize.minutes}</Text>
      <Text style={styles.servingLabel}>Mins</Text>
      </View>
      <View style={styles.LastServingItem}>
      <Text style={styles.servingValue}>{recipe.ingredients.length}</Text>
      <Text style={styles.servingLabel}>Ingredients</Text>
      </View>
    </View>
    <View style={[{paddingTop: 15}, { display: isContainerVisible ? 'flex' : 'none' }]}>
    <Text style={styles.nutritionText}>Nutrition per Serving</Text>
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
        {selectedButton === 'directions' ? (
  <View>
    {recipe.directions.map((step, index) => (
      <View key={index} style={styles.stepContainer}>
        <View style={styles.direction}>
  <Text style={styles.directions}>{`${index + 1}. ${step.text}`}</Text>
  {step.imageSource && (
    <Image
      source={step.imageSource}
      style={styles.directionImage}
    />
  )}
</View>
        <Image
          source={
            completedSteps.includes(index)
              ? checkboxImageCheckedSource
              : checkboxImageSource
          }
          style={[{width: 25, height: 25}, {display: isContainerVisible ? 'none' : 'flex'}]}
        />
      </View>
    ))}
  </View>
  ) : (
    <View>
      {recipe.ingredients.map((item, index) => (
        <Text style={styles.recipe} key={index}>{`${item.quantity} ${item.unit} ${item.name}`}</Text>
      ))}
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
    <Text>
      <Image source={cookAlongImage} style={styles.cookAlong}></Image>
    </Text>
  </Pressable>
</View>
<ServingModal
    isModalVisible={isModalVisible}
    setIsModalVisible={setIsModalVisible}
    recipeDetails={recipeDetails}
    setRecipe={setRecipe}
  />
  <AchievementsModal
        isCongratulationModalVisible={isCongratulationModalVisible}
        setIsCongratulationModalVisible={setIsCongratulationModalVisible}
        currentTime={currentTime}
        startTime={startTime} 
         setTimer={setTimer}
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
  },
  title: {
    color: '#000',
    fontFamily: 'Coiny',
    fontSize: 32,
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
    color: '#000',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 15,
    fontStyle: 'normal',
    letterSpacing: -0.525,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },

  button: {
    fontFamily: 'Coiny',
    fontSize: 24,
    margin: 0,
    borderBottomWidth: 2,
    borderColor: '#000',
    width: 205, // Adjust the width as needed
  },

  buttonText: {
    fontFamily: 'Coiny',
    fontSize: 24,
    textAlign: 'center'
  },

  buttonWithBorder: {
    borderBottomWidth: 3,
    borderColor: '#E2E2E2',
    width: 205, // Adjust the width as needed
  },

  selectedButton: {
    borderBottomColor: '#47A695',
  },

  selectedButtonText: {
    color: '#47A695',
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
    width: 149,
    height: 35,
    flexShrink: 0,
    textAlign: 'center',
    marginTop: 5,

},
centeredButtonContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 32,
},
  startButton: {
    width: 101,
    height: 41,
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
    left: 0,
    top: 0,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    marginTop: 16, 
  },
  rightButtonsContainer: {
    flexDirection: 'row', 
    marginLeft: 255
  },
  backButton: {
    width: 30, 
    height: 30, 
  },
  topButtons: {
    width: 32.7,
    height: 32.7,
    marginLeft: 16, 
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
    fontFamily: 'Montserrat_600SemiBold'
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
  },
  servingItem: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '6F6F6F',
    alignItems: 'center', 
    fontSize: 24
  },
  LastServingItem: {
    borderRightWidth: 0, 
    paddingLeft: 20
  },
  servingValue: {
    color: '#000',
    fontSize: 24,
    fontFamily: "Montserrat_500Medium",
    textAlign: 'center',
    },
  directions: {
    flexDirection: 'row', 
    flexWrap: 'wrap',  
    alignItems: 'center',
    paddingVertical: 13,
    paddingLeft: 5,
    color: '#000',
    fontFamily:"Montserrat_500Medium",
    fontSize: 20,
    fontStyle: 'normal',
    letterSpacing: -0.7,
  },
  direction: {
    flexDirection: 'column',
    flex: 1, 
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    paddingHorizontal: 5,
    color: '#000',
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
    fontStyle: 'normal',
    letterSpacing: -0.7,
  },
  cookAlongText: {
    marginTop: 10,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 20,
    fontStyle: 'normal',
    letterSpacing: -0.7,
    marginBottom: 10
  },
  whiteContainer: {
    position: 'absolute',
    top: 195,
    left: 0,
    right: 0,
    height: 44,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
});
