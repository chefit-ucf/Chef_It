import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, ScrollView, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import AchievementsModal from '../subScreens/achievementModal.js';
import ServingModal from '../subScreens/servingModal.js'
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { recipeData } from '../API/recipeData';

export default function RecipeScreen ({ route, navigation }) {
  const { currentRecipe } = route.params;

  const Stack = createNativeStackNavigator();
  const [showDirections, setShowDirections] = useState(false);
  const [selectedButton, setSelectedButton] = useState('directions');
  const [timer, setTimer] = useState(null);
  const [initialDuration, setInitialDuration] = useState(null);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [startTimerOnPress, setStartTimerOnPress] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [recipe, setRecipe] = useState(recipeData.recipeId[currentRecipe]);
  const [newServingSize, setNewServingSize] = useState(recipe.servingSize.servings);
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
        // ... (previous code)
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

  // Filter between Directions and Ingredients
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

const toggleModal = (visible) => {
  console.log('Setting isModalVisible to:', visible);
  setIsModalVisible(visible);
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
  return (
  <ScrollView style={{backgroundColor: "white"}}>
    <View style={styles.imageContainer}>
      <Image source={recipe.src} style={styles.image} />
      <View style={styles.topButtonsContainer}>
      <View style={styles.backContainer}>
        <TouchableOpacity style={styles.backButton} onPress={()=> navigation.goBack()}>
          <Image source={backImage} style={styles.backButton} />
        </TouchableOpacity>
      </View>
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
      <Text style={styles.username}>By: {recipe.username}</Text>
        <Text style={styles.rating}>{recipe.rating}</Text>
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
      <Text style={styles.servingValue}>{recipe.timer.duration}</Text>
      <Text style={styles.servingLabel}>Mins</Text>
      </View>
      <View style={styles.LastServingItem}>
      <Text style={styles.servingValue}>{recipe.ingredients.length}</Text>
      <Text style={styles.servingLabel}>Ingredients</Text>
      </View>
    </View>
    <View style={[{paddingTop: 15}, { display: isContainerVisible ? 'flex' : 'none' }]}>
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

          {/*Updated Recipe.js */}
 <View style={styles.content}>
        {selectedButton === 'directions' ? (
  <View>
    {recipe.directions.map((step, index) => (
  <View key={`direction-${index}`} style={styles.stepContainer}>
        <View style={styles.direction}>
  <Text style={styles.directionsNum}>{`${index + 1}.`}</Text>
  <Text style={styles.directions}>{`${step.text}`}</Text>
  {step.imageSource && (
    <Image
      source={step.imageSource}
      style={styles.directionImage}
    />
  )}
</View>
<TouchableOpacity
      style={{marginTop: 10, marginLeft: 5}}
      onPress={() => {
        if (completedSteps.includes(index)) {
          setCompletedSteps(completedSteps.filter(i => i !== index));
        } else {
          setCompletedSteps([...completedSteps, index]);
        }
      }}
    >
    <Image
    source={completedSteps.includes(index) ? checkboxImageCheckedSource : checkboxImageSource}
    style={[{width: 25, height: 25, marginTop: 10, marginLeft: 5}, {display: isContainerVisible ? 'none' : 'flex'}]}
    />
    </TouchableOpacity>
      </View>
    ))}
  </View>
  ) : (
    <View style={{width: '100%'}}>
      {recipe.ingredients.map((item, index) => (
  <View key={`ingredient-${index}`} style={{flexDirection: 'row', flex: 1, justifyContent: "flex-start", gap: 30, alignItems: 'center'}}>
    <Text style={styles.recipeQuantity} key={`quantity-${index}`}>{`${item.quantity}  ${item.unit}`}</Text>
    <Text style={styles.recipe} key={`name-${index}`}>{`  ${item.name}`}</Text>
  </View>
))}
    </View>
  )}
</View>
      </View>
      {/*Updated Recipe.js */}
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
    recipeDetails={recipe}
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
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
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
    borderBottomColor: '#47A695',
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
    position: 'absolute',
    top: 190,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    textAlign: 'center',
    padding: 10,
    paddingBottom: 0
  },
});