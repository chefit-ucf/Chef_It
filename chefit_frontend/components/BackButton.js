import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';

export default function BackButton({ navigation }) {
  return (
    <View style={{paddingLeft: 20}}>
      
        <Image
            source={require('../assets/buttons/backButton.png')}
            style={{ width: 32, height: 32, resizeMode: 'cover'}}
          />
        
     
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 8, // Optional: Add border radius for rounded corners
  },
});