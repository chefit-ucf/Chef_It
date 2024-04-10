import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import { Ionicons } from '@expo/vector-icons';
import StarRating from './rating.js'; // Import the StarRating component

export default function Slider({ title, items, width, height }) {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Coiny_400Regular
  });
  
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  const styles = StyleSheet.create({
    container: {
      paddingLeft: 12,
      marginBottom: 32
    },
    pictures: {
      width: width * items.length,
      height,
      flexDirection: "row",
      padding: 20, // No units like 'px' in React Native
    },
    base: {
      paddingLeft: 16,
    },
    picture: {
      position: 'relative',
      borderRadius: 8,
    },
    textOverlay: {
      position: 'absolute',
      top: '90%', // Are you sure you want to use percentage? This might not work as expected
      right: '0', // Similarly, using '0' might not be the best choice for right positioning
    },
    border: {
      borderBottomWidth: 2,
      borderColor: '#ECECEC',
      paddingBottom: 8,
      marginBottom: 8
    },
    title: {
      fontSize: 20,
      fontFamily: 'Coiny_400Regular',
    },
    text: {
      fontFamily: 'Coiny_400Regular',
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      paddingLeft: 16
    },
    image: {
      width: width - 160, // Adjusted width to consider padding
      height: height * 0.45, // Adjusted height for the image
      borderRadius: 5,
    },
  });
  return <View style={styles.container}>
      <View style={styles.border}>
        <Text style={styles.title} >{title}</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        horizontal
        style={{overflow:"visible"}}
      >
        <View style={{ width: '100%'}}>
          <View style={{ padding: 8, flexDirection: 'row',  gap: 12}}>
            {items.map((source) => (
              <View key={source} style={styles.picture}>
              <Image style={styles.image} source={{ uri: source.src }} />
                <View style={styles.textOverlay}>
                  <Text style={styles.text}>{source.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  
}

export function SliderSeasonal({ title, items, width, height }) {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Coiny_400Regular
  });
  
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  const styles = StyleSheet.create({
    
    container: {
      paddingLeft: 12,
      marginBottom: 32
    },
    pictures: {
      width: width * items.length,
      height,
      flexDirection: "row",
      padding: 20, // Remove quotes around '20px'
    },
    base: {
      paddingLeft: 16,
    },
    picture: {
      position: 'relative',
      borderRadius: 8,
    },
    textOverlay: {
      position: 'absolute',
      top: '90%',
      right: '0',
    },
    border: {
      borderBottomWidth: 2,
      borderColor: '#ECECEC',
      paddingBottom: 8,
      marginBottom: 8
    },
    title:{
      fontSize: 20,
      fontFamily: 'Coiny_400Regular',

    },
    text: {
      color: 'white',
      fontFamily: 'Coiny_400Regular',
      fontSize: 16,
      textAlign: 'center',
      paddingLeft: 16,
    },
     image: {
      width: width - 30, // Adjusted width to consider padding
      height: height * 0.25, // Adjusted height for the image
      borderRadius: 5,
    },
  });

  return <View style={styles.container}>
      <View style={styles.border}>
        <Text style={styles.title} >{title}</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        horizontal
        style={{overflow:"visible"}}
      >
        <View style={{ width: '100%'}}>
          <View style={{ padding: 8, flexDirection: 'row',  gap: 12}}>
            {items.map((source) => (
              <View key={source} style={styles.picture}>
              <Image style={styles.image} source={{ uri: source.src }} />
                <View style={styles.textOverlay}>
                  <Text style={styles.text}>{source.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  
}


export  function DetailedSlider({title, items, width, height}) {
  const navigation = useNavigation();


  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Coiny_400Regular
  });
  
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const styles = StyleSheet.create({
    container: {
      paddingLeft: 12,
      overflow:"visible",
      marginBottom: 32
    },
    pictures: {
      width: width * items.length,
      height,
      flexDirection: "row",
      padding: '20px'
    },
    picture: {
      width,
      overflow: "hidden",
      borderRadius: 8
    },
    flex: {
      flexDirection: 'row',
      gap: 12 , 
    },
    box: {
      padding: 12,
      borderWidth: 2, 
      borderColor: '#ECECEC',
      borderRadius: 8
    },
    border: {
      borderBottomWidth: 2,
      borderColor: '#ECECEC',
      paddingBottom: 8,
      marginBottom: 16
    },

    title:{
      fontSize: 20,
      fontFamily: 'Coiny_400Regular',

    },
    image: {
      width: width - 32, // Adjusted width to consider padding
      height: height * 0.2, // Adjusted height for the image
      borderRadius: 5,
    },
    description: {
      fontFamily: 'Montserrat_400Regular',
      fontSize: 12
    }

  });

  return  <View style={styles.container}>
      <View style={styles.border}>
        <Text style={styles.title} >{title}</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        horizontal
        style={{overflow:"visible"}}
      >
        <View style={styles.flex}>
          {items.map((source) => (
          <TouchableOpacity onPress={() => navigation.navigate("RecipeScreen", { currentRecipe: source.id })}>
          <View key={source} style={styles.picture}>
            <View style={styles.box}>
              <View>
              <Image style={styles.image} source={{ uri: source.src }} />
              </View>
              <View>
                <View style={{ padding: 8 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Coiny_400Regular' }}>{source.title}</Text>
                </View>
                <View style={{ padding: 8 }}>
                  <Text style={styles.description}>{source.description}</Text>
                </View>

              </View>
            </View>
          </View>
          </TouchableOpacity>
          ))}
        </View>
    </ScrollView>
  </View>
}