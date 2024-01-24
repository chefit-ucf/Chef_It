import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';

export default function BackButton({ navigation }) {
  return (
    <View>
      
        <Image
            source={require('../assets/actionIcons/backButton.png')}
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
