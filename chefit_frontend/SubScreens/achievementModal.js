import { View, Image, Text, Pressable, StyleSheet, Modal} from 'react-native';
import { useFonts, Montserrat_300Light,Montserrat_400Regular,Montserrat_600SemiBold,Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';
import { BlurView } from 'expo-blur';

// Toggle Serving Modal
const AchievementsModal = ({ isCongratulationModalVisible, setIsCongratulationModalVisible, currentTime, startTime}) => {

  const handleVisitAchievements = () => {
    // Add navigation logic here
    setIsCongratulationModalVisible(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const calculateElapsedTime = (startTime, stopTime) => {
    const elapsedMilliseconds = stopTime - startTime;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    return formatTime(elapsedSeconds);
  };

  const congratulationsImage = require('../assets/logos/avatar1.png')
  const xImage = require('../assets/addRecipeButtons/x.png')
  const viewAchievementsImage = require('../assets/buttons/viewAchievements.png')
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
    <Modal visible={isCongratulationModalVisible} transparent>
      <BlurView
        style={styles.blurEffect}
        tint="default"
        intensity={5}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Pressable onPress={() => setIsCongratulationModalVisible(false)} style={styles.closeButton}>
            <Image source={xImage} style={styles.backButton} />
          </Pressable>
          <Image source={congratulationsImage} style={styles.congratulationsImage} />
          <Text style={styles.congratText}>Congratulations!</Text>
          <Text style={styles.timerText}>
            Current Time: {startTime && currentTime ? calculateElapsedTime(startTime, currentTime) : 'N/A'}
          </Text>
          <Text style={styles.cooksonaText}>You've unlocked a new Cooksona!</Text>
          <Pressable style={styles.modalButton} onPress={handleVisitAchievements}>
            <Image source={viewAchievementsImage} style={styles.viewAchievements} />
          </Pressable>
        </View>
        </View>
        </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurEffect: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratText: {
    fontSize: 32,
    fontFamily: 'Coiny_400Regular',
  },
  timerText: {
    fontSize: 20,
    fontFamily: "Montserrat_500Medium",
  },
  cooksonaText: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Montserrat_500Medium",
    textAlign: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 300,
    height: 375,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  backButton: {
    width: 24,
    height: 24,
  },
  congratulationsImage: {
    width: 130, 
    height: 100, 
    marginBottom: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  viewAchievements: {
    width: 257,
    height: 38,
    padding: 10,
  },
});

export default AchievementsModal