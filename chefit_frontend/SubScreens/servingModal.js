import React, { useState } from 'react';
import { Modal, View, Image, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import scaleRecipe from './recipeCalculator.js'
import { useFonts, Montserrat_300Light,Montserrat_400Regular,Montserrat_600SemiBold,Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';
import { BlurView } from 'expo-blur';




const ServingModal = ({ isModalVisible, setIsModalVisible, recipeDetails, setRecipe }) => {
  const [newServingSize, setNewServingSize] = useState(0);

  const toggleModal = (visible) => {
    setIsModalVisible(visible);
  };

  const handleServesButtonPress = () => {
    const scaledRecipe = scaleRecipe(recipeDetails, newServingSize);
    setRecipe(scaledRecipe);
    toggleModal(false);
  };
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold
  })
  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  return (
    <Modal visible={isModalVisible} transparent>
      <BlurView
        style={styles.blurEffect}
        tint="default"
        intensity={5}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.topRow}>
              <Pressable onPress={() => toggleModal(false)} style={styles.closeButton}>
                <Image source={require('../assets/addRecipeButtons/x.png')} style={styles.backButton} />
              </Pressable>
              <View style={styles.serveTextContainer}>
                <Text style={styles.serveText}>Input how many people this recipe will serve</Text>
              </View>
            </View>
            <View style={styles.servingBox}>
              <View>
              <TextInput
                  style={styles.modalInput}
                  inputMode="numeric"
                  value={newServingSize}
                  onChangeText={(text) => setNewServingSize(text)}
                />
              </View>
              <View>
                <Pressable style={styles.modalButton} onPress={handleServesButtonPress}>
                  <Text style={styles.servingText}>Serves</Text>
                </Pressable>
              </View>
            </View>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 320,
    height: 158
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  serveTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serveText: {
    fontSize: 20,
    fontFamily: "Montserrat_500Medium",
    textAlign: 'center',
  },
  modalInput: {
    width: 59,
    height: 59,
    marginVertical: 10,
    fontSize: 20,
    backgroundColor: '#FEF3CD',
    textAlign: 'center',
  },
  servingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around', 
    width: '60%', 
    height: 59,
    marginVertical: 10,
  },
  servingText: {
    fontSize: 20,
    fontFamily: "Montserrat_500Medium",
  },
  backButton: {
    width: 25,
    height: 25,
  },
  viewAchievements: {
    width: 'auto',
    height: 'auto',
    padding: 10
  }
  });


export default ServingModal;