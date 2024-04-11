import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';

export default function BackButton({ navigation }) {
  return (
<<<<<<< HEAD
  <View>
    <Image
        source={require('../assets/actionIcons/backButton.png')}
        style={{ width: 32, height: 32, resizeMode: 'cover'}}
      />
  </View>
=======
    <View style={{paddingLeft: 20}}>
      
        <Image
            source={require('../assets/buttons/backButton.png')}
            style={{ width: 32, height: 32, resizeMode: 'cover'}}
          />
        
     
    </View>
>>>>>>> b3179dfdcaf7cfd4ee06c96ee25775ebe19c44c9
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 8, // Optional: Add border radius for rounded corners
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> b3179dfdcaf7cfd4ee06c96ee25775ebe19c44c9
