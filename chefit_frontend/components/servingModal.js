import React, { useState } from 'react';
import { Modal, View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import scaleRecipe from './recipeCaculator.js';

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

  return (
    <Modal visible={isModalVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => toggleModal(false)}>
            <Image source={require('../assets/x.png')} style={styles.backButton} />
          </TouchableOpacity>
          <Text>Input how many people this recipe will serve</Text>
          <TextInput
            style={styles.modalInput}
            keyboardType="numeric"
            placeholder="New serving size"
            value={newServingSize.toString()}
            onChangeText={(text) => setNewServingSize(parseInt(text) || 0)}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleServesButtonPress}>
            <Text>Serves</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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


export default ServingModal;