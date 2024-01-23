import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';

export default function BackButton({ navigation }) {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.5)' : 'black', // Black background when pressed
            width: 36,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
          },
          styles.pressable, // Additional styles if needed
        ]}
        onPress={() => navigation.goBack()}
      >
        
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 8, // Optional: Add border radius for rounded corners
  },
});
