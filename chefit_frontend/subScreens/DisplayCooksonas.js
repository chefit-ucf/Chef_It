import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

// For navigation
const Stack = createStackNavigator();

// Define Box component
const Box = ({ source }) => {
  return (
    <View style={styles.box}>
      <Image source={source} style={styles.boxImage} />
    </View>
  );
};

// Data for boxes
const boxData = [
  require('../assets/Cooksonas/pancakes_withbackground.png'),
  require('../assets/Cooksonas/waffles_withBackground.png'),
  require('../assets/Cooksonas/sandwich_withBackground.png'),
  require('../assets/Cooksonas/spaghetti_withBackground.png'),
  require('../assets/Cooksonas/salad_withBackground.png'),
  require('../assets/Cooksonas/ramen_withBackground.png'),
  require('../assets/Cooksonas/pizza_withBackground.png'),
  require('../assets/Cooksonas/fries_withBackground.png'),
  require('../assets/Cooksonas/burger_withBackground.png'),
];

export default function DisplayCooksonas() {
  const handleCooksonaChange = () => {
    // handle backend changing of avatars
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/Cooksonas/pancakes.png')}
              style={styles.profileImage}
            />
          </View> 
      <Text style={styles.headingText}>Select Your Cooksona</Text>
        <View style={styles.gridContainer}>
          {boxData.map((item, index) => (
            <Box key={index} source={item} />
          ))}
        </View>
        <Pressable onPress={handleCooksonaChange} style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 2,
  },
  box: {
    width: 100,
    height: 100,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  button: {
    width: 100,
    height: 32,
    backgroundColor: '#47A695',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize:16,
    color: '#FEF3CD',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headingText:{
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 15
  },
  profileImageContainer: {
    backgroundColor: '#F9B59E',
    padding: 12,
    borderRadius: 20,
  },
  profileImage: {
    width: 160,
    height: 154,
  }
});
