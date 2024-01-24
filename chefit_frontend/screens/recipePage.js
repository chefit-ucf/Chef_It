import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal, } from 'react-native';
import recipeDetails from '../BackendElements/recipes.js';
import AchievementsModal from '../SubScreens/achievementModal.js';
import ServingModal from '../SubScreens/servingModal.js';

const RecipePage = () => {
  const [showDirections, setShowDirections] = useState(false);
  const [selectedButton, setSelectedButton] = useState('recipe');
  const [timer, setTimer] = useState(null);
  const [initialDuration, setInitialDuration] = useState(null);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [startTimerOnPress, setStartTimerOnPress] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [recipe, setRecipe] = useState(recipeDetails)
  const [newServingSize, setNewServingSize] = useState(recipeDetails.servingSize.servings);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [areTimerButtonsVisible, setAreTimerButtonsVisible] = useState(false);
  const [isCongratulationModalVisible, setIsCongratulationModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [startTime, setStartTime] = useState(null);





//Timer
const timerIntervalRef = useRef(null);

  useEffect(() => {

    let timerInterval;

    if (timer !== null && !isPaused) {
      timerInterval = setInterval(() => {
        // ... (previous code)
      }, 1000);

      timerIntervalRef.current = timerInterval; // Save the interval reference in the ref

    if (startTimerOnPress && timer === null) {
      setTimer(initialDuration);
      setIsTimerVisible(true);
      setStartTimerOnPress(false);
      setIsPaused(false);
      
    }
  }
  return () => {
    clearInterval(timerIntervalRef.current); // Clear the interval using the ref
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
        setCurrentTime((prevTime) => prevTime + 1000); // Update currentTime every second
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
  
      // Use the callback function to ensure that startTime is set to the latest state
      setStartTime((prevStartTime) => prevStartTime || currentTimestamp);
  
      console.log(startTime);
      console.log(currentTime);
      setIsCongratulationModalVisible(true);
    }
  
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
    <Image source={recipe.imageSource} style={styles.image} />
   <View style={styles.topButtonsContainer}>
  <Image source={backImage} style={styles.backButton} />
  <View style={styles.rightButtonsContainer}>
    <Image source={shareImage} style={styles.topButtons} />
    <Image source={saveImage} style={styles.topButtons} />
  </View>
  </View>
</View>      
      <View style={styles.container}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text>By {recipe.username}</Text>
        <Text>{recipe.rating}<TouchableOpacity><Text>  Rate</Text></TouchableOpacity></Text>
        {isTimerVisible && (
          <View style={styles.timerContainerTop}>
            <Text style={styles.timerText}>
              Cook Time: {formatTime(timer)}
            </Text>
          </View>
        )}
  <View>
          <View style={styles.servingSizeContainer}>
          <TouchableOpacity onPress={() => toggleModal(true)}>
  <Text>Serves: {newServingSize}</Text>
</TouchableOpacity>
            <Text>Mins: {recipe.servingSize.minutes}</Text>
          </View>
          <View style={styles.nutritionContainer}>
            <Text style={styles.nutritionText}>Nutrition Per Serving</Text>
            <Text>Calories: {recipe.servingSize.nutrition.calories}</Text>
            <Text>Carbs: {recipe.servingSize.nutrition.carbs}g</Text>
            <Text>Protein: {recipe.servingSize.nutrition.protein}g</Text>
            <Text>Fat: {recipe.servingSize.nutrition.fat}g</Text>
          </View>

      </View>
      {areTimerButtonsVisible && (
        <View>
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.controlButton} onPress={handlePauseButtonPress}>
      <Text>Pause</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.controlButton} onPress={handleResetButtonPress}>
      <Text>Reset</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.controlButton} onPress={handleStopButtonPress}>
      <Text>Stop</Text>
    </TouchableOpacity>
  </View> 
  <View>
        <TouchableOpacity style={styles.controlButton} onPress={handleStartButtonPress}>
        <Image source = {startImage} style={styles.startButton}></Image>
      </TouchableOpacity>
      </View>
      </View>
  )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, selectedButton === 'recipe' && styles.selectedButton]}
            onPress={() => handleButtonPress('recipe')}
          >
            <Text>Recipe</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedButton === 'directions' && styles.selectedButton]}
            onPress={() => handleButtonPress('directions')}
          >
            <Text>Directions</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
  {selectedButton === 'directions' ? (
      <View>
      {recipe.directions.map((step, index) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }} key={index}>
         <Image
  source={completedSteps.includes(index) ? checkboxImageCheckedSource : checkboxImageSource}
  style={{ width: 20, height: 20, marginRight: 5 }}
/>
          <Text>{`${index + 1}: ${step.text}`}</Text>
        </View>
     ))}
   </View>
  ) : (
    <View>
      {recipe.ingredients.map((item, index) => (
        <Text key={index}>{`${item.quantity} ${item.unit} ${item.name}`}</Text>
      ))}
    </View>
  )}
</View>
      </View>
<Text>Ready to Cook? Start a Cook Along to complete achievements and earn rewards!</Text>
<TouchableOpacity style={styles.controlButton} onPress={() => {
     setTimer(null);
     setIsTimerVisible(true);
  setAreTimerButtonsVisible(true);
}}>
  <Text><Image source={cookAlongImage} style={styles.cookAlong}></Image></Text>
</TouchableOpacity>
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
    width: '100%',
    height: 200,
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    paddingVertical: 8,
  },
  selectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  content: {
    marginTop: 8,
  },
  timer: {
    fontSize: 20,
    marginTop: 16,
    textAlign: 'center',
  },
  timerContainer: {
    marginTop: 16,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerContainerTop: {
    marginTop: 16,
  },
  cookAlong: {
    width: 100, 
    height: 100,
    resizeMode: 'contain',
  },
  startButton: {
    width: 80, 
    height: 80,
    resizeMode: 'contain', 
    textAlign: 'center'
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
    marginLeft: 265
  },
  backButton: {
    width: 30, 
    height: 30, 
    resizeMode: 'contain', 
  },
  topButtons: {
    width: 30, 
    height: 30,
    resizeMode: 'contain', 
    marginLeft: 16, 
  },
});

export default RecipePage;
