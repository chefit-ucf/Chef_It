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
  require('../assets/cooksonas/pancakes_withbackground.png'),
  require('../assets/cooksonas/waffles_withBackground.png'),
  require('../assets/cooksonas/sandwich_withBackground.png'),
  require('../assets/cooksonas/spaghetti_withBackground.png'),
  require('../assets/cooksonas/salad_withBackground.png'),
  require('../assets/cooksonas/ramen_withBackground.png'),
  require('../assets/cooksonas/pizza_withBackground.png'),
  require('../assets/cooksonas/fries_withBackground.png'),
  require('../assets/cooksonas/burger_withBackground.png'),
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
              source={require('../assets/cooksonas/pancakes.png')}
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
    height: 38,
    backgroundColor: '#47A695',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 18,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
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
    margin: 15
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