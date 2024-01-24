import { View, Image, Text, TouchableOpacity, StyleSheet, Modal, } from 'react-native';

//Toggle Serving Modal
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

  const congratulationsImage = require('../assets/avatar1.png')
  const xImage = require('../assets/x.png')
  const viewAchievementsImage = require('../assets/viewAchievements.png')

  return (
    <Modal visible={isCongratulationModalVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setIsCongratulationModalVisible(false)}>
            <Image source ={xImage} style={styles.backButton}></Image>
          </TouchableOpacity>
          <Image source={congratulationsImage} style={styles.backButton}></Image>
          <Text>Congratulations!</Text>
          <Text>Current Time: {startTime && currentTime ? calculateElapsedTime(startTime, currentTime) : 'N/A'}</Text>
          <Text>You've unlocked a new Cooksona!</Text>
          <TouchableOpacity style={styles.modalButton} onPress={handleVisitAchievements}>
            <Image source={viewAchievementsImage} style={styles.viewAchievements}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    modalButton: {
      backgroundColor: 'gray',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    backButton: {
      width: 30, 
      height: 30, 
      resizeMode: 'contain', 
    },
    viewAchievements: {
      width: 'auto',
      height: 'auto',
      padding: 10
    }
  });


export default AchievementsModal
